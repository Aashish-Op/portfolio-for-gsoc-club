from functools import lru_cache
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Ashish Gupta Portfolio API"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # Database - SQLite for local, PostgreSQL for production
    # For production, set DATABASE_URL to your PostgreSQL connection string
    database_url: str = "sqlite+aiosqlite:///./portfolio.db"
    
    # Clerk Authentication
    clerk_secret_key: str = ""
    clerk_publishable_key: str = ""
    clerk_jwks_url: str = ""
    
    # GitHub - add token for higher rate limits (60 -> 5000 req/hour)
    github_username: str = "Aashish-Op"
    github_token: Optional[str] = None
    github_api_base: str = "https://api.github.com"
    
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://ashishgupta.dev"
    ]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()

