import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    noPadding?: boolean;
    border?: boolean;
}

export function Card({ hover = false, noPadding = false, border = true, className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-lg',
                border && 'border border-neutral-200',
                'shadow-sm',
                !noPadding && 'p-6',
                hover && 'transition-all duration-200 hover:shadow-md hover:border-neutral-300 cursor-pointer',
                className
            )}
            style={{
                fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
            }}
            {...props}
        >
            {children}
        </div>
    );
}