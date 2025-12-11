import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.portfolio import ContactMessage
from app.models.user import User
from app.schemas.portfolio import ContactMessageCreate

logger = logging.getLogger(__name__)


async def create_contact_message(
    db_session: AsyncSession,
    user: User,
    payload: ContactMessageCreate,
    ip_address: str | None
) -> ContactMessage:
    message = ContactMessage(
        user_id=user.id,
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
    
    log_new_message(message)
    return message


async def get_messages_count(db_session: AsyncSession) -> int:
    return await db_session.scalar(select(func.count(ContactMessage.id))) or 0


async def get_all_messages(
    db_session: AsyncSession,
    include_archived: bool = False
) -> list[ContactMessage]:
    query = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    if not include_archived:
        query = query.where(ContactMessage.is_archived == False)
    result = await db_session.execute(query)
    return list(result.scalars().all())


def log_new_message(message: ContactMessage) -> None:
    logger.info(f"New contact from {message.sender_name} <{message.sender_email}>: {message.subject}")
