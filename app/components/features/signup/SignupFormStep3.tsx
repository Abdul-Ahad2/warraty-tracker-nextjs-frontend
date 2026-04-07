import { FiLock, FiMail } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { resendSignUpCode } from 'aws-amplify/auth';

interface SignupFormStep3Props { form: { email: string; code: string }; setForm: (form: any) => void; errors: Record<string, string>; handleVerify: (e: React.FormEvent) => void; setStep: (step: number) => void; loading: boolean; }

export function SignupFormStep3({ form, setForm, errors, handleVerify, setStep, loading }: SignupFormStep3Props) {
    const [resending, setResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<string | null>(null);
    const handleResend = async () => { 
        setResending(true); 
        setResendStatus(null); 
        try { 
            await resendSignUpCode({ username: form.email }); 
            setResendStatus('Code resent!'); 
        } catch (error: any) { 
            setResendStatus(error.message || 'Error resending.'); 
        } finally { setResending(false); } 
    };

    return (
        <form onSubmit={handleVerify} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }} noValidate>
            <div className="p-8 bg-[#D4E3D7] rounded-[2rem] border border-[#2D5A43]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><FiMail size={64} /></div>
                <h3 className="font-black text-2xl text-[#1A1C19] mb-2 tracking-tight">Check your email</h3>
                <p className="text-sm text-[#2D5A43] font-medium leading-relaxed">
                    We&apos;ve sent a 6-digit code to <br/><span className="text-[#1A1C19] font-black">{form.email}</span>
                </p>
            </div>
            {errors.general && <div className="p-5 bg-[#FDF2F0] border border-[#A64D3F]/20 text-[#A64D3F] text-sm font-bold rounded-2xl">{errors.general}</div>}
            <Input id="code" type="text" label="Verification Code" placeholder="123456" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} error={errors.code} icon={<FiLock size={18} strokeWidth={1.5} />} autoComplete="one-time-code" hint="Enter the 6-digit code from your email" />
            <div className="flex flex-col gap-4 pt-2">
                <Button type="submit" variant="primary" fullWidth loading={loading} className="h-14 text-base font-black rounded-2xl">{loading ? 'Verifying…' : 'Verify Account'}</Button>
                <div className="text-center space-y-2">
                    <button type="button" onClick={handleResend} disabled={resending} className="text-sm text-[#444941] hover:text-[#2D5A43] font-bold transition-colors underline underline-offset-4 disabled:opacity-50">
                        {resending ? 'Sending...' : 'Didn\'t receive code? Resend'}
                    </button>
                    {resendStatus && <p className={`text-xs font-bold ${resendStatus.includes('Error') ? 'text-[#A64D3F]' : 'text-[#2D5A43]'}`}>{resendStatus}</p>}
                </div>
            </div>
        </form>
    );
}
