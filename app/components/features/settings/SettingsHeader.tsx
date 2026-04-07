import { FiSave, FiLogOut } from 'react-icons/fi';
import { signOut } from 'aws-amplify/auth';

interface SettingsHeaderProps { saving: boolean; handleSave: () => void; }

export function SettingsHeader({ saving, handleSave }: SettingsHeaderProps) {
    const handleSignOut = async () => {
        try {
            await signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 animate-fade-in-up">
            <div>
                <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase mb-4">Account</p>
                <h1 className="font-black text-[#1A1C19] text-6xl md:text-8xl tracking-tighter leading-[0.85] mb-3">Settings.</h1>
                <p className="text-[#444941] text-xl font-medium">Manage your account, preferences, and security.</p>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={handleSignOut} className="h-14 px-8 rounded-2xl border border-[#E5E2D9] text-[#444941] hover:text-[#A64D3F] hover:border-[#A64D3F]/20 hover:bg-[#FDF2F0] transition-all flex items-center gap-2 font-black text-sm">
                    <FiLogOut size={16} strokeWidth={2} /><span>Sign Out</span>
                </button>
                <button onClick={handleSave} disabled={saving} className="h-14 px-8 rounded-2xl bg-[#1A1C19] hover:bg-[#2D5A43] text-[#FDFCF9] disabled:opacity-70 transition-all active:scale-95 flex items-center gap-2 font-black text-sm whitespace-nowrap shadow-xl shadow-black/10">
                    <FiSave size={16} strokeWidth={2} className={saving ? 'animate-pulse' : ''} /><span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>
        </div>
    );
}
