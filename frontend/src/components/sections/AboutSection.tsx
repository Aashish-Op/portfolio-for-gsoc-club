import { Code2, Briefcase, GraduationCap, User } from 'lucide-react';

const ABOUT_CARDS = [
    {
        icon: User,
        title: 'Who I Am',
        description: "I'm Ashish Prasad Gupta, a passionate CS student at LPU with a knack for building full-stack applications. Former Community Admin at Physics Wallah where I managed 10K+ users.",
        color: '#6366f1',
    },
    {
        icon: Code2,
        title: 'What I Do',
        description: 'I specialize in React, Node.js, and Python. From responsive frontends to scalable backends, I craft end-to-end solutions that solve real problems.',
        color: '#10b981',
    },
    {
        icon: GraduationCap,
        title: 'Education',
        description: 'B.Tech Computer Science at Lovely Professional University (2024-2028). Currently maintaining a CGPA of 8.45.',
        color: '#f59e0b',
    },
    {
        icon: Briefcase,
        title: 'Experience',
        description: 'Community Admin Intern at Physics Wallah (2022-2023). Built Discord bots, managed communities, and improved user engagement.',
        color: '#8b5cf6',
    },
];

export function AboutSection() {
    return (
        <section id="about" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #1e1e2a, transparent)'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title gradient-text">About Me</h2>
                    <p className="section-subtitle">
                        A passionate developer focused on creating impactful digital experiences
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '4rem'
                }}>
                    {ABOUT_CARDS.map((card) => (
                        <div key={card.title} className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    backgroundColor: `${card.color}15`,
                                    border: `1px solid ${card.color}30`
                                }}>
                                    <card.icon size={24} style={{ color: card.color }} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                                        {card.title}
                                    </h3>
                                    <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.9rem' }}>
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
