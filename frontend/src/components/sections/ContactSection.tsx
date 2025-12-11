import { useState } from 'react';
import { Send, Mail, User, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface FormState {
    sender_name: string;
    sender_email: string;
    subject: string;
    message_body: string;
    company_name: string;
}

export function ContactSection() {
    const [formData, setFormData] = useState<FormState>({
        sender_name: '',
        sender_email: '',
        subject: '',
        message_body: '',
        company_name: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.sender_name.trim()) newErrors.sender_name = 'Required';
        if (!formData.sender_email.trim()) newErrors.sender_email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.sender_email)) newErrors.sender_email = 'Invalid email';
        if (!formData.subject.trim()) newErrors.subject = 'Required';
        if (!formData.message_body.trim()) newErrors.message_body = 'Required';
        else if (formData.message_body.length < 20) newErrors.message_body = 'Min 20 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ sender_name: '', sender_email: '', subject: '', message_body: '', company_name: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const inputStyle = (hasError: boolean) => ({
        width: '100%',
        padding: '14px 14px 14px 44px',
        backgroundColor: '#111118',
        border: `1px solid ${hasError ? '#ef4444' : '#1e1e2a'}`,
        borderRadius: '12px',
        color: '#ffffff',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    });

    return (
        <section id="contact" style={{ padding: '6rem 1.5rem' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title gradient-text">Get In Touch</h2>
                    <p className="section-subtitle">
                        Have a project in mind? Let's work together.
                    </p>
                </div>

                <div className="card" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>Name *</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        type="text"
                                        name="sender_name"
                                        value={formData.sender_name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        style={inputStyle(!!errors.sender_name)}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = errors.sender_name ? '#ef4444' : '#1e1e2a'}
                                    />
                                </div>
                                {errors.sender_name && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.sender_name}</p>}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>Email *</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        type="email"
                                        name="sender_email"
                                        value={formData.sender_email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        style={inputStyle(!!errors.sender_email)}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = errors.sender_email ? '#ef4444' : '#1e1e2a'}
                                    />
                                </div>
                                {errors.sender_email && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.sender_email}</p>}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>Company</label>
                                <div style={{ position: 'relative' }}>
                                    <Building size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        placeholder="Your company (optional)"
                                        style={inputStyle(false)}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = '#1e1e2a'}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>Subject *</label>
                                <div style={{ position: 'relative' }}>
                                    <MessageSquare size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What's this about?"
                                        style={inputStyle(!!errors.subject)}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = errors.subject ? '#ef4444' : '#1e1e2a'}
                                    />
                                </div>
                                {errors.subject && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.subject}</p>}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>Message *</label>
                            <textarea
                                name="message_body"
                                value={formData.message_body}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell me about your project..."
                                style={{
                                    ...inputStyle(!!errors.message_body),
                                    paddingLeft: '14px',
                                    resize: 'none',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = errors.message_body ? '#ef4444' : '#1e1e2a'}
                            />
                            {errors.message_body && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.message_body}</p>}
                        </div>

                        {submitStatus === 'success' && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                color: '#10b981',
                                marginBottom: '1.5rem'
                            }}>
                                <CheckCircle size={20} />
                                <span>Message sent successfully! I'll get back to you soon.</span>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#ef4444',
                                marginBottom: '1.5rem'
                            }}>
                                <AlertCircle size={20} />
                                <span>Something went wrong. Please try again.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="glow-button"
                            style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
                        >
                            {isSubmitting ? (
                                <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Contact cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                    <a
                        href="mailto:ashishguptaop195@gmail.com"
                        className="card"
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', textDecoration: 'none' }}
                    >
                        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <Mail size={20} style={{ color: '#6366f1' }} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Email</p>
                            <p style={{ fontSize: '0.875rem', color: '#ffffff' }}>ashishguptaop195@gmail.com</p>
                        </div>
                    </a>

                    <a
                        href="https://github.com/Aashish-Op"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card"
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', textDecoration: 'none' }}
                    >
                        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <svg style={{ width: '20px', height: '20px', color: '#10b981' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>GitHub</p>
                            <p style={{ fontSize: '0.875rem', color: '#ffffff' }}>@Aashish-Op</p>
                        </div>
                    </a>

                    <a
                        href="https://linkedin.com/in/ashish-gupta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card"
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', textDecoration: 'none' }}
                    >
                        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                            <svg style={{ width: '20px', height: '20px', color: '#3b82f6' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>LinkedIn</p>
                            <p style={{ fontSize: '0.875rem', color: '#ffffff' }}>Ashish Gupta</p>
                        </div>
                    </a>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </section>
    );
}
