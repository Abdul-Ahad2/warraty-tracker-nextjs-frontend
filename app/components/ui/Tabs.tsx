'use client';

import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

interface Tab {
    label: string;
    value: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

interface TabsProps {
    tabs: Tab[];
    value: string;
    onChange: (value: string) => void;
    variant?: 'default' | 'pill' | 'underline';
    fullWidth?: boolean;
    className?: string;
}

/**
 * Tabs Component
 *
 * A flexible, accessible tabbed interface with smooth animations.
 *
 * @example
 * const tabs = [
 *   { label: 'Overview', value: 'overview' },
 *   { label: 'Settings', value: 'settings' },
 * ];
 *
 * <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
 */
export function Tabs({
    tabs,
    value,
    onChange,
    variant = 'default',
    fullWidth = false,
    className,
}: TabsProps) {
    const [isInitialized, setIsInitialized] = useState(false);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [_indicatorStyle, setIndicatorStyle] = useState<{
        left: number;
        width: number;
    } | null>(null);

    // Update indicator position when active tab changes
    useEffect(() => {
        if (!isInitialized) setIsInitialized(true); // eslint-disable-line react-hooks/set-state-in-effect

        const activeIndex = tabs.findIndex((t) => t.value === value);
        const activeTab = tabRefs.current[activeIndex];

        if (activeTab) {
            const parentRect = activeTab.parentElement?.getBoundingClientRect();
            const tabRect = activeTab.getBoundingClientRect();

            if (parentRect) {
                setIndicatorStyle({
                    left: tabRect.left - parentRect.left,
                    width: tabRect.width,
                });
            }
        }
    }, [value, tabs, isInitialized]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const activeIndex = tabs.findIndex((t) => t.value === value);
            const activeTab = tabRefs.current[activeIndex];

            if (activeTab) {
                const parentRect = activeTab.parentElement?.getBoundingClientRect();
                const tabRect = activeTab.getBoundingClientRect();

                if (parentRect) {
                    setIndicatorStyle({
                        left: tabRect.left - parentRect.left,
                        width: tabRect.width,
                    });
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [value, tabs]);

    // Default variant
    if (variant === 'default') {
        return (
            <div
                className={cn(
                    'inline-flex items-center gap-1 p-1 bg-[#FDFCF9] rounded-2xl',
                    fullWidth && 'w-full',
                    className
                )}
                role="tablist"
            >
                {tabs.map((tab, index) => (
                    <button
                        key={tab.value}
                        ref={(el) => {
                            tabRefs.current[index] = el;
                        }}
                        onClick={() => !tab.disabled && onChange(tab.value)}
                        className={cn(
                            'relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:ring-offset-2',
                            value === tab.value
                                ? 'text-[#FDFCF9] bg-[#2D5A43] shadow-sm'
                                : 'text-[#8A8A85] hover:text-[#1A1C19]',
                            tab.disabled && 'opacity-50 cursor-not-allowed'
                        )}
                        disabled={tab.disabled}
                        role="tab"
                        aria-selected={value === tab.value}
                        aria-controls={`panel-${tab.value}`}
                    >
                        <span className="flex items-center gap-2">
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>
        );
    }

    // Pill variant
    if (variant === 'pill') {
        return (
            <div
                className={cn(
                    'flex items-center gap-2',
                    fullWidth && 'w-full',
                    className
                )}
                role="tablist"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => !tab.disabled && onChange(tab.value)}
                        className={cn(
                            'px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap',
                            'focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:ring-offset-2',
                            value === tab.value
                                ? 'bg-[#1A1C19] text-[#FDFCF9]'
                                : 'bg-[#F9F7F2] text-[#444941] hover:bg-[#E5E2D9]',
                            tab.disabled && 'opacity-50 cursor-not-allowed'
                        )}
                        disabled={tab.disabled}
                        role="tab"
                        aria-selected={value === tab.value}
                        aria-controls={`panel-${tab.value}`}
                    >
                        <span className="flex items-center gap-2">
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>
        );
    }

    // Underline variant
    if (variant === 'underline') {
        return (
            <div
                className={cn(
                    'border-b border-[#E5E2D9]',
                    className
                )}
                role="tablist"
            >
                <div className="relative flex items-center gap-8">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.value}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            onClick={() => !tab.disabled && onChange(tab.value)}
                            className={cn(
                                'relative px-0 py-3 text-sm font-bold transition-colors duration-200 border-b-2 border-transparent',
                                'focus:outline-none',
                                value === tab.value
                                    ? 'text-[#1A1C19] border-b-[#2D5A43]'
                                    : 'text-[#8A8A85] hover:text-[#1A1C19]',
                                tab.disabled && 'opacity-50 cursor-not-allowed'
                            )}
                            disabled={tab.disabled}
                            role="tab"
                            aria-selected={value === tab.value}
                            aria-controls={`panel-${tab.value}`}
                        >
                            <span className="flex items-center gap-2">
                                {tab.icon}
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

/**
 * TabsContent Component
 *
 * Wrapper for tab content that manages visibility.
 *
 * @example
 * <TabsContent value="overview" activeTab={activeTab}>
 *   Content here
 * </TabsContent>
 */
interface TabsContentProps {
    value: string;
    activeTab: string;
    children: React.ReactNode;
    className?: string;
}

export function TabsContent({ value, activeTab, children, className }: TabsContentProps) {
    const isActive = value === activeTab;

    return (
        <div
            id={`panel-${value}`}
            role="tabpanel"
            aria-labelledby={`tab-${value}`}
            hidden={!isActive}
            className={cn(
                'transition-opacity duration-200',
                isActive ? 'opacity-100' : 'opacity-0 hidden',
                className
            )}
        >
            {children}
        </div>
    );
}