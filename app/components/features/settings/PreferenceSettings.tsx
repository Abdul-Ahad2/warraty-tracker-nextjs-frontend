"use client"
import { FiMail, FiBell } from 'react-icons/fi';

interface PreferenceSettingsProps {
    preferences: {
        emailAlerts: boolean;
        pushNotifications: boolean;
    };
    onUpdate: (prefs: { emailAlerts?: boolean; pushNotifications?: boolean }) => void;
}

export function PreferenceSettings({ preferences, onUpdate }: PreferenceSettingsProps) {
    const toggleItems = [
        { 
            id: 'emailAlerts',
            icon: <FiMail size={20} />, 
            label: 'Email Alerts', 
            description: 'Receive expiration reminders via email',
            enabled: preferences.emailAlerts 
        },
        { 
            id: 'pushNotifications',
            icon: <FiBell size={20} />, 
            label: 'Push Notifications', 
            description: 'Get real-time browser alerts',
            enabled: preferences.pushNotifications 
        }
    ];

    return (
        <div className="space-y-10">
            <div className="text-left">
                <h2 className="text-3xl font-black tracking-tighter text-neutral-900">Preferences</h2>
                <p className="text-neutral-500 font-medium italic">Control how you want to be notified.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {toggleItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-6 p-8 bg-neutral-50 rounded-[2rem] border border-neutral-100 hover:border-[#2D5A43]/30 transition-all group"
                    >
                        <div className="flex items-center gap-6 flex-1 min-w-0">
                            <div className="p-4 bg-white rounded-2xl shadow-sm text-neutral-600 flex-shrink-0 group-hover:bg-[#2D5A43] group-hover:text-white transition-all duration-300">
                                {item.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl text-neutral-900">{item.label}</span>
                                <span className="text-sm font-medium text-neutral-400">{item.description}</span>
                            </div>
                        </div>

                        {/* Custom Toggle Switch */}
                        <button
                            onClick={() => onUpdate({ [item.id]: !item.enabled })}
                            className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-[#2D5A43] ${
                                item.enabled ? 'bg-[#2D5A43]' : 'bg-neutral-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                                    item.enabled ? 'translate-x-8' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
