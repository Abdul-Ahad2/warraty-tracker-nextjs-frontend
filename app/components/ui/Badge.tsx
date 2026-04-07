import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { BadgeVariant } from '@/types';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface BadgeProps {
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    children: React.ReactNode;
    className?: string;
    dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
    default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    success: 'bg-black text-white border-black',
    warning: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    danger: 'bg-white text-red-600 border-red-100',
    info: 'bg-neutral-100 text-black border-neutral-300',
    accent: 'bg-black text-white border-black',
};

const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-neutral-400',
    success: 'bg-white',
    warning: 'bg-neutral-600',
    danger: 'bg-red-600',
    info: 'bg-black',
    accent: 'bg-white',
};

export function Badge({ variant = 'default', size = 'sm', children, className, dot }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors duration-150',
                size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
                variants[variant],
                className
            )}
            style={{
                fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
            }}
        >
            {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
            {children}
        </span>
    );
}