"use client"
import { useState, useEffect } from 'react';
import { NotificationsHeader } from '@/components/features/notifications/NotificationsHeader';
import { NotificationsControls } from '@/components/features/notifications/NotificationsControls';
import { NotificationRow } from '@/components/features/notifications/NotificationRow';
import { staticTabs } from '@/components/features/notifications/constants';
import type { Notification } from '@/types';
import { useNotifications } from '@/components/providers/NotificationProvider';

export default function NotificationsPage() {
    const { notifications: allNotifications, unreadCount: globalUnread, loading, markAsRead } = useNotifications();
    const [localNotifications, setLocalNotifications] = useState<Notification[]>([]);
    const [activeTab, setActiveTab] = useState('all');

    // Sync local state when global notifications change
    useEffect(() => {
        setLocalNotifications(allNotifications);
    }, [allNotifications]);

    const unreadCount = localNotifications.filter((n) => !n.read).length;
    const pendingCount = localNotifications.filter((n) => n.status === 'pending').length;

    const filtered = localNotifications.filter((n) => {
        if (activeTab === 'pending') return n.status === 'pending';
        if (activeTab === 'expiry') return n.type === 'expiry_warning' || n.type === 'expired';
        if (activeTab === 'read') return n.read;
        return true;
    });

    const handleRead = (id: string) => {
        markAsRead(id);
    };
    
    const handleMarkAllRead = () => {
        // Implement markAllRead in the provider if needed, for now individual is prioritized
        localNotifications.filter(n => !n.read).forEach(n => markAsRead(n.id));
    };

    const tabsWithBadges = staticTabs.map(tab => {
        if (tab.value === 'all') return { ...tab, badge: unreadCount > 0 ? unreadCount : undefined };
        if (tab.value === 'pending') return { ...tab, badge: pendingCount > 0 ? pendingCount : undefined };
        return tab;
    });

    return (
        <div className="min-h-screen bg-[#FDFCF9] py-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <NotificationsHeader unreadCount={unreadCount} />
                <NotificationsControls tabs={tabsWithBadges} activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadCount} handleMarkAllRead={handleMarkAllRead} />
                <div className="space-y-5">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-10 h-10 border-2 border-[#E5E2D9] border-t-[#2D5A43] rounded-full animate-spin" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-[#F9F7F2] rounded-[3rem] border-2 border-dashed border-[#E5E2D9]">
                            <h3 className="font-black text-2xl text-[#1A1C19] tracking-tight">All clear.</h3>
                            <p className="text-[#8A8A85] mt-2 text-sm font-medium">No warranty alerts at this time.</p>
                        </div>
                    ) : (
                        filtered.map((n, i) => (
                            <NotificationRow key={n.id} index={i} notification={n} onRead={handleRead} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}