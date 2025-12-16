import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context';

const NAV_ITEMS = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s',
                backgroundColor: isScrolled ? 'var(--bg-nav)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: isScrolled ? '1px solid var(--border-primary)' : 'none',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                        <Link to="/" className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none' }}>
                            Ashish Gupta
                        </Link>

                        {/* Desktop nav */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="nav-link"
                                    style={{
                                        textDecoration: 'none',
                                        color: isActive(item.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        borderBottom: isActive(item.path) ? '2px solid var(--accent-primary)' : 'none',
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop icons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
                            <a href="https://github.com/Aashish-Op" target="_blank" rel="noopener noreferrer" className="icon-button">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com/in/ashish-gupta" target="_blank" rel="noopener noreferrer" className="icon-button">
                                <Linkedin size={18} />
                            </a>
                            <Link
                                to="/contact"
                                className="glow-button"
                                style={{ padding: '10px 20px', fontSize: '0.875rem', textDecoration: 'none' }}
                            >
                                <span>Hire Me</span>
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className="icon-button"
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.3s ease',
                                    transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
                                }}>
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </div>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div style={{ display: 'none', gap: '8px' }} className="mobile-only">
                            <button
                                onClick={toggleTheme}
                                className="icon-button"
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="icon-button"
                            >
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed',
                    top: '64px',
                    left: 0,
                    right: 0,
                    zIndex: 40,
                    backgroundColor: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border-primary)',
                    padding: '1rem 1.5rem',
                }}>
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                padding: '12px 0',
                                color: isActive(item.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                background: 'none',
                                border: 'none',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
        </>
    );
}
