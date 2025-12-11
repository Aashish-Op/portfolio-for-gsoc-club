import { useEffect, useState } from 'react';
import { Server, CheckCircle, XCircle, Loader } from 'lucide-react';

interface HealthStatus {
    status: string;
    version: string;
    database: string;
    timestamp: string;
}

export function ApiStatus() {
    const [health, setHealth] = useState<HealthStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${apiUrl}/health`);
                if (response.ok) {
                    const data = await response.json();
                    setHealth(data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        checkHealth();
        // Check every 30 seconds
        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'rgba(10, 10, 15, 0.95)',
                border: '1px solid #2a2a3a',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: 1000,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                fontSize: '0.85rem',
            }}
        >
            <Server size={16} style={{ color: '#6366f1' }} />
            <div>
                <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                    Backend API
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {loading ? (
                        <>
                            <Loader size={12} style={{ color: '#f59e0b', animation: 'spin 1s linear infinite' }} />
                            <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>Connecting...</span>
                        </>
                    ) : error ? (
                        <>
                            <XCircle size={12} style={{ color: '#ef4444' }} />
                            <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>Offline</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle size={12} style={{ color: '#10b981' }} />
                            <span style={{ color: '#10b981', fontSize: '0.75rem' }}>
                                Connected • v{health?.version}
                            </span>
                        </>
                    )}
                </div>
            </div>
            {health && !error && (
                <a
                    href={`${import.meta.env.VITE_API_URL || ''}/docs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '4px 10px',
                        backgroundColor: '#6366f1',
                        color: '#ffffff',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
                >
                    API Docs
                </a>
            )}

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
