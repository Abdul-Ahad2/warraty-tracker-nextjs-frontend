'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonVariant, ButtonSize } from '@/types';

export function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            loading = false,
            icon,
            iconRight,
            fullWidth = false,
            children,
            disabled,
            className,
            ...props
        },
        ref
    ) => {
        const base =
            'inline-flex items-center justify-center gap-2 font-bold rounded-2xl border transition-all duration-200 ease-out select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

        const variants: Record<ButtonVariant, string> = {
            primary:
                'bg-[#1A1C19] text-[#FDFCF9] border-[#1A1C19] hover:bg-[#2D5A43] active:bg-[#234A36] focus-visible:ring-[#2D5A43]',
            secondary:
                'bg-[#FDFCF9] text-[#1A1C19] border-[#E5E2D9] hover:bg-[#F9F7F2] active:bg-[#E5E2D9] focus-visible:ring-[#E5E2D9]',
            ghost:
                'bg-transparent text-[#444941] border-transparent hover:bg-[#F9F7F2] active:bg-[#E5E2D9] focus-visible:ring-[#E5E2D9]',
            danger:
                'bg-[#FDFCF9] text-[#A64D3F] border-[#A64D3F]/20 hover:bg-[#FDF2F0] active:bg-[#FCEAE7] focus-visible:ring-[#A64D3F]',
        };

        const sizes: Record<ButtonSize, string> = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-11 px-5 text-sm',
            lg: 'h-13 px-7 text-base',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
                {...props}
            >
                {loading ? (
                    <span className="inline-flex items-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        {children}
                    </span>
                ) : (
                    <>
                        {icon && <span className="shrink-0">{icon}</span>}
                        {children}
                        {iconRight && <span className="shrink-0">{iconRight}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';