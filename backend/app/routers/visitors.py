from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date

from app.core import get_db_session
from app.models.portfolio import VisitorStats, VisitorLog

visitors_router = APIRouter(prefix="/visitors", tags=["Visitors"])


@visitors_router.post("/track")
async def track_visitor(
    request: Request,
    db_session: AsyncSession = Depends(get_db_session)
):
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent", "")[:500]
    referrer = request.headers.get("referer", "")[:500]
    
    visitor_log = VisitorLog(
        ip_address=ip_address,
        user_agent=user_agent,
        referrer=referrer,
        page_visited="/"
    )
    db_session.add(visitor_log)
    
    today = date.today()
    stats_query = select(VisitorStats).where(VisitorStats.visit_date == today)
    result = await db_session.execute(stats_query)
    day_stats = result.scalar_one_or_none()
    
    if day_stats:
        day_stats.visit_count += 1
    else:
        day_stats = VisitorStats(
            visit_date=today,
            visit_count=1,
            unique_visitors=1
        )
        db_session.add(day_stats)
    
    await db_session.flush()
    
    total_query = select(func.sum(VisitorStats.visit_count))
    total_visits = await db_session.scalar(total_query) or 0
    
    return {
        "success": True,
        "today_count": day_stats.visit_count,
        "total_count": total_visits
    }


@visitors_router.get("/count")
async def get_visitor_count(
    db_session: AsyncSession = Depends(get_db_session)
):
    total_query = select(func.sum(VisitorStats.visit_count))
    total_visits = await db_session.scalar(total_query) or 0
    
    today = date.today()
    today_query = select(VisitorStats.visit_count).where(VisitorStats.visit_date == today)
    today_visits = await db_session.scalar(today_query) or 0
    
    return {
        "total_visitors": total_visits,
        "today_visitors": today_visits
    }


@visitors_router.get("/stats")
async def get_visitor_stats(
    db_session: AsyncSession = Depends(get_db_session)
):
    query = select(VisitorStats).order_by(VisitorStats.visit_date.desc()).limit(30)
    result = await db_session.execute(query)
    stats = list(result.scalars().all())
    
    total_query = select(func.sum(VisitorStats.visit_count))
    total_visits = await db_session.scalar(total_query) or 0
    
    return {
        "total_all_time": total_visits,
        "daily_stats": [
            {
                "date": stat.visit_date.isoformat(),
                "count": stat.visit_count,
                "unique": stat.unique_visitors
            }
            for stat in stats
        ]
    }
