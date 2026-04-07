"use client"
import { useState, useImperativeHandle, forwardRef } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useUser } from '@/hooks/useUser';


export interface ProfileSettingsHandle {
    save: () => Promise<void>;
}

interface ProfileSettingsProps {
    name: string;
    email: string;
    onUpdate: (name: string) => void;
}

export const ProfileSettings = forwardRef<ProfileSettingsHandle, ProfileSettingsProps>(({ name, email, onUpdate }, ref) => {
    // We can keep the initials logic
    const initials = name
        ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : email ? email[0].toUpperCase() : 'U';

    // No internal saving state needed here as the parent handles the global save
    useImperativeHandle(ref, () => ({
        save: async () => {
            // Placeholder for any local validation if needed
        }
    }));

    return (
        <div className="space-y-12">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center border-b border-neutral-100 pb-10">
                <div className="relative group flex-shrink-0">
                    <div className="w-32 h-32 rounded-full ring-8 ring-neutral-50 bg-gradient-to-br from-[#2D5A43] to-[#444941] flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                        {initials}
                    </div>
                    <button
                        className="absolute bottom-2 right-2 p-3 bg-black text-white rounded-2xl shadow-xl hover:scale-110 hover:bg-gray-600 transition-all flex items-center justify-center"
                        aria-label="Change profile picture"
                    >
                        <FiCamera size={18} />
                    </button>
                </div>
                <div className="text-left">
                    <h2 className="text-3xl font-black tracking-tighter text-neutral-900">Identity Details</h2>
                    <p className="text-neutral-500 font-medium italic">Manage your public information in the Warrantor app.</p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Full Name</label>
                    <input
                        type="text"
                        className="w-full h-16 px-6 bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-[#2D5A43] rounded-2xl outline-none font-bold text-lg transition-all"
                        value={name}
                        onChange={(e) => onUpdate(e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Email Address</label>
                    <input
                        type="email"
                        className="w-full h-16 px-6 bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-black rounded-2xl outline-none font-bold text-lg transition-all opacity-50 cursor-not-allowed"
                        value={email}
                        disabled
                    />
                </div>
            </div>
        </div>
    );
});


ProfileSettings.displayName = 'ProfileSettings';


