import httpx
from fastapi import HTTPException, Depends, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.config import get_settings
from app.core.database import get_db_session
from app.models.user import User

settings = get_settings()
security = HTTPBearer(auto_error=False)

_jwks_cache: dict = {}


async def get_clerk_jwks() -> dict:
    global _jwks_cache
    if _jwks_cache:
        return _jwks_cache
    
    async with httpx.AsyncClient() as client:
        response = await client.get(settings.clerk_jwks_url)
        if response.status_code == 200:
            _jwks_cache = response.json()
            return _jwks_cache
    return {}


async def verify_clerk_token(token: str) -> Optional[dict]:
    try:
        jwks = await get_clerk_jwks()
        if not jwks.get("keys"):
            return None
        
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        
        rsa_key = None
        for key in jwks["keys"]:
            if key.get("kid") == kid:
                rsa_key = key
                break
        
        if not rsa_key:
            return None
        
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            options={"verify_aud": False}
        )
        return payload
    except JWTError:
        return None


async def get_current_user_optional(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db_session: AsyncSession = Depends(get_db_session)
) -> Optional[User]:
    if not credentials:
        return None
    
    payload = await verify_clerk_token(credentials.credentials)
    if not payload:
        return None
    
    clerk_user_id = payload.get("sub")
    if not clerk_user_id:
        return None
    
    result = await db_session.execute(
        select(User).where(User.clerk_id == clerk_user_id)
    )
    user = result.scalar_one_or_none()
    
    if not user:
        user = User(
            clerk_id=clerk_user_id,
            email=payload.get("email", ""),
            name=payload.get("name", payload.get("first_name", "User"))
        )
        db_session.add(user)
        await db_session.flush()
        await db_session.refresh(user)
    
    return user


async def get_current_user_required(
    user: Optional[User] = Depends(get_current_user_optional)
) -> User:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please sign in to continue."
        )
    return user
