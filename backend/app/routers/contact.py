from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core import get_db_session, get_current_user_required
from app.schemas import ContactMessageCreate, ContactSubmitResponse, UserResponse
from app.services import create_contact_message
from app.models.user import User

contact_router = APIRouter(prefix="/contact", tags=["Contact"])


@contact_router.post("/submit", response_model=ContactSubmitResponse, status_code=201)
async def submit_contact_message(
    payload: ContactMessageCreate,
    request: Request,
    db_session: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user_required)
):
    """
    Submit a contact message. Requires authentication via Clerk.
    User must be logged in to send a message.
    """
    ip_address = request.client.host if request.client else None
    
    message = await create_contact_message(
        db_session=db_session,
        user=current_user,
        payload=payload,
        ip_address=ip_address
    )
    
    return ContactSubmitResponse(
        success=True,
        message=f"Thank you, {payload.sender_name}! Your message has been sent.",
        reference_id=message.id
    )


@contact_router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user_required)
):
    """Get current authenticated user info"""
    return UserResponse.model_validate(current_user)


@contact_router.get("/check-auth")
async def check_authentication(
    current_user: User = Depends(get_current_user_required)
):
    """Check if user is authenticated"""
    return {
        "authenticated": True,
        "user_id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }
