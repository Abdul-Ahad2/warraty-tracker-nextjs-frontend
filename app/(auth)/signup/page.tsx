'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiNote } from 'react-icons/bi';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import { useUserContext } from '@/components/providers/UserProvider';
import { SuccessView } from '@/components/features/signup/SuccessView';
import { SignupBrandPanel } from '@/components/features/signup/SignupBrandPanel';
import { SignupProgressIndicator } from '@/components/features/signup/SignupProgressIndicator';
import { SignupFormStep1 } from '@/components/features/signup/SignupFormStep1';
import { SignupFormStep2 } from '@/components/features/signup/SignupFormStep2';
import { SignupFormStep3 } from '@/components/features/signup/SignupFormStep3';

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
    if (!password) return { score: 0, label: '', color: '#E5E2D9' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const map: Record<number, { label: string; color: string }> = {
        0: { label: 'Too short', color: '#A64D3F' },
        1: { label: 'Weak', color: '#A64D3F' },
        2: { label: 'Fair', color: '#B8860B' },
        3: { label: 'Good', color: '#2D5A43' },
        4: { label: 'Strong', color: '#2D5A43' },
    };
    return { score, ...map[score] };
}

export default function SignupPage() {
    const router = useRouter();
    const { user, refresh } = useUserContext();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', email: '', password: '', code: '', acceptTerms: false });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const strength = getPasswordStrength(form.password);

    useEffect(() => {
        if (!user.loading && user.name) {
            router.replace('/dashboard');
        }
    }, [user.loading, user.name, router]);

    const validateStep1 = () => { const e: Record<string, string> = {}; if (!form.name.trim()) e.name = 'Full name is required'; if (!form.email) e.email = 'Email is required'; else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'; return e; };
    const validateStep2 = () => { const e: Record<string, string> = {}; if (!form.password) e.password = 'Password is required'; else if (form.password.length < 8) e.password = 'At least 8 characters required'; if (!form.acceptTerms) e.acceptTerms = 'You must accept the terms to continue'; return e; };

    const handleNext = () => { const errs = validateStep1(); if (Object.keys(errs).length) { setErrors(errs); return; } setErrors({}); setStep(2); };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validateStep2();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        try {
            await signUp({
                username: form.email,
                password: form.password,
                options: { userAttributes: { name: form.name } }
            });
            setStep(3);
        } catch (error: any) {
            setErrors({ general: error.message || 'Error creating account.' });
        } finally { setLoading(false); }
    };
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code) { setErrors({ code: 'Verification code is required' }); return; }
        setErrors({});
        setLoading(true);
        try {
            await confirmSignUp({ username: form.email, confirmationCode: form.code });
            // Automatically sign in the user to issue their session cookies!
            await signIn({ username: form.email, password: form.password });
            
            // Await context refresh and use smooth client-side routing
            await refresh();
            router.push('/dashboard');
        } catch (error: any) {
            setErrors({ general: error.message || 'Error verifying account.' });
        } finally { setLoading(false); }
    };

    if (success) return <SuccessView />;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFCF9] overflow-hidden">
            <SignupBrandPanel />
            <div className="flex-1 flex items-center justify-center px-6 py-16 min-h-screen lg:min-h-auto">
                <div className="w-full max-w-[440px]">
                    <Link href="/" className="flex items-center gap-2.5 mb-16 lg:hidden animate-fade-in-up group">
                        <div className="w-10 h-10 bg-[#1A1C19] rounded-full flex items-center justify-center group-hover:bg-[#2D5A43] transition-colors">
                            <BiNote size={20} className="text-[#FDFCF9]" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-[#1A1C19]">Warrantor.</span>
                    </Link>
                    <SignupProgressIndicator step={step} />
                    <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase mb-4">
                            {step === 1 ? 'Create Account' : step === 2 ? 'Security' : 'Verification'}
                        </p>
                        <h1 className="font-black text-[#1A1C19] mb-4 text-5xl md:text-6xl tracking-tighter leading-[0.85]">
                            {step === 1 ? 'Join us.' : step === 2 ? 'Secure it.' : 'Verify.'}
                        </h1>
                        <p className="text-[#444941] text-lg font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#2D5A43] font-black hover:underline">Sign in</Link>
                        </p>
                    </div>
                    {step === 1 ? <SignupFormStep1 form={form} setForm={setForm} errors={errors} handleNext={handleNext} />
                        : step === 2 ? <SignupFormStep2 form={form} setForm={setForm} errors={errors} handleSubmit={handleSubmit} setStep={setStep} loading={loading} strength={strength} />
                            : <SignupFormStep3 form={form} setForm={setForm} errors={errors} handleVerify={handleVerify} setStep={setStep} loading={loading} />}
                    <p className="mt-12 text-center text-[10px] text-[#8A8A85] font-bold uppercase tracking-widest animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        By creating an account, you agree to our policies.
                    </p>
                </div>
            </div>
        </div>
    );
}