from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, EmailStr, field_validator
from enum import Enum


class ProjectCategory(str, Enum):
    FULL_STACK = "full_stack"
    BACKEND = "backend"
    FRONTEND = "frontend"
    ML_AI = "ml_ai"
    IOT = "iot"
    DSA = "dsa"
    PERSONAL = "personal"


class ProjectResponse(BaseModel):
    id: Optional[int] = None
    github_id: str
    name: str
    display_name: str
    description: Optional[str] = None
    github_url: str
    live_url: Optional[str] = None
    primary_language: Optional[str] = None
    languages: dict[str, float] = Field(default_factory=dict)
    topics: list[str] = Field(default_factory=list)
    stars_count: int = 0
    forks_count: int = 0
    is_forked: bool = False
    is_featured: bool = False
    category: Optional[str] = None
    
    class Config:
        from_attributes = True


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    total_count: int


class SkillResponse(BaseModel):
    name: str
    category: str
    proficiency: int
    color: Optional[str] = None


class SkillsGroupedResponse(BaseModel):
    languages: list[SkillResponse]
    frameworks: list[SkillResponse]
    databases: list[SkillResponse]
    tools: list[SkillResponse]
    cloud: list[SkillResponse]


class ExperienceResponse(BaseModel):
    company_name: str
    role_title: str
    description: Optional[str] = None
    highlights: list[str] = Field(default_factory=list)
    start_date: str
    end_date: Optional[str] = None
    is_current: bool = False
    location: Optional[str] = None


class CertificateResponse(BaseModel):
    title: str
    issuer: str
    issue_date: str
    credential_url: Optional[str] = None


class PortfolioStatsResponse(BaseModel):
    total_projects: int
    total_stars: int
    total_forks: int
    primary_languages: list[dict]
    visitors_count: int
    messages_count: int


class ProfileInfoResponse(BaseModel):
    full_name: str = "Ashish Prasad Gupta"
    title: str = "Full Stack Developer & CS Student"
    tagline: str = "Building the future, one commit at a time"
    location: str = "New Delhi, India"
    email: str = "ashishguptaop195@gmail.com"
    phone: str = "+91 9667233973"
    github_url: str = "https://github.com/Aashish-Op"
    linkedin_url: str = "https://linkedin.com/in/ashish-gupta"
    about_short: str = "Passionate Computer Science student at LPU with expertise in full-stack development, IoT, and machine learning."
    is_available_for_hire: bool = True


class ContactMessageCreate(BaseModel):
    sender_name: str = Field(..., min_length=2, max_length=255)
    sender_email: EmailStr
    subject: str = Field(..., min_length=5, max_length=500)
    message_body: str = Field(..., min_length=20, max_length=5000)
    company_name: Optional[str] = Field(None, max_length=255)
    
    @field_validator("sender_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        return v.strip()
    
    @field_validator("subject", "message_body")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return v.strip()


class ContactSubmitResponse(BaseModel):
    success: bool
    message: str
    reference_id: int


class UserResponse(BaseModel):
    id: int
    clerk_id: str
    email: str
    name: str
    avatar_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class VisitorStatsResponse(BaseModel):
    total_visitors: int
    unique_visitors: int
    authenticated_visitors: int
    recent_visitors: list[dict]


class HealthCheckResponse(BaseModel):
    status: str
    version: str
    database: str
    timestamp: datetime
