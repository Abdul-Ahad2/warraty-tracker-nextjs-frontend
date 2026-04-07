import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
}

const spinnerSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <svg
            className={cn('animate-spin text-black', spinnerSizes[size], className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
            role="status"
        >
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    );
}

// Full-page loading overlay
export function PageLoader() {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50"
            style={{
                fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
            }}
        >
            <div className="flex flex-col items-center gap-4">
                <Spinner size="lg" />
                <p className="text-sm text-neutral-500 font-medium animate-pulse">Loading…</p>
            </div>
        </div>
    );
}

// Skeleton loader
export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn('rounded-lg bg-neutral-200 animate-pulse', className)}
            aria-hidden="true"
        />
    );
}