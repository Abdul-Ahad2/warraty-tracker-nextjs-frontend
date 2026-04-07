'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    FiShield,
    FiList,
    FiBell,
    FiSettings,
    FiChevronLeft,
    FiChevronRight,
    FiHelpCircle,
} from 'react-icons/fi';
import { BiNote } from 'react-icons/bi';
import { useUser } from '@/hooks/useUser';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Avatar } from '@/components/ui/Avatar';
import { useNotifications } from '@/components/providers/NotificationProvider';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useUser();
    const { unreadCount } = useNotifications();

    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: FiShield },
        { label: 'Warranties', href: '/documents', icon: FiList },
        { label: 'Notifications', href: '/notifications', icon: FiBell, badge: unreadCount },
        { label: 'Settings', href: '/settings', icon: FiSettings },
        { label: 'Help & Support', href: '/help-and-support', icon: FiHelpCircle },
    ];

    return (
        <aside
            className={cn(
                'hidden md:flex flex-col h-screen sticky top-0 border-r border-[#E5E2D9] bg-[#F9F7F2] transition-all duration-300 ease-out shrink-0 z-20',
                collapsed ? 'w-[72px]' : 'w-[260px]'
            )}
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-5 border-b border-[#E5E2D9] shrink-0">
                <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-9 h-9 bg-[#1A1C19] rounded-full flex items-center justify-center shrink-0">
                        <BiNote size={16} className="text-[#FDFCF9]" />
                    </div>
                    {!collapsed && (
                        <span className="font-black text-xl tracking-tighter text-[#1A1C19] whitespace-nowrap">
                            Warrantor.
                        </span>
                    )}
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-1 p-3 flex-1" aria-label="Main navigation">
                {navItems.map(({ label, href, icon: Icon, badge }) => {
                    const isActive = pathname === href || pathname?.startsWith(href + '/');
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-label={label}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                'relative flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group',
                                isActive
                                    ? 'bg-[#2D5A43] text-[#FDFCF9]'
                                    : 'text-[#444941] hover:bg-[#FDFCF9] hover:text-[#1A1C19]'
                            )}
                        >
                            <Icon
                                size={18}
                                strokeWidth={1.8}
                                className="shrink-0"
                            />
                            {!collapsed && (
                                <>
                                    <span className="truncate">{label}</span>
                                    {badge && badge > 0 && (
                                        <span
                                            className={cn(
                                                'ml-auto min-w-[22px] h-[22px] px-1.5 text-[10px] font-black rounded-full flex items-center justify-center shrink-0',
                                                isActive ? 'bg-[#FDFCF9] text-[#2D5A43]' : 'bg-[#E5E2D9] text-[#444941]'
                                            )}
                                        >
                                            {badge}
                                        </span>
                                    )}
                                </>
                            )}
                            {collapsed && (
                                <div className="absolute left-full ml-3 px-3 py-2 bg-[#1A1C19] text-[#FDFCF9] text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                    {label}
                                    {badge && badge > 0 && ` (${badge})`}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Info */}
            <div className="p-3 border-t border-[#E5E2D9] mt-auto">
                {!collapsed ? (
                    <div className="flex items-center gap-2.5 px-3 py-3 rounded-2xl hover:bg-[#FDFCF9] transition-colors duration-200 cursor-pointer">
                        <Avatar name={user.name} size="sm" status="online" className="ring-1 ring-[#E5E2D9]" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#1A1C19] truncate leading-tight">
                                {user.name}
                            </p>
                            <p className="text-xs text-[#8A8A85] truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-3">
                        <Avatar name={user.name} size="sm" status="online" className="ring-1 ring-[#E5E2D9]" />
                    </div>
                )}
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className={cn(
                    "absolute -right-3 top-20 w-6 h-6 bg-[#F9F7F2] border border-[#E5E2D9] rounded-full flex items-center justify-center hover:bg-[#FDFCF9] text-[#8A8A85] hover:text-[#1A1C19] transition-all duration-200 z-50",
                    collapsed && "rotate-180"
                )}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {collapsed ? (
                    <FiChevronRight size={14} strokeWidth={2} />
                ) : (
                    <FiChevronLeft size={14} strokeWidth={2} />
                )}
            </button>
        </aside>
    );
}