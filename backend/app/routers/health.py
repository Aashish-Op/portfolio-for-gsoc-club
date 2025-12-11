from datetime import datetime
from fastapi import APIRouter

from app.core import get_settings
from app.schemas import HealthCheckResponse

health_router = APIRouter(tags=["Health"])
settings = get_settings()


@health_router.get("/health", response_model=HealthCheckResponse)
async def health_check():
    return HealthCheckResponse(
        status="healthy",
        version=settings.app_version,
        database="connected",
        timestamp=datetime.utcnow()
    )


@health_router.get("/")
async def root():
    return {
        "message": "Ashish Gupta Portfolio API",
        "version": settings.app_version,
        "docs": "/docs",
        "github": "https://github.com/Aashish-Op"
    }
