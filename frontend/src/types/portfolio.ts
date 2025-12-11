export interface Project {
    id: number;
    github_id: string;
    name: string;
    display_name: string;
    description: string | null;
    github_url: string;
    live_url: string | null;
    primary_language: string | null;
    languages: Record<string, number>;
    topics: string[];
    stars_count: number;
    forks_count: number;
    watchers_count: number;
    is_forked: boolean;
    is_featured: boolean;
    category: string | null;
    github_created_at: string | null;
    github_updated_at: string | null;
}

export interface ProjectListResponse {
    projects: Project[];
    total_count: number;
    featured_count: number;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    icon_name: string | null;
    color: string | null;
    years_experience: number | null;
    is_highlighted: boolean;
}

export interface SkillsGrouped {
    languages: Skill[];
    frameworks: Skill[];
    databases: Skill[];
    tools: Skill[];
    cloud: Skill[];
    other: Skill[];
}

export interface Experience {
    id: number;
    company_name: string;
    role_title: string;
    description: string | null;
    highlights: string[];
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    location: string | null;
    company_logo_url: string | null;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string;
    credential_url: string | null;
    credential_id: string | null;
}

export interface ProfileInfo {
    full_name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    github_url: string;
    linkedin_url: string;
    avatar_url: string | null;
    resume_url: string | null;
    about_short: string;
    about_long: string | null;
    is_available_for_hire: boolean;
}

export interface PortfolioStats {
    total_projects: number;
    total_commits: number;
    primary_languages: Array<{ name: string; count: number }>;
    language_distribution: Record<string, number>;
    total_stars: number;
    total_forks: number;
    most_active_project: string | null;
    projects_by_category: Record<string, number>;
    skills_count: number;
    experience_years: number;
    certifications_count: number;
}

export interface ContactFormData {
    sender_name: string;
    sender_email: string;
    subject: string;
    message_body: string;
    company_name?: string;
}

export interface ContactSubmitResponse {
    success: boolean;
    message: string;
    reference_id: number;
}
