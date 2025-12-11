from fastapi import APIRouter, Depends, Request
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core import get_db_session, get_current_user_optional
from app.schemas import (
    ProjectResponse,
    ProjectListResponse,
    SkillResponse,
    SkillsGroupedResponse,
    ExperienceResponse,
    CertificateResponse,
    PortfolioStatsResponse,
    ProfileInfoResponse
)
from app.services import fetch_github_repos, get_messages_count
from app.services.visitor_service import track_visitor, get_visitor_stats
from app.models.user import User

portfolio_router = APIRouter(prefix="/portfolio", tags=["Portfolio"])


@portfolio_router.get("/profile", response_model=ProfileInfoResponse)
async def get_profile():
    return ProfileInfoResponse()


@portfolio_router.get("/projects", response_model=ProjectListResponse)
async def get_projects(category: Optional[str] = None):
    repos = await fetch_github_repos()
    
    if category:
        repos = [r for r in repos if r.get("category") == category]
    
    return ProjectListResponse(
        projects=[ProjectResponse(**r) for r in repos],
        total_count=len(repos)
    )


@portfolio_router.get("/projects/featured", response_model=list[ProjectResponse])
async def get_featured_projects():
    repos = await fetch_github_repos()
    featured = [r for r in repos if r.get("is_featured")]
    return [ProjectResponse(**r) for r in featured]


@portfolio_router.get("/stats", response_model=PortfolioStatsResponse)
async def get_stats(db_session: AsyncSession = Depends(get_db_session)):
    repos = await fetch_github_repos()
    visitor_stats = await get_visitor_stats(db_session)
    messages_count = await get_messages_count(db_session)
    
    lang_counts: dict[str, int] = {}
    total_stars = 0
    total_forks = 0
    
    for repo in repos:
        if repo.get("primary_language"):
            lang = repo["primary_language"]
            lang_counts[lang] = lang_counts.get(lang, 0) + 1
        total_stars += repo.get("stars_count", 0)
        total_forks += repo.get("forks_count", 0)
    
    return PortfolioStatsResponse(
        total_projects=len(repos),
        total_stars=total_stars,
        total_forks=total_forks,
        primary_languages=[
            {"name": k, "count": v} 
            for k, v in sorted(lang_counts.items(), key=lambda x: -x[1])[:5]
        ],
        visitors_count=visitor_stats["total_visitors"],
        messages_count=messages_count
    )


@portfolio_router.get("/skills", response_model=SkillsGroupedResponse)
async def get_skills():
    skills = {
        "languages": [
            SkillResponse(name="JavaScript", category="language", proficiency=90, color="#F7DF1E"),
            SkillResponse(name="Python", category="language", proficiency=85, color="#3776AB"),
            SkillResponse(name="TypeScript", category="language", proficiency=75, color="#3178C6"),
            SkillResponse(name="C++", category="language", proficiency=80, color="#00599C"),
            SkillResponse(name="C", category="language", proficiency=70, color="#A8B9CC"),
        ],
        "frameworks": [
            SkillResponse(name="React", category="framework", proficiency=85, color="#61DAFB"),
            SkillResponse(name="Node.js", category="framework", proficiency=80, color="#339933"),
            SkillResponse(name="Express.js", category="framework", proficiency=80, color="#000000"),
            SkillResponse(name="Tailwind CSS", category="framework", proficiency=90, color="#06B6D4"),
        ],
        "databases": [
            SkillResponse(name="MongoDB", category="database", proficiency=80, color="#47A248"),
            SkillResponse(name="PostgreSQL", category="database", proficiency=65, color="#4169E1"),
        ],
        "tools": [
            SkillResponse(name="Git", category="tool", proficiency=90, color="#F05032"),
            SkillResponse(name="VS Code", category="tool", proficiency=95, color="#007ACC"),
            SkillResponse(name="Docker", category="tool", proficiency=60, color="#2496ED"),
        ],
        "cloud": [
            SkillResponse(name="Vercel", category="cloud", proficiency=80, color="#000000"),
            SkillResponse(name="AWS", category="cloud", proficiency=55, color="#FF9900"),
        ]
    }
    return SkillsGroupedResponse(**skills)


@portfolio_router.get("/experience", response_model=list[ExperienceResponse])
async def get_experience():
    return [
        ExperienceResponse(
            company_name="Physics Wallah",
            role_title="Community Admin Intern",
            description="Discord server management and bot development",
            highlights=[
                "Integrated Study Lion Bot for easier navigation",
                "Implemented Astro Bot, Music Bot, Study Wallah Bot",
                "Managed community of 10,000+ active users"
            ],
            start_date="July 2022",
            end_date="July 2023",
            is_current=False,
            location="Remote"
        )
    ]


@portfolio_router.get("/certificates", response_model=list[CertificateResponse])
async def get_certificates():
    return [
        CertificateResponse(
            title="AI and ML Workshop",
            issuer="IIT Delhi - Rendezvous",
            issue_date="October 2024"
        ),
        CertificateResponse(
            title="AWS Gen AI",
            issuer="Aspireforher",
            issue_date="October 2024"
        )
    ]


@portfolio_router.post("/track-visit")
async def track_page_visit(
    request: Request,
    page: str = "/",
    db_session: AsyncSession = Depends(get_db_session),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    await track_visitor(
        db_session=db_session,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
        referrer=request.headers.get("referer"),
        page=page,
        user_id=current_user.id if current_user else None
    )
    return {"tracked": True}
