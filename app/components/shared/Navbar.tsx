'use client';

import Link from 'next/link';
import { FiBell, FiSettings, FiLogOut, FiUser, FiHelpCircle } from 'react-icons/fi';
import { BiNote } from 'react-icons/bi';
import { Avatar } from '@/components/ui/Avatar';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { useUser } from '@/hooks/useUser';
import { useNotifications } from '@/components/providers/NotificationProvider';
import { signOut } from 'aws-amplify/auth';

export function Navbar() {
    const { user } = useUser();
    const { unreadCount } = useNotifications();

    const handleSignOut = async () => {
        try {
            await signOut()
            window.location.href = '/login';
        } catch (e) {
            console.log(`Error in signin out: ${e}`);
        }
    };

    const userName = user.name;
    const userEmail = user.email;
    return (
        <header className="sticky top-0 z-20 flex items-center h-16 px-6 bg-[#F9F7F2]/90 backdrop-blur-2xl border-b border-[#E5E2D9]">
            {/* Logo (mobile) */}
            <Link href="/dashboard" className="flex items-center gap-2 mr-6 shrink-0 md:hidden">
                <div className="w-9 h-9 bg-[#1A1C19] rounded-full flex items-center justify-center">
                    <BiNote size={16} className="text-[#FDFCF9]" />
                </div>
                <span className="font-black text-xl tracking-tighter text-[#1A1C19]">Warrantor.</span>
            </Link>

            <div className="flex items-center gap-3 ml-auto">
                {/* Notifications */}
                <Link
                    href="/notifications"
                    className="relative p-2.5 rounded-2xl text-[#444941] hover:text-[#1A1C19] hover:bg-[#FDFCF9] transition-all duration-200"
                    aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                >
                    <FiBell size={18} strokeWidth={1.8} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-[#2D5A43] text-[#FDFCF9] text-[9px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_#2D5A43]">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Link>

                {/* Profile menu */}
                <DropdownMenu
                    align="right"
                    trigger={
                        <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-2xl hover:bg-[#FDFCF9] transition-colors duration-200 cursor-pointer">
                            <Avatar name={userName} size="sm" status="online" />
                            <span className="hidden md:block text-sm font-bold text-[#1A1C19] max-w-[100px] truncate">
                                {userName.split(' ')[0]}
                            </span>
                        </div>
                    }
                    items={[
                        {
                            label: userEmail,
                            icon: <FiUser size={16} strokeWidth={1.5} />,
                            disabled: true,
                        },
                        { divider: true },
                        { label: 'Profile & Settings', icon: <FiSettings size={16} strokeWidth={1.5} />, href: '/settings' },
                        { label: 'Help & Support', icon: <FiHelpCircle size={16} strokeWidth={1.5} />, href: '/help' },
                        { divider: true },
                        { label: 'Sign out', icon: <FiLogOut size={16} strokeWidth={1.5} />, danger: true, onClick: handleSignOut },
                    ]}
                />
            </div>
        </header>
    );
}