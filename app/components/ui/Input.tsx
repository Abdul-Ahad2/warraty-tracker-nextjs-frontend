'use client';

import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, icon, iconRight, className, type, id, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className="flex flex-col gap-2 w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-bold text-[#1A1C19] select-none"
                    >
                        {label}
                    </label>
                )}
                <div className="relative flex items-center">
                    {icon && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A85] pointer-events-none">
                            {icon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={id}
                        type={resolvedType}
                        className={cn(
                            'w-full px-4 py-3 text-sm border border-[#E5E2D9] rounded-2xl',
                            'bg-[#FDFCF9] text-[#1A1C19] placeholder-[#8A8A85]',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:ring-offset-0 focus:border-transparent',
                            'hover:border-[#444941]/30',
                            !!icon && 'pl-11',
                            (!!iconRight || isPassword) && 'pr-11',
                            error && 'border-[#A64D3F] focus:ring-[#A64D3F]',
                            className
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A85] hover:text-[#444941] transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    )}
                    {iconRight && !isPassword && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A85] pointer-events-none">
                            {iconRight}
                        </span>
                    )}
                </div>
                {error && (
                    <p
                        id={`${id}-error`}
                        className="text-xs text-[#A64D3F] flex items-center gap-1 font-bold"
                        role="alert"
                    >
                        ⚠ {error}
                    </p>
                )}
                {!error && hint && (
                    <p
                        id={`${id}-hint`}
                        className="text-xs text-[#8A8A85]"
                    >
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';