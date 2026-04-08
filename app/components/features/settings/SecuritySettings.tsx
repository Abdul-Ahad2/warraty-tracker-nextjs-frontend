"use client"
import { useState } from 'react';
import { FiLock, FiShield, FiCheckCircle, FiX } from 'react-icons/fi';
import { updatePassword, setUpTOTP, verifyTOTPSetup, updateMFAPreference, deleteUser } from 'aws-amplify/auth';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

interface SecuritySettingsProps {
    twoFAEnabled: boolean;
    setTwoFAEnabled: (enabled: boolean) => void;
}

export function SecuritySettings({ twoFAEnabled, setTwoFAEnabled }: SecuritySettingsProps) {
    const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // MFA / 2FA State
    const [showMFAModal, setShowMFAModal] = useState(false);
    const [mfaSetupDetails, setMfaSetupDetails] = useState<{ sharedSecret: string } | null>(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [mfaError, setMfaError] = useState('');

    const handleChangePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            setPasswordError("New passwords do not match");
            return;
        }
        if (passwords.new.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        setChangingPassword(true);
        setPasswordError('');
        try {
            await updatePassword({
                oldPassword: passwords.old,
                newPassword: passwords.new
            });
            alert('Password updated successfully!');
            setPasswords({ old: '', new: '', confirm: '' });
        } catch (err: any) {
            setPasswordError(err.message || 'Failed to update password');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleEnable2FA = async () => {
        try {
            setMfaError('');
            const details = await setUpTOTP();
            setMfaSetupDetails({
                sharedSecret: details.sharedSecret
            });
            setShowMFAModal(true);
        } catch (err: any) {
            alert(err.message || 'Failed to start 2FA setup');
        }
    };


    const handleVerifyTOTP = async () => {
        if (verificationCode.length !== 6) return;
        setVerifying(true);
        setMfaError('');
        try {
            await verifyTOTPSetup({ code: verificationCode });
            await updateMFAPreference({ totp: 'PREFERRED' });
            setTwoFAEnabled(true);
            setShowMFAModal(false);
            alert('2-Factor Authentication enabled!');
        } catch (err: any) {
            setMfaError(err.message || 'Invalid code. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    const handleDisable2FA = async () => {
        if (!confirm('Are you sure you want to disable 2-Factor Authentication?')) return;
        try {
            await updateMFAPreference({ totp: 'DISABLED' });
            setTwoFAEnabled(false);
            alert('2-Factor Authentication disabled.');
        } catch (err: any) {
            alert(err.message || 'Failed to disable 2FA');
        }
    };

    const qrCodeUrl = mfaSetupDetails
        ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`otpauth://totp/Warrantor?secret=${mfaSetupDetails.sharedSecret}&issuer=Warrantor`)}`
        : '';

    return (
        <div className="space-y-12">
            <div className="text-left">
                <h2 className="text-3xl font-black tracking-tighter text-neutral-900">Vault Security</h2>
                <p className="text-neutral-500 font-medium italic">Keep your assets and identity locked down.</p>
            </div>

            {/* 2FA Toggle Section */}
            <div className={`p-10 rounded-[2.5rem] border-2 transition-all ${twoFAEnabled ? 'bg-[#F1F8F4] border-[#2D5A43]/20' : 'bg-neutral-50 border-neutral-100'}`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-2xl shadow-sm ${twoFAEnabled ? 'bg-[#2D5A43] text-white' : 'bg-white text-neutral-400'}`}>
                            <FiShield size={24} />
                        </div>
                        <div>
                            <p className="font-black text-xl text-neutral-900">2-Factor Authentication (TOTP)</p>
                            <p className="text-sm font-medium text-neutral-400">Use an app like Google Authenticator to secure your account.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${twoFAEnabled ? 'text-[#2D5A43]' : 'text-neutral-400'}`}>
                            {twoFAEnabled ? 'Protected' : 'Unsecured'}
                        </span>
                        <button
                            onClick={twoFAEnabled ? handleDisable2FA : handleEnable2FA}
                            className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-[#2D5A43] ${twoFAEnabled ? 'bg-[#2D5A43]' : 'bg-neutral-200'
                                }`}
                        >
                            <span className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${twoFAEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Password Change Section */}
            <div className="pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-3 mb-8">
                    <FiLock className="text-neutral-400" />
                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">Access Credentials</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Current Password</label>
                        <input
                            type="password"
                            className="w-full h-16 px-6 bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-black rounded-2xl outline-none font-bold text-lg transition-all"
                            value={passwords.old}
                            onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">New Password</label>
                        <input
                            type="password"
                            className="w-full h-16 px-6 bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-black rounded-2xl outline-none font-bold text-lg transition-all"
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            placeholder="Min. 8 characters"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full h-16 px-6 bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-black rounded-2xl outline-none font-bold text-lg transition-all"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            placeholder="Repeat new password"
                        />
                    </div>
                    <div className="flex items-end">
                        <Button
                            variant="primary"
                            className="w-full h-16 rounded-2xl font-black text-sm"
                            disabled={changingPassword || !passwords.old || !passwords.new}
                            onClick={handleChangePassword}
                            icon={changingPassword ? <Spinner size="sm" className="text-white" /> : <FiLock />}
                        >
                            {changingPassword ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </div>
                {passwordError && <p className="text-sm font-bold text-[#E94E3B] mt-4 ml-4">{passwordError}</p>}
                <Modal
                    open={showMFAModal}
                    onClose={() => setShowMFAModal(false)}
                    title="2FA Activation"
                    description="Bridge your device to the encrypted ledger."
                    size="2xl" // Changed to 2xl for a better horizontal aspect ratio
                    className="overflow-hidden" // Ensure the modal clips the inner corners
                >
                    {/* NEGATIVE MARGIN WRAPPER: 
       This cancels out the Modal's internal padding (p-8/p-14) 
       so the horizontal sections hit the edges perfectly.
    */}
                    <div className="-m-8 md:-m-14 -mt-4 md:-mt-6">
                        <div className="flex flex-col lg:flex-row min-h-[500px]">

                            {/* LEFT WING: Scanning Zone (Cream/Forest Green) */}
                            <div className="lg:w-[42%] bg-[#F9F7F2] p-10 md:p-16 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#E5E2D9]">
                                <div className="space-y-8 text-center w-full">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2D5A43]/10 border border-[#2D5A43]/20 rounded-full text-[#2D5A43] text-[10px] font-black uppercase tracking-[0.2em]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43] animate-pulse" />
                                        Scanning Surface
                                    </div>

                                    <div className="relative group mx-auto w-fit p-5 bg-white rounded-[2.5rem] shadow-sm border border-[#E5E2D9]">
                                        {qrCodeUrl ? (
                                            <img src={qrCodeUrl} alt="2FA" className="w-44 h-44 md:w-52 md:h-52" />
                                        ) : (
                                            <div className="w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
                                                <Spinner size="lg" className="text-[#2D5A43]" />
                                            </div>
                                        )}
                                        {/* Brackets */}
                                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#2D5A43]/30 rounded-tl-xl" />
                                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#2D5A43]/30 rounded-br-xl" />
                                    </div>

                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-relaxed max-w-[200px] mx-auto">
                                        Capture this signature with your TOTP app
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT WING: Entry Zone (White) */}
                            <div className="lg:w-[58%] bg-white p-10 md:p-16 flex flex-col justify-between">
                                <div className="space-y-12">
                                    {/* Header: Since the Modal already has a title, we focus on the Input Label here */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-neutral-400">
                                            Verification Token
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                maxLength={6}
                                                inputMode="numeric"
                                                className="w-full h-24 bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-[#2D5A43] rounded-[2rem] text-center text-5xl font-black text-[#2D5A43] tracking-[0.4em] outline-none transition-all shadow-inner"
                                                placeholder="000000"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                            />
                                            {mfaError && (
                                                <p className="absolute -bottom-8 left-4 text-[10px] font-bold text-[#A64D3F] italic">
                                                    {mfaError}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Setup Key: Discreet Manual Entry */}
                                    <div className="p-5 bg-[#F9F7F2]/50 rounded-2xl border border-[#E5E2D9]/50 flex items-center justify-between gap-4">
                                        <div className="overflow-hidden">
                                            <p className="text-[9px] font-black uppercase text-neutral-400 mb-1">Manual Key</p>
                                            <code className="block text-[11px] font-mono font-bold text-neutral-600 truncate">
                                                {mfaSetupDetails?.sharedSecret}
                                            </code>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (mfaSetupDetails?.sharedSecret) {
                                                    navigator.clipboard.writeText(mfaSetupDetails.sharedSecret);
                                                    alert('Key Copied');
                                                }
                                            }}
                                            className="shrink-0 p-3 bg-white border border-[#E5E2D9] rounded-xl hover:text-[#2D5A43] hover:border-[#2D5A43] transition-all"
                                        >
                                            <FiCheckCircle size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 pt-12">
                                    <button
                                        onClick={() => setShowMFAModal(false)}
                                        className="flex-1 h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                                    >
                                        Abort
                                    </button>
                                    <Button
                                        variant="primary"
                                        className="flex-[2] h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-[#2D5A43] shadow-lg hover:translate-y-[-2px] transition-all"
                                        onClick={handleVerifyTOTP}
                                        disabled={verificationCode.length !== 6 || verifying}
                                        icon={verifying ? <Spinner size="sm" className="text-white" /> : <FiShield size={18} />}
                                    >
                                        {verifying ? 'Linking...' : 'Activate'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}


