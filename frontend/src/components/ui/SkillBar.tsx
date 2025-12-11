import { cn } from '@/utils';

interface SkillBarProps {
    name: string;
    proficiency: number;
    color?: string;
}

export function SkillBar({ name, proficiency, color = '#8b5cf6' }: SkillBarProps) {
    return (
        <div className="group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {name}
                </span>
                <span className="text-xs text-slate-500">{proficiency}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                        width: `${proficiency}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    }}
                />
            </div>
        </div>
    );
}
