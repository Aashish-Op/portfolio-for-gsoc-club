from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.core import get_settings, init_database
from app.routers import portfolio_router, contact_router, health_router, visitors_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Portfolio API...")
    
    try:
        await init_database()
        logger.info("Database initialized")
    except Exception as e:
        logger.warning(f"Database initialization skipped: {e}")
    
    yield
    
    logger.info("Shutting down Portfolio API...")


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Personal portfolio API with Clerk authentication",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(portfolio_router, prefix="/api/v1")
app.include_router(contact_router, prefix="/api/v1")
app.include_router(visitors_router, prefix="/api/v1")

