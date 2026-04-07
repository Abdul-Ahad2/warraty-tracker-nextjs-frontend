import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    children: React.ReactNode;
    className?: string;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
    '2xl': 'max-w-5xl',
    '3xl': 'max-w-7xl',
    full: 'max-w-[98vw]',
};

export function Modal({ open, onClose, title, description, size = 'md', children, className }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop: Intense full-screen blur and deep overlay */}
            <div
                className="absolute inset-0 bg-[#1A1C19]/80 backdrop-blur-[60px] animate-in fade-in duration-700"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog Body */}
            <div
                ref={dialogRef}
                className={cn(
                    'relative w-full bg-[#FDFCF9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden',
                    'border border-[#E5E2D9] shadow-[0_50px_100px_rgba(26,28,25,0.4)]',
                    'animate-in zoom-in-95 fade-in slide-in-from-bottom-10 duration-500 ease-out',
                    sizeClasses[size],
                    className
                )}
            >
                {/* Close Button: Absolute positioned */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 md:top-10 md:right-10 z-10 p-3 rounded-2xl bg-[#F9F7F2] border border-[#E5E2D9] text-[#1A1C19] hover:bg-[#2D5A43] hover:text-[#FDFCF9] transition-all duration-300"
                >
                    <FiX size={18} />
                </button>

                {/* Header Section: Compact text */}
                {(title || description) && (
                    <div className="p-8 md:p-14 pb-0 space-y-1.5 max-w-[85%]">
                        {title && (
                            <h2 className="text-xl md:text-2xl font-black text-[#1A1C19] tracking-tighter leading-none">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs md:text-sm text-[#444941] font-medium leading-relaxed italic opacity-70">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Main Content Area */}
                <div className={cn('p-8 md:p-14 pt-6 md:pt-10', (title || description) && 'pt-4 md:pt-6')}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}


export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn(
            'flex items-center justify-end gap-4 p-8 bg-[#F9F7F2] border-t border-[#E5E2D9]',
            className
        )}>
            {children}
        </div>
    );
}