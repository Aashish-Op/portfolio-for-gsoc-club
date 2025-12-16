import { Github, ExternalLink, Calendar, Code2, Server, Globe, Cpu, Folder, Loader, Star, Users } from 'lucide-react';
import { useProjects } from '@/hooks/usePortfolio';
import type { Project } from '@/types';

const getCategoryIcon = (category: string | null, language: string | null) => {
    if (category === 'ml_ai' || category === 'iot') return <Cpu className="w-8 h-8" />;
    if (category === 'backend') return <Server className="w-8 h-8" />;
    if (category === 'frontend') return <Globe className="w-8 h-8" />;
    if (category === 'dsa') return <Code2 className="w-8 h-8" />;
    if (language === 'C++' || language === 'C') return <Code2 className="w-8 h-8" />;
    return <Folder className="w-8 h-8" />;
};

const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3776ab',
        'C++': '#00599c',
        'C': '#a8b9cc',
        'HTML': '#e34c26',
        'CSS': '#1572b6',
        'Java': '#ed8b00',
        'Go': '#00add8',
        'Rust': '#dea584',
    };
    return colors[language || ''] || '#6366f1';
};

interface FeaturedProject {
    id: string;
    displayName: string;
    description: string;
    category: string;
    imageUrl: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
    {
        id: 'disaster-management',
        displayName: 'Disaster Management System',
        description: 'A comprehensive real-time disaster response platform with live alerts, resource coordination, and emergency shelter mapping for communities.',
        category: 'Full Stack',
        imageUrl: '/disastermangement.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        githubUrl: 'https://github.com/Aashish-Op',
    },
    {
        id: 'dr-glance',
        displayName: 'Dr. Glance',
        description: 'AI-powered healthcare companion that provides symptom analysis, personalized health recommendations, and connects patients with specialists.',
        category: 'Healthcare',
        imageUrl: '/drglance.png',
        technologies: ['React', 'Python', 'FastAPI', 'OpenAI'],
        githubUrl: 'https://github.com/Aashish-Op',
    },
    {
        id: 'haven-realty',
        displayName: 'Haven Realty Co',
        description: 'Modern real estate platform featuring property listings, virtual tours, mortgage calculator, and agent booking with seamless user experience.',
        category: 'Real Estate',
        imageUrl: '/havenrealtyco.png',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
        githubUrl: 'https://github.com/Aashish-Op',
    },
    {
        id: 'ecotrack',
        displayName: 'EcoTrack',
        description: 'Environmental awareness app that tracks carbon footprint, suggests eco-friendly alternatives, and gamifies sustainable living with community challenges.',
        category: 'Environment',
        imageUrl: '/environment awareness.png',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Chart.js'],
        githubUrl: 'https://github.com/Aashish-Op',
    },
];

function FeaturedTimelineItem({ project, index }: { project: FeaturedProject; index: number }) {
    const isLeft = index % 2 === 0;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '3rem'
        }}>
            {isLeft ? (
                <>
                    <div style={{ textAlign: 'right', paddingRight: '1rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#6366f1', marginBottom: '8px' }}>
                            <Calendar size={14} />
                            {project.category}
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{project.displayName}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px', lineHeight: 1.6 }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                            {project.technologies.map((tech) => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#0a0a0f',
                        border: '3px solid #6366f1',
                        borderRadius: '50%',
                        position: 'relative',
                        zIndex: 10
                    }} />
                    <div style={{ paddingLeft: '1rem' }}>
                        <div className="project-card" style={{ maxWidth: '300px', overflow: 'hidden' }}>
                            <img
                                src={project.imageUrl}
                                alt={project.displayName}
                                className="timeline-project-image"
                                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div style={{ paddingRight: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="project-card" style={{ maxWidth: '300px', overflow: 'hidden' }}>
                            <img
                                src={project.imageUrl}
                                alt={project.displayName}
                                className="timeline-project-image"
                                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#0a0a0f',
                        border: '3px solid #6366f1',
                        borderRadius: '50%',
                        position: 'relative',
                        zIndex: 10
                    }} />
                    <div style={{ paddingLeft: '1rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#6366f1', marginBottom: '8px' }}>
                            <Calendar size={14} />
                            {project.category}
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{project.displayName}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px', lineHeight: 1.6 }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {project.technologies.map((tech) => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const PROJECT_IMAGES: Record<string, string> = {
    'drglance': '/drglance.png',
    'disaster-relief-coordinationplatform': '/disastermangement.png',
    'disaster': '/disastermangement.png',
    'haven-realty': '/havenrealtyco.png',
    'haven realty': '/havenrealtyco.png',
    'ecotrack': '/environment awareness.png',
    'environment': '/environment awareness.png',
    'che110': '/environment awareness.png',
    'portfolio-for-gsoc': '/image.png',
    'portfolio for gsoc': '/image.png',
    'gsoc': '/image.png',
};

