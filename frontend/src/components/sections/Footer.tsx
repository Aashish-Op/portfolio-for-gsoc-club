import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{ padding: '3rem 1.5rem', borderTop: '1px solid #1e1e2a' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <span>Built with</span>
                        <Heart size={16} style={{ color: '#ef4444', fill: '#ef4444' }} />
                        <span>by</span>
                        <span style={{ color: '#ffffff', fontWeight: 500 }}>Ashish Gupta</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <a href="https://github.com/Aashish-Op" target="_blank" rel="noopener noreferrer" className="icon-button">
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com/in/ashish-gupta" target="_blank" rel="noopener noreferrer" className="icon-button">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:ashishguptaop195@gmail.com" className="icon-button">
                            <Mail size={18} />
                        </a>
                    </div>

                    <button
                        onClick={scrollToTop}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            backgroundColor: '#16161d',
                            border: '1px solid #1e1e2a',
                            borderRadius: '12px',
                            color: '#94a3b8',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                            e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = '#1e1e2a';
                            e.currentTarget.style.color = '#94a3b8';
                        }}
                    >
                        <ArrowUp size={16} />
                        <span>Back to top</span>
                    </button>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #1e1e2a', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                        © {new Date().getFullYear()} Ashish Prasad Gupta. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
