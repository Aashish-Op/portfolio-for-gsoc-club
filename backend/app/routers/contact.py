from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.core import get_db_session, get_current_user_optional
from app.schemas import ContactMessageCreate, ContactSubmitResponse
from app.models.portfolio import ContactMessage
from app.models.user import User
from sqlalchemy import select

contact_router = APIRouter(prefix="/contact", tags=["Contact"])


@contact_router.post("/submit", response_model=ContactSubmitResponse, status_code=201)
async def submit_contact_message(
    payload: ContactMessageCreate,
    request: Request,
    db_session: AsyncSession = Depends(get_db_session),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """
    Submit a contact message. Works for both authenticated and anonymous users.
    Messages are stored in the database for demonstration purposes.
    """
    ip_address = request.client.host if request.client else None
    
    # Create message - user_id is optional for anonymous submissions
    message = ContactMessage(
        user_id=current_user.id if current_user else None,
        sender_name=payload.sender_name,
        sender_email=payload.sender_email,
        subject=payload.subject,
        message_body=payload.message_body,
        company_name=payload.company_name,
        ip_address=ip_address
    )
    db_session.add(message)
    await db_session.flush()
    await db_session.refresh(message)
    
    return ContactSubmitResponse(
        success=True,
        message=f"Thank you, {payload.sender_name}! Your message has been saved to the database (ID: {message.id}).",
        reference_id=message.id
    )


@contact_router.get("/messages")
async def get_all_messages(
    db_session: AsyncSession = Depends(get_db_session)
):
    """
    Get all contact messages stored in the database.
    This endpoint is for demonstration/jury purposes.
    """
    query = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    result = await db_session.execute(query)
    messages = list(result.scalars().all())
    
    return {
        "total_count": len(messages),
        "messages": [
            {
                "id": msg.id,
                "sender_name": msg.sender_name,
                "sender_email": msg.sender_email,
                "subject": msg.subject,
                "message_body": msg.message_body,
                "company_name": msg.company_name,
                "created_at": msg.created_at.isoformat() if msg.created_at else None,
                "is_read": msg.is_read,
            }
            for msg in messages
        ]
    }


@contact_router.get("/messages/count")
async def get_messages_count(
    db_session: AsyncSession = Depends(get_db_session)
):
    """Get total count of contact messages"""
    from sqlalchemy import func
    count = await db_session.scalar(select(func.count(ContactMessage.id))) or 0
    return {"count": count}