function getProjectImage(projectName: string): string | null {
    const nameLower = projectName.toLowerCase().replace(/[\s_]/g, '-');
    for (const [key, url] of Object.entries(PROJECT_IMAGES)) {
        if (nameLower.includes(key)) {
            return url;
        }
    }
    return null;
}

function ProjectCard({ project }: { project: Project }) {
    const icon = getCategoryIcon(project.category, project.primary_language);
    const color = getLanguageColor(project.primary_language);
    const projectImage = getProjectImage(project.name);

    return (
        <div className="project-card">
            <div className="project-image" style={{
                background: projectImage ? 'transparent' : `linear-gradient(135deg, ${color}20 0%, #16161d 100%)`,
                overflow: 'hidden'
            }}>
                {projectImage ? (
                    <img
                        src={projectImage}
                        alt={project.display_name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                ) : (
                    <div style={{ color: color, opacity: 0.6 }}>
                        {icon}
                    </div>
                )}
            </div>

            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                            {project.display_name}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: color }}>{project.primary_language || 'Multi-language'}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: '#1e1e2a',
                                color: '#94a3b8',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1e1e2a'; e.currentTarget.style.color = '#94a3b8'; }}
                        >
                            <Github size={14} />
                        </a>
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    backgroundColor: '#1e1e2a',
                                    color: '#94a3b8',
                                    transition: 'all 0.2s',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1e1e2a'; e.currentTarget.style.color = '#94a3b8'; }}
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.description || 'No description available'}
                </p>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.8rem', color: '#64748b' }}>
                    {project.stars_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={12} style={{ color: '#f59e0b' }} />
                            {project.stars_count}
                        </span>
                    )}
                    {project.forks_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={12} />
                            {project.forks_count}
                        </span>
                    )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.topics.slice(0, 4).map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.primary_language && !project.topics.includes(project.primary_language) && (
                        <span className="tech-tag">{project.primary_language}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ProjectsSection() {
    const { data, isLoading, error } = useProjects();
    const projects = data?.projects || [];

    const sortedProjects = [...projects].sort((a, b) => {
        const aHasImage = getProjectImage(a.name) !== null;
        const bHasImage = getProjectImage(b.name) !== null;
        if (aHasImage && !bHasImage) return -1;
        if (!aHasImage && bHasImage) return 1;
        return 0;
    });

    return (
        <section id="projects" style={{ padding: '6rem 1.5rem', backgroundColor: '#0d0d14' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title gradient-text">My Projects</h2>
                    <p className="section-subtitle">
                        A showcase of my work across full-stack development, IoT, and more
                    </p>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '16px',
                        padding: '8px 16px',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: '#6366f1'
                    }}>
                        <Server size={14} />
                        {isLoading ? 'Fetching from API...' : `${projects.length} projects loaded from GitHub API`}
                    </div>
                </div>

                {/* Featured Projects Timeline */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Featured Projects</h3>
                        <p style={{ color: '#64748b' }}>My highlighted work</p>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '2px',
                            height: '100%',
                            background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 50%, #1e1e2a 100%)'
                        }} />

                        {FEATURED_PROJECTS.map((project, index) => (
                            <FeaturedTimelineItem key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* All Projects Grid */}
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
                        <Loader size={40} style={{ color: '#6366f1', animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
                        Failed to load projects. Please try again later.
                    </div>
                ) : projects.length > 0 && (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>All Projects</h3>
                            <p style={{ color: '#64748b' }}>Complete collection from GitHub ({projects.length} repositories)</p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {sortedProjects.map((project) => (
                                <ProjectCard key={project.github_id} project={project} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
