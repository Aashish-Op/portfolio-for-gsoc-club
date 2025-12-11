import { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useTheme } from '../../context';

const ROLES = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Python Developer',
    'DevOps Enthusiast',
    'System Design Enthusiast',
    'Problem Solver',
];

export function HeroSection() {
    const { theme } = useTheme();
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' });

    // Memoize star colors based on theme
    const starColors = useMemo(() => {
        if (theme === 'dark') {
            return ['#f272c8', '#854CE6', '#ffffff'];
        }
        return ['#a855f7', '#6366f1', '#94a3b8'];
    }, [theme]);

    useEffect(() => {
        const currentRole = ROLES[currentRoleIndex];

        const timeout = setTimeout(() => {
            if (isPaused) {
                setIsPaused(false);
                setIsDeleting(true);
                return;
            }

            if (!isDeleting) {
                if (displayText.length < currentRole.length) {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                } else {
                    setIsPaused(true);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
                }
            }
        }, isPaused ? 2000 : isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isPaused, currentRoleIndex]);

    return (
        <section id="home" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '6rem 1.5rem 4rem',
            backgroundColor: 'var(--bg-primary)',
            transition: 'background-color 0.3s ease',
        }}>
            {/* Gradient overlays - theme aware */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: theme === 'dark'
                    ? `linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%),
                       linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)`
                    : `linear-gradient(38.73deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0) 50%),
                       linear-gradient(141.27deg, rgba(99, 102, 241, 0) 50%, rgba(99, 102, 241, 0.08) 100%)`,
                transition: 'background 0.3s ease',
            }} />

            {/* Animated star particles */}
            <div className="stars-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {[...Array(120)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            position: 'absolute',
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            backgroundColor: starColors[i % 3],
                            borderRadius: '50%',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3,
                            animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Animated geometric SVG background - from anubhavxdev portfolio */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                opacity: theme === 'dark' ? 0.15 : 0.08,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
            }}>
                <svg viewBox="0 0 602 602" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="1">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563C408.526 522.426 421.275 522.426 429.138 514.563L514.563 429.138C522.426 421.275 522.426 408.526 514.563 400.663L201.337 87.437ZM30.4869 115.912C-8.82897 155.228 -8.82897 218.972 30.4869 258.287L343.713 571.513C383.028 610.829 446.772 610.829 486.088 571.513L571.513 486.088C610.829 446.772 610.829 383.028 571.513 343.713L258.287 30.4869C218.972 -8.82896 155.228 -8.82896 115.912 30.4869L30.4869 115.912Z"
                            stroke="url(#paint0_radial)"
                            strokeWidth="1"
                        />
                        <path
                            d="M514.563 201.337C522.426 193.474 522.426 180.725 514.563 172.862L429.138 87.437C421.275 79.5738 408.526 79.5739 400.663 87.437L358.098 130.002L301.148 73.0516L343.713 30.4869C383.028 -8.82896 446.772 -8.82896 486.088 30.4869L571.513 115.912C610.829 155.228 610.829 218.972 571.513 258.287L357.802 471.999L300.852 415.049L514.563 201.337Z"
                            stroke="url(#paint1_radial)"
                            strokeWidth="1"
                        />
                        <path
                            d="M243.901 471.999L201.337 514.563C193.474 522.426 180.725 522.426 172.862 514.563L87.437 429.138C79.5739 421.275 79.5739 408.526 87.437 400.663L301.148 186.952L244.198 130.002L30.4869 343.713C-8.82897 383.028 -8.82897 446.772 30.4869 486.088L115.912 571.513C155.228 610.829 218.972 610.829 258.287 571.513L300.852 528.949L243.901 471.999Z"
                            stroke="url(#paint2_radial)"
                            strokeWidth="1"
                        />
                    </g>
                    {/* Animated dots on paths */}
                    <circle r="4" fill="#854CE6">
                        <animateMotion dur="10s" repeatCount="indefinite">
                            <mpath href="#pathMotion1" />
                        </animateMotion>
                    </circle>
                    <circle r="3" fill="#f272c8">
                        <animateMotion dur="8s" repeatCount="indefinite">
                            <mpath href="#pathMotion2" />
                        </animateMotion>
                    </circle>
                    <circle r="3" fill="#13ADC7">
                        <animateMotion dur="12s" repeatCount="indefinite">
                            <mpath href="#pathMotion3" />
                        </animateMotion>
                    </circle>
                    {/* Motion paths */}
                    <path id="pathMotion1" d="M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563" fill="none" />
                    <path id="pathMotion2" d="M514.563 201.337C522.426 193.474 522.426 180.725 514.563 172.862L429.138 87.437C421.275 79.5738 408.526 79.5739 400.663 87.437L358.098 130.002" fill="none" />
                    <path id="pathMotion3" d="M243.901 471.999L201.337 514.563C193.474 522.426 180.725 522.426 172.862 514.563L87.437 429.138" fill="none" />
                    <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(301 301) rotate(90) scale(300)">
                            <stop offset="0.333333" stopColor={theme === 'dark' ? '#FBFBFB' : '#6366f1'} />
                            <stop offset="1" stopColor={theme === 'dark' ? 'white' : '#6366f1'} stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(301 301) rotate(90) scale(300)">
                            <stop offset="0.333333" stopColor={theme === 'dark' ? '#FBFBFB' : '#6366f1'} />
                            <stop offset="1" stopColor={theme === 'dark' ? 'white' : '#6366f1'} stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(301 301) rotate(90) scale(300)">
                            <stop offset="0.333333" stopColor={theme === 'dark' ? '#FBFBFB' : '#6366f1'} />
                            <stop offset="1" stopColor={theme === 'dark' ? 'white' : '#6366f1'} stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Clip path gradient overlay */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(to top, var(--bg-primary), transparent)',
                pointerEvents: 'none',
                transition: 'background 0.3s ease',
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
            }}>
                {/* Left content */}
                <div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.2,
                    }}>
                        Hi, I am
                    </h1>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.2,
                    }}>
                        Ashish Gupta
                    </h2>

                    {/* Typing animation */}
                    <div style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                        marginBottom: '2rem',
                        height: '2.5rem',
                    }}>
                        <span style={{ color: 'var(--text-primary)' }}>I am a </span>
                        <span style={{
                            background: 'linear-gradient(90deg, #a855f7, #6366f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 600,
                        }}>
                            {displayText}
                        </span>
                        <span style={{
                            display: 'inline-block',
                            width: '3px',
                            height: '1.5rem',
                            backgroundColor: '#a855f7',
                            marginLeft: '4px',
                            animation: 'blink 1s infinite',
                            verticalAlign: 'middle',
                        }} />
                    </div>

                    {/* Description */}
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        maxWidth: '500px',
                        marginBottom: '2.5rem',
                        fontStyle: 'italic',
                    }}>
                        I am a passionate and adaptable developer, always excited to tackle new coding challenges.
                        With a love for continuous learning, I strive to deliver high-quality, efficient, and innovative
                        web solutions. Armed with a positive attitude and a growth mindset, I am ready to make a
                        significant impact in the tech world.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="#"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '16px 32px',
                                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                                borderRadius: '9999px',
                                color: '#ffffff',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 85, 247, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.3)';
                            }}
                        >
                            <Download size={18} />
                            Check Resume
                        </a>

                        {/* Social links */}
                        <div style={{ display: 'flex', gap: '12px', marginLeft: '1rem' }}>
                            <a
                                href="https://github.com/Aashish-Op"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-button"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/in/ashish-gupta1279"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-button"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:ashishguptaop195@gmail.com" className="icon-button">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right - Photo */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    perspective: '1000px',
                }}>
                    <div
                        style={{
                            position: 'relative',
                            width: '350px',
                            height: '350px',
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.15s ease-out',
                            ...tiltStyle,
                        }}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;
                            const mouseX = e.clientX - centerX;
                            const mouseY = e.clientY - centerY;

                            // Calculate rotation (max 20 degrees)
                            const rotateY = (mouseX / (rect.width / 2)) * 20;
                            const rotateX = -(mouseY / (rect.height / 2)) * 20;

                            setTiltStyle({
                                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`,
                            });
                        }}
                        onMouseLeave={() => {
                            setTiltStyle({
                                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                            });
                        }}
                    >
                        {/* Rotating border */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '-8px',
                                borderRadius: '50%',
                                background: 'conic-gradient(from 0deg, #a855f7, #6366f1, #06b6d4, #a855f7)',
                                animation: 'rotate 4s linear infinite',
                            }}
                        />

                        {/* Inner dark circle */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '4px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--bg-primary)',
                            }}
                        />

                        {/* Photo container */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '8px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                backgroundColor: 'var(--bg-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src="/mypic.jpg"
                                alt="Ashish Gupta"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>

                        {/* Floating elements around photo */}
                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            right: '-20px',
                            padding: '8px 16px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#a855f7',
                            backdropFilter: 'blur(8px)',
                        }}>
                            💻 Coding
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: '15%',
                            left: '-30px',
                            padding: '8px 16px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#6366f1',
                            backdropFilter: 'blur(8px)',
                        }}>
                            🚀 Building
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: '5%',
                            right: '10%',
                            padding: '8px 16px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#10b981',
                            backdropFilter: 'blur(8px)',
                        }}>
                            ⚡ Learning
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS animations */}
            <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @media (max-width: 900px) {
          #home > div:nth-child(5) {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #home > div:nth-child(5) > div:first-child {
            order: 2;
          }
          #home > div:nth-child(5) > div:first-child p {
            margin-left: auto;
            margin-right: auto;
          }
          #home > div:nth-child(5) > div:first-child > div:last-child {
            justify-content: center;
          }
          #home > div:nth-child(5) > div:last-child {
            order: 1;
          }
        }
      `}</style>
        </section>
    );
}
