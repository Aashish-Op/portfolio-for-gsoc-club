from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.user import ProfileVisitor


async def track_visitor(
    db_session: AsyncSession,
    ip_address: str | None,
    user_agent: str | None,
    referrer: str | None,
    page: str,
    user_id: int | None = None
) -> ProfileVisitor:
    visitor = ProfileVisitor(
        user_id=user_id,
        ip_address=ip_address,
        user_agent=user_agent,
        referrer=referrer,
        page_visited=page
    )
    db_session.add(visitor)
    await db_session.flush()
    return visitor


async def get_visitor_stats(db_session: AsyncSession) -> dict:
    total = await db_session.scalar(select(func.count(ProfileVisitor.id)))
    
    unique_ips = await db_session.scalar(
        select(func.count(func.distinct(ProfileVisitor.ip_address)))
    )
    
    authenticated = await db_session.scalar(
        select(func.count(ProfileVisitor.id)).where(ProfileVisitor.user_id.isnot(None))
    )
    
    recent_result = await db_session.execute(
        select(ProfileVisitor)
        .order_by(ProfileVisitor.visited_at.desc())
        .limit(10)
    )
    recent = recent_result.scalars().all()
    
    return {
        "total_visitors": total or 0,
        "unique_visitors": unique_ips or 0,
        "authenticated_visitors": authenticated or 0,
        "recent_visitors": [
            {
                "ip": v.ip_address,
                "page": v.page_visited,
                "time": v.visited_at.isoformat() if v.visited_at else None,
                "authenticated": v.user_id is not None
            }
            for v in recent
        ]
    }
