"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Notification, NotificationType } from '@/types';
import { api } from '@/utils/api';

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    refresh: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const markAsRead = async (id: string) => {
        // 1. Optimistic Update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));

        // 2. Persistent Update (only if not a dynamic 'alert-')
        if (!id.startsWith('alert-')) {
            try {
                await api.put(`/notifications/${id}`, { isRead: true });
            } catch (error) {
                console.error('Failed to mark notification as read in backend:', error);
            }
        }
    };

    const fetchNotifications = async () => {
        try {
            const data = await api.get<{ notifications: Notification[], unreadCount: number }>('/notifications');
            // Backend uses isRead as standard - map to 'read' if needed or standardize
            const standardized = (data.notifications || []).map(n => {
                const rawType = (n as any).type || 'system';
                let type: NotificationType = 'system';
                
                // Map backend uppercase types to frontend lowercase types
                if (rawType === 'EXPIRED') type = 'expired';
                else if (rawType === 'EXPIRY_WARNING') type = 'expiry_warning';
                else if (rawType === 'RENEWAL') type = 'renewal';
                else if (rawType === 'expiry_warning' || rawType === 'expired' || rawType === 'renewal') type = rawType;

                return {
                    ...n,
                    type,
                    read: typeof (n as any).isRead === 'boolean' ? (n as any).isRead : (n as any).read
                };
            });
            setNotifications(standardized);
            setUnreadCount(data.unreadCount || 0);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, loading, refresh: fetchNotifications, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
