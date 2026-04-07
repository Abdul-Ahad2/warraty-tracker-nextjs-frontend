'use client';

import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ToastType } from '@/types';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

const icons: Record<ToastType, React.ReactNode> = {
    success: <FiCheckCircle size={15} className="text-black" />,
    error: <FiAlertCircle size={15} className="text-black" />,
    info: <FiInfo size={15} className="text-black" />,
    warning: <FiAlertTriangle size={15} className="text-black" />,
};

const toastStyles: Record<ToastType, string> = {
    success: 'border-black bg-white',
    error: 'border-black bg-white',
    info: 'border-black bg-white',
    warning: 'border-black bg-white',
};

const progressColors: Record<ToastType, string> = {
    success: 'bg-black',
    error: 'bg-black',
    info: 'bg-black',
    warning: 'bg-black',
};

interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onDismiss: (id: string) => void;
}

export function ToastItem({ id, type, message, duration = 4000, onDismiss }: ToastProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onDismiss(id), 300);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, duration, onDismiss]);

    return (
        <div
            className={cn(
                'relative flex items-start gap-3 px-4 py-4 rounded-[2px] border shadow-2xl min-w-[300px] max-w-[400px] overflow-hidden',
                toastStyles[type],
                'transition-all duration-300',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}
            role="alert"
        >
            <span className="mt-0.5 shrink-0">{icons[type]}</span>
            <p className="text-sm font-medium text-[#1a1917] flex-1 leading-snug">{message}</p>
            <button
                onClick={() => { setVisible(false); setTimeout(() => onDismiss(id), 300); }}
                className="shrink-0 text-[#a8a29e] hover:text-[#57534e] transition-colors ml-1"
                aria-label="Dismiss notification"
            >
                <FiX size={14} />
            </button>
            {/* Progress bar */}
            <div
                className={cn('absolute bottom-0 left-0 h-0.5 rounded-full', progressColors[type])}
                style={{ animation: `shrinkWidth ${duration}ms linear forwards` }}
            />
            <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
        </div>
    );
}

// Toast container (place once near root)
interface ToastContainerProps {
    toasts: { id: string; type: ToastType; message: string; duration?: number }[];
    onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    return (
        <div
            className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2"
            aria-live="polite"
            aria-label="Notifications"
        >
            {toasts.map((t) => (
                <ToastItem key={t.id} {...t} onDismiss={onDismiss} />
            ))}
        </div>
    );
}
