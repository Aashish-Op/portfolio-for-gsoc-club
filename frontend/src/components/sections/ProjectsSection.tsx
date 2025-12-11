import { Github, ExternalLink, Calendar, Code2, Server, Globe, Cpu, BookOpen, Folder } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    date: string;
    featured: boolean;
    color: string;
}

const PROJECTS: Project[] = [
    {
        id: 'drglance',
        title: 'DrGlance',
        subtitle: 'Healthcare IoT',
        description: 'Healthcare IoT platform integrating ESP32-CAM with ML for medical diagnostics. Features real-time video streaming and AI-powered analysis.',
        icon: <Cpu className="w-8 h-8" />,
        technologies: ['JavaScript', 'React', 'Node.js', 'ESP32', 'ML'],
        githubUrl: 'https://github.com/Aashish-Op/DrGlance',
        liveUrl: 'https://drglance.vercel.app',
        date: 'Dec 2024',
        featured: true,
        color: '#10b981',
    },
    {
        id: 'backendvidtube',
        title: 'Backend Vidtube',
        subtitle: 'Video Platform API',
        description: 'YouTube-like video platform backend with Node.js and Express. Complete with user auth, video upload, and streaming.',
        icon: <Server className="w-8 h-8" />,
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
        githubUrl: 'https://github.com/Aashish-Op/Backendvidtube',
        date: 'Nov 2024',
        featured: true,
        color: '#6366f1',
    },
    {
        id: 'haven-realty',
        title: 'Haven Realty Co',
        subtitle: 'Real Estate Platform',
        description: 'Responsive real estate website with property search, filtering, and dynamic listings. Clean UI with modern design.',
        icon: <Globe className="w-8 h-8" />,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
        githubUrl: 'https://github.com/Aashish-Op/Haven-Realty-Co--Real-Estate-Website',
        liveUrl: 'https://heavenrealityco.vercel.app',
        date: 'Nov 2024',
        featured: true,
        color: '#f59e0b',
    },
    {
        id: 'disaster-relief',
        title: 'Disaster Relief Platform',
        subtitle: 'Hackathon Project',
        description: 'Coordination platform for disaster relief efforts. Connects volunteers with affected areas and manages resources.',
        icon: <Globe className="w-8 h-8" />,
        technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
        githubUrl: 'https://github.com/Aashish-Op/Disaster-Relief-Coordination-Platform',
        date: 'Oct 2024',
        featured: true,
        color: '#ef4444',
    },
    {
        id: 'sih-backend',
        title: 'SIH Backend',
        subtitle: 'Smart India Hackathon',
        description: 'Backend API development for Smart India Hackathon solution. Scalable architecture with modern practices.',
        icon: <Server className="w-8 h-8" />,
        technologies: ['Node.js', 'Express', 'MongoDB'],
        githubUrl: 'https://github.com/Aashish-Op/SIH_BACKEND',
        date: 'Oct 2024',
        featured: false,
        color: '#8b5cf6',
    },
    {
        id: 'dsa-leetcode',
        title: 'DSA LeetCode Solutions',
        subtitle: 'Problem Solving',
        description: 'Collection of Data Structures and Algorithms solutions from LeetCode. Written in C++ for competitive programming.',
        icon: <Code2 className="w-8 h-8" />,
        technologies: ['C++', 'Algorithms', 'Data Structures'],
        githubUrl: 'https://github.com/Aashish-Op/DSA_LEETCODE_2ND_YR_LPU',
        date: 'Sep 2024',
        featured: false,
        color: '#06b6d4',
    },
    {
        id: 'che110-project',
        title: 'Plastic Waste Management',
        subtitle: 'Environmental Awareness',
        description: 'Interactive website about plastic waste environmental impact. Features animations and educational content.',
        icon: <BookOpen className="w-8 h-8" />,
        technologies: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: 'https://github.com/Aashish-Op/CHE110-PROJECT1',
        liveUrl: 'https://che110project1.vercel.app',
        date: 'Nov 2024',
        featured: false,
        color: '#22c55e',
    },
    {
        id: 'backend-learning',
        title: 'Backend',
        subtitle: 'Learning Project',
        description: 'Backend development learning project exploring Node.js, Express, and database integrations.',
        icon: <Folder className="w-8 h-8" />,
        technologies: ['Node.js', 'Express', 'MongoDB'],
        githubUrl: 'https://github.com/Aashish-Op/Backend',
        date: 'Sep 2024',
        featured: false,
        color: '#64748b',
    },
];

const TIMELINE_PROJECTS = PROJECTS.filter(p => p.featured);

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="project-card">
            <div className="project-image" style={{ background: `linear-gradient(135deg, ${project.color}20 0%, #16161d 100%)` }}>
                <div style={{ color: project.color, opacity: 0.6 }}>
                    {project.icon}
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                            {project.title}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: project.color }}>{project.subtitle}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <a
                            href={project.githubUrl}
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
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
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
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ project, index }: { project: Project; index: number }) {
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
                            {project.date}
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{project.title}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                            {project.technologies.slice(0, 3).map((tech) => (
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
                            <div className="project-image" style={{ height: '120px', background: `linear-gradient(135deg, ${project.color}20 0%, #16161d 100%)` }}>
                                <div style={{ color: project.color, opacity: 0.6 }}>{project.icon}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div style={{ paddingRight: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="project-card" style={{ maxWidth: '300px' }}>
                            <div className="project-image" style={{ height: '120px', background: `linear-gradient(135deg, ${project.color}20 0%, #16161d 100%)` }}>
                                <div style={{ color: project.color, opacity: 0.6 }}>{project.icon}</div>
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
                            {project.date}
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{project.title}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {project.technologies.slice(0, 3).map((tech) => (
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
    return (
        <section id="projects" style={{ padding: '6rem 1.5rem', backgroundColor: '#0d0d14' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title gradient-text">My Projects</h2>
                    <p className="section-subtitle">
                        A showcase of my work across full-stack development, IoT, and more
                    </p>
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Project Timeline</h3>
                        <p style={{ color: '#64748b' }}>My journey through recent projects</p>
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

                        {TIMELINE_PROJECTS.map((project, index) => (
                            <TimelineItem key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* All Projects Grid */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>All Projects</h3>
                    <p style={{ color: '#64748b' }}>Complete collection of my work</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
