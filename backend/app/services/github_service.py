import httpx
from typing import Optional

from app.core.config import get_settings

settings = get_settings()


async def fetch_github_repos() -> list[dict]:
    headers = {"Accept": "application/vnd.github.v3+json"}
    
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.github_api_base}/users/{settings.github_username}/repos",
            params={"per_page": 100, "sort": "updated"},
            headers=headers,
            timeout=30.0
        )
        if response.status_code != 200:
            return get_fallback_repos()
        
        repos = response.json()
        important_repos = [repo for repo in repos if is_important_repo(repo)]
        return [enrich_repo(repo) for repo in important_repos]


def enrich_repo(repo: dict) -> dict:
    name = repo["name"]
    return {
        "github_id": str(repo["id"]),
        "name": name,
        "display_name": format_display_name(name),
        "description": repo.get("description"),
        "github_url": repo["html_url"],
        "live_url": repo.get("homepage"),
        "primary_language": repo.get("language"),
        "topics": repo.get("topics", []),
        "stars_count": repo.get("stargazers_count", 0),
        "forks_count": repo.get("forks_count", 0),
        "is_forked": repo.get("fork", False),
        "category": infer_category(repo),
        "is_featured": is_featured_project(name)
    }


def format_display_name(name: str) -> str:
    cleaned = name.replace("-", " ").replace("_", " ")
    return " ".join(word.capitalize() for word in cleaned.split())


def infer_category(repo: dict) -> str:
    name_lower = repo["name"].lower()
    lang = (repo.get("language") or "").lower()
    
    if any(kw in name_lower for kw in ["backend", "api", "server"]):
        return "backend"
    if any(kw in name_lower for kw in ["frontend", "ui", "website"]):
        return "frontend"
    if any(kw in name_lower for kw in ["dsa", "leetcode", "algorithm"]):
        return "dsa"
    if any(kw in name_lower for kw in ["ml", "ai", "glance"]):
        return "ml_ai"
    if lang in ["c++", "c"]:
        return "dsa"
    return "personal"


def is_featured_project(name: str) -> bool:
    featured_keywords = [
        "drglance", "backendvidtube", "haven-realty", "disaster-relief", 
        "sih", "disaster", "ecotrack", "environment", "portfolio"
    ]
    return any(fn in name.lower() for fn in featured_keywords)


def is_important_repo(repo: dict) -> bool:
    if repo.get("fork", False):
        return False
    
    has_description = bool(repo.get("description"))
    has_topics = bool(repo.get("topics"))
    has_stars = repo.get("stargazers_count", 0) > 0
    has_homepage = bool(repo.get("homepage"))
    is_featured = is_featured_project(repo["name"])
    
    return is_featured or has_description or has_topics or has_stars or has_homepage


def get_fallback_repos() -> list[dict]:
    return [
        {
            "github_id": "drglance",
            "name": "DrGlance",
            "display_name": "Dr Glance",
            "description": "Healthcare IoT platform with ESP32-CAM and ML integration",
            "github_url": "https://github.com/Aashish-Op/DrGlance",
            "live_url": "https://drglance.vercel.app",
            "primary_language": "JavaScript",
            "topics": ["healthcare", "iot", "ml"],
            "stars_count": 0,
            "forks_count": 0,
            "is_forked": False,
            "category": "ml_ai",
            "is_featured": True
        },
        {
            "github_id": "backendvidtube",
            "name": "Backendvidtube",
            "display_name": "Backend Vidtube",
            "description": "YouTube-like video platform backend with Node.js",
            "github_url": "https://github.com/Aashish-Op/Backendvidtube",
            "live_url": None,
            "primary_language": "JavaScript",
            "topics": ["backend", "nodejs"],
            "stars_count": 0,
            "forks_count": 0,
            "is_forked": False,
            "category": "backend",
            "is_featured": True
        },
        {
            "github_id": "haven-realty",
            "name": "Haven-Realty-Co--Real-Estate-Website",
            "display_name": "Haven Realty Co",
            "description": "Responsive real estate platform",
            "github_url": "https://github.com/Aashish-Op/Haven-Realty-Co--Real-Estate-Website",
            "live_url": "https://heavenrealityco.vercel.app",
            "primary_language": "HTML",
            "topics": ["real-estate", "responsive"],
            "stars_count": 0,
            "forks_count": 0,
            "is_forked": False,
            "category": "frontend",
            "is_featured": True
        }
    ]
