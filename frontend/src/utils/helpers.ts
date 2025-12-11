import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null): string {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function getLanguageColor(language: string): string {
    const languageColors: Record<string, string> = {
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        Python: '#3572A5',
        'C++': '#f34b7d',
        C: '#555555',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Java: '#b07219',
        Go: '#00ADD8',
        Rust: '#dea584',
        Ruby: '#701516',
    };
    return languageColors[language] || '#6366f1';
}

export function getCategoryLabel(category: string | null): string {
    const categoryLabels: Record<string, string> = {
        full_stack: 'Full Stack',
        backend: 'Backend',
        frontend: 'Frontend',
        mobile: 'Mobile',
        ml_ai: 'ML / AI',
        iot: 'IoT',
        dsa: 'DSA',
        personal: 'Personal',
    };
    return categoryLabels[category || ''] || 'Project';
}

export function getCategoryGradient(category: string | null): string {
    const gradients: Record<string, string> = {
        full_stack: 'from-violet-500 to-purple-600',
        backend: 'from-emerald-500 to-teal-600',
        frontend: 'from-blue-500 to-cyan-600',
        ml_ai: 'from-rose-500 to-pink-600',
        iot: 'from-amber-500 to-orange-600',
        dsa: 'from-indigo-500 to-blue-600',
        personal: 'from-gray-500 to-slate-600',
    };
    return gradients[category || ''] || 'from-gray-500 to-slate-600';
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}
