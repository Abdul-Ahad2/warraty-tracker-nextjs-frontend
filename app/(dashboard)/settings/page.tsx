'use client';
import { useEffect, useRef, useState } from 'react';
import { SettingsHeader } from '@/components/features/settings/SettingsHeader';
import { SettingsNav } from '@/components/features/settings/SettingsNav';
import { ProfileSettings, ProfileSettingsHandle } from '@/components/features/settings/ProfileSettings';
import { SecuritySettings } from '@/components/features/settings/SecuritySettings';
import { PreferenceSettings } from '@/components/features/settings/PreferenceSettings';
import { DangerZone } from '@/components/features/settings/DangerZone';
import { settingsTabs } from '@/components/features/settings/constants';
import { api } from '@/utils/api';
import { fetchMFAPreference } from 'aws-amplify/auth';
import { Spinner } from '@/components/ui/Spinner';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        name: '',
        email: '',
        preferences: {
            emailAlerts: true,
            pushNotifications: true
        }
    });

    const [twoFAEnabled, setTwoFAEnabled] = useState(false);
    const profileRef = useRef<ProfileSettingsHandle>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Fetch basic settings
                const data = await api.get<any>('/settings');
                setSettings({
                    name: data.name || '',
                    email: data.email || '',
                    preferences: data.preferences || { emailAlerts: true, pushNotifications: true }
                });

                // Fetch MFA status from Cognito
                const { preferred } = await fetchMFAPreference();
                setTwoFAEnabled(preferred === 'TOTP');
            } catch (err) {
                console.error('Failed to fetch settings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            // If the profile tab is active, we might need a specific save from the child if it has internal validation
            // But for simplicity, we'll just push the current state to the backend
            await api.put('/settings', settings);
            alert('Settings updated successfully!');
        } catch (err) {
            console.error('Failed to save settings:', err);
            alert('Failed to update settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCF9]">
                <Spinner size="lg" className="text-[#2D5A43]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF9] py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <SettingsHeader saving={saving} handleSave={handleSave} />
                <SettingsNav tabs={settingsTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-[#F9F7F2] border border-[#E5E2D9] rounded-[2.5rem] p-10 md:p-14">
                            <div className="space-y-10">
                                {activeTab === 'profile' && (
                                    <ProfileSettings
                                        ref={profileRef}
                                        name={settings.name}
                                        email={settings.email}
                                        onUpdate={(name: string) => setSettings(prev => ({ ...prev, name }))}
                                    />
                                )}
                                {activeTab === 'security' && (
                                    <SecuritySettings twoFAEnabled={twoFAEnabled} setTwoFAEnabled={setTwoFAEnabled} />
                                )}
                                {activeTab === 'preferences' && (
                                    <PreferenceSettings
                                        preferences={settings.preferences}
                                        onUpdate={(newPrefs: { emailAlerts?: boolean; pushNotifications?: boolean }) =>
                                            setSettings(prev => ({ ...prev, preferences: { ...prev.preferences, ...newPrefs } }))
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 transition-all">
                        <DangerZone />
                    </div>
                </div>
            </div>
        </div>
    );
}