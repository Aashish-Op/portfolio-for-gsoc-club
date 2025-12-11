import { Github, ExternalLink, Calendar, Code2, Server, Globe, Cpu, Folder, Loader, Star, Users } from 'lucide-react';
import { useProjects } from '@/hooks/usePortfolio';
import type { Project } from '@/types';

// Icon mapping based on category
const getCategoryIcon = (category: string | null, language: string | null) => {
    if (category === 'ml_ai' || category === 'iot') return <Cpu className="w-8 h-8" />;
    if (category === 'backend') return <Server className="w-8 h-8" />;
    if (category === 'frontend') return <Globe className="w-8 h-8" />;
    if (category === 'dsa') return <Code2 className="w-8 h-8" />;
    if (language === 'C++' || language === 'C') return <Code2 className="w-8 h-8" />;
    return <Folder className="w-8 h-8" />;
};

// Color mapping based on language
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

function ProjectCard({ project }: { project: Project }) {
    const icon = getCategoryIcon(project.category, project.primary_language);
    const color = getLanguageColor(project.primary_language);

    return (
        <div className="project-card">
            <div className="project-image" style={{ background: `linear-gradient(135deg, ${color}20 0%, #16161d 100%)` }}>
                <div style={{ color: color, opacity: 0.6 }}>
                    {icon}
                </div>
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

                {/* GitHub Stats */}
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

function TimelineItem({ project, index }: { project: Project; index: number }) {
    const isLeft = index % 2 === 0;
    const icon = getCategoryIcon(project.category, project.primary_language);
    const color = getLanguageColor(project.primary_language);

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
                            {project.category || 'Project'}
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{project.display_name}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>{project.description || 'No description'}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                            {project.topics.slice(0, 3).map((tech) => (
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
                        <div className="project-card" style={{ maxWidth: '300px' }}>
                            <div className="project-image" style={{ height: '120px', background: `linear-gradient(135deg, ${color}20 0%, #16161d 100%)` }}>
                                <div style={{ color: color, opacity: 0.6 }}>{icon}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div style={{ paddingRight: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="project-card" style={{ maxWidth: '300px' }}>
                            <div className="project-image" style={{ height: '120px', background: `linear-gradient(135deg, ${color}20 0%, #16161d 100%)` }}>
                                <div style={{ color: color, opacity: 0.6 }}>{icon}</div>
                            </div>
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
                            {project.category || 'Project'}
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{project.display_name}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>{project.description || 'No description'}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {project.topics.slice(0, 3).map((tech) => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export function ProjectsSection() {
    const { data, isLoading, error } = useProjects();

    const projects = data?.projects || [];
    const featuredProjects = projects.filter(p => p.is_featured);

    return (
        <section id="projects" style={{ padding: '6rem 1.5rem', backgroundColor: '#0d0d14' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title gradient-text">My Projects</h2>
                    <p className="section-subtitle">
                        A showcase of my work across full-stack development, IoT, and more
                    </p>
                    {/* API Data Indicator */}
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

                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
                        <Loader size={40} style={{ color: '#6366f1', animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
                        Failed to load projects. Please try again later.
                    </div>
                ) : (
                    <>
                        {/* Timeline - Featured Projects */}
                        {featuredProjects.length > 0 && (
                            <div style={{ marginBottom: '5rem' }}>
                                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Featured Projects</h3>
                                    <p style={{ color: '#64748b' }}>My highlighted work</p>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    {/* Timeline line */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '2px',
                                        height: '100%',
                                        background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 50%, #1e1e2a 100%)'
                                    }} />

                                    {featuredProjects.slice(0, 4).map((project, index) => (
                                        <TimelineItem key={project.github_id} project={project} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Projects Grid */}
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>All Projects</h3>
                            <p style={{ color: '#64748b' }}>Complete collection from GitHub ({projects.length} repositories)</p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {projects.map((project) => (
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
