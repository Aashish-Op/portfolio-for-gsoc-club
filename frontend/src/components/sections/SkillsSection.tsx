import { useState } from 'react';

interface SkillItem {
    name: string;
    iconUrl: string;
}

interface SkillCategory {
    title: string;
    skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React Js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Next Js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            { name: 'HTML', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'Bootstrap', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
            { name: 'Flutter', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node Js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express Js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'Flask', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
            { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        ],
    },
    {
        title: 'Mobile Development',
        skills: [
            { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'Kotlin', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
            { name: 'Jetpack Compose', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetpackcompose/jetpackcompose-original.svg' },
            { name: 'XML', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg' },
            { name: 'Android Studio', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
        ],
    },
    {
        title: 'Tools & Others',
        skills: [
            { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Netlify', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
            { name: 'VS Code', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
            { name: 'Postman', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
            { name: 'Figma', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        ],
    },
];

function SkillBadge({ skill }: { skill: SkillItem }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="skill-badge">
            {!imageError ? (
                <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    width={20}
                    height={20}
                    onError={() => setImageError(true)}
                    style={{ filter: 'brightness(1.1)' }}
                />
            ) : (
                <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#fff'
                }}>
                    {skill.name.charAt(0)}
                </div>
            )}
            <span>{skill.name}</span>
        </div>
    );
}

function SkillCard({ category }: { category: SkillCategory }) {
    return (
        <div className="skill-card">
            <h3 className="skill-card-title">{category.title}</h3>
            <div className="skill-badges-container">
                {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                ))}
            </div>
        </div>
    );
}

export function SkillsSection() {
    return (
        <section id="skills" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
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
                    <h2 className="section-title gradient-text">Skills</h2>
                    <p className="section-subtitle">
                        Here are some of my skills on which I have been working on for the past 2 years.
                    </p>
                </div>

                <div className="skills-grid">
                    {SKILL_CATEGORIES.map((category) => (
                        <SkillCard key={category.title} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
