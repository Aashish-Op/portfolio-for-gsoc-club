import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
    gradient?: string;
    delay?: number;
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    gradient,
    delay = 0,
}: BentoCardProps) {
    const colSpanClasses = {
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-3',
    };

    const rowSpanClasses = {
        1: 'row-span-1',
        2: 'row-span-2',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={cn(
                'relative overflow-hidden rounded-2xl border border-slate-800/50',
                'bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm',
                'hover:border-slate-700/50 transition-colors duration-300',
                'group',
                colSpanClasses[colSpan],
                rowSpanClasses[rowSpan],
                className
            )}
        >
            {gradient && (
                <div
                    className={cn(
                        'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                        `bg-gradient-to-br ${gradient}`
                    )}
                />
            )}
            <div className="relative z-10 h-full p-6">{children}</div>
        </motion.div>
    );
}
