'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

export interface DropdownItem {
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    danger?: boolean;
    divider?: boolean;
    disabled?: boolean;
}

interface DropdownMenuProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
    className?: string;
}

export function DropdownMenu({ trigger, items, align = 'right', className }: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div ref={ref} className={cn('relative inline-block', className)}>
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
                aria-haspopup="true"
                aria-expanded={open}
            >
                {trigger}
            </div>

            {open && (
                <div
                    className={cn(
                        'absolute top-full mt-2 z-30 min-w-[200px] bg-white border border-neutral-200 rounded-lg',
                        'shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-1.5 animate-fade-in',
                        align === 'right' ? 'right-0' : 'left-0'
                    )}
                    role="menu"
                    style={{
                        fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
                    }}
                >
                    {items.map((item, i) => {
                        if (item.divider) {
                            return <div key={i} className="my-1.5 h-px bg-neutral-100" role="separator" />;
                        }
                        return (
                            <button
                                key={i}
                                onClick={() => { item.onClick?.(); setOpen(false); }}
                                disabled={item.disabled}
                                className={cn(
                                    'w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-150',
                                    item.danger
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-neutral-900 hover:bg-neutral-100',
                                    item.disabled && 'opacity-50 pointer-events-none'
                                )}
                                role="menuitem"
                            >
                                {item.icon && <span className="shrink-0 text-neutral-500">{item.icon}</span>}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}