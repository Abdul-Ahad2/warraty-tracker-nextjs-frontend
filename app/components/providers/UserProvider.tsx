'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

export interface UserAttributes {
    name: string;
    email: string;
    loading: boolean;
}

interface UserContextType {
    user: UserAttributes;
    loading: boolean;
    refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserAttributes>({ 
        name: '', 
        email: '', 
        loading: true 
    });

    const refresh = useCallback(async () => {
        setUser((prev) => ({ ...prev, loading: true }));
        try {
            await getCurrentUser();
            const attributes = await fetchUserAttributes();
            setUser({
                name: attributes.name || attributes.given_name || 'User',
                email: attributes.email || '',
                loading: false
            });
        } catch (error) {
            setUser({ name: '', email: '', loading: false });
        }
    }, []);

    useEffect(() => {
        refresh();

        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
                case 'signedIn':
                case 'tokenRefresh':
                    refresh();
                    break;
                case 'signedOut':
                    setUser({ name: '', email: '', loading: false });
                    break;
            }
        });

        return () => unsubscribe();
    }, [refresh]);

    return (
        <UserContext.Provider value={{ user, loading: user.loading, refresh }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}