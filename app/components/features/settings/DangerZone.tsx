import { useState } from 'react';
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import { deleteUser } from 'aws-amplify/auth';
import { Spinner } from '@/components/ui/Spinner';

export function DangerZone() {
    const [deleting, setDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "CRITICAL: Are you absolutely sure? This will delete your identity from Cognito. Your warranties and images will be permanently orphaned."
        );
        
        if (!confirmed) return;

        setDeleting(true);
        try {
            await deleteUser();
            window.location.href = '/';
        } catch (err: any) {
            alert(err.message || "Failed to delete account. Please try again.");
            setDeleting(false);
        }
    };

    return (
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-[#FDF2F0] border border-[#A64D3F]/20 rounded-[2.5rem] p-10 space-y-6 lg:sticky lg:top-24">
                <div className="w-14 h-14 bg-[#A64D3F] text-[#FDFCF9] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#A64D3F]/20">
                    {deleting ? <Spinner size="md" className="text-[#FDFCF9]" /> : <FiTrash2 size={22} strokeWidth={2} />}
                </div>
                <div>
                    <h3 className="text-2xl font-black tracking-tight text-[#A64D3F]">Danger Zone</h3>
                    <p className="text-[#A64D3F]/60 font-medium text-sm mt-2 leading-relaxed">
                        Once you delete your account, there is no going back. Your authentication identity will be permanently removed.
                    </p>
                </div>
                <button 
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="w-full h-14 rounded-2xl bg-[#FDFCF9] border border-[#A64D3F]/20 text-[#A64D3F] font-black hover:bg-[#A64D3F] hover:text-[#FDFCF9] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {deleting ? 'Deleting...' : 'Delete Account'}
                </button>
            </div>
        </div>
    );
}

