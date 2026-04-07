'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiNote } from 'react-icons/bi';
import { signIn, confirmSignIn } from 'aws-amplify/auth';
import { useUserContext } from '@/components/providers/UserProvider';
import { LoginBrandPanel } from '@/components/features/login/LoginBrandPanel';
import { LoginForm } from '@/components/features/login/LoginForm';
import MFAChallengeForm from '@/components/features/login/MFAChallengeForm';

export default function LoginPage() {
    const router = useRouter();
    const { user, refresh } = useUserContext();
    const [form, setForm] = useState({ email: '', password: '', code: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string; code?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);
    const [showMFA, setShowMFA] = useState(false);

    useEffect(() => {
        if (!user.loading && user.name) {
            router.replace('/dashboard');
        }
    }, [user.loading, user.name, router]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.email) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        try {
            const { nextStep } = await signIn({ username: form.email, password: form.password });
            
            if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
                setShowMFA(true);
                setLoading(false);
                return;
            }

            await refresh();
            router.push('/dashboard');
        } catch (error: any) {
            setErrors({ general: error.message || 'Error signing in. Please check your credentials.' });
            setLoading(false);
        }
    };

    const handleMFASubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.code.length !== 6) {
            setErrors({ code: 'Enter a valid 6-digit code' });
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            await confirmSignIn({ challengeResponse: form.code });
            await refresh();
            router.push('/dashboard');
        } catch (error: any) {
            setErrors({ general: error.message || 'Invalid code. Please try again.' });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFCF9] overflow-hidden">
            <LoginBrandPanel />
            <div className="flex-1 flex items-center justify-center px-6 py-16 min-h-screen lg:min-h-auto">
                <div className="w-full max-w-[440px]">
                    <Link href="/" className="flex items-center gap-2.5 mb-16 lg:hidden animate-fade-in-up group">
                        <div className="w-10 h-10 bg-[#1A1C19] rounded-full flex items-center justify-center group-hover:bg-[#2D5A43] transition-colors">
                            <BiNote size={20} className="text-[#FDFCF9]" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-[#1A1C19]">Warrantor.</span>
                    </Link>
                    
                    <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase mb-4">
                            {showMFA ? 'Vault Security' : 'Welcome Back'}
                        </p>
                        <h1 className="font-black text-[#1A1C19] mb-4 text-5xl md:text-6xl tracking-tighter leading-[0.85]">
                            {showMFA ? 'Enter Code.' : 'Sign in.'}
                        </h1>
                        <p className="text-[#444941] text-lg font-medium">
                            {showMFA ? 'Protecting your cloud identity.' : (
                                <>
                                    Don&apos;t have an account?{' '}
                                    <Link href="/signup" className="text-[#2D5A43] font-black hover:underline">Sign up free</Link>
                                </>
                            )}
                        </p>
                    </div>

                    {!showMFA ? (
                        <LoginForm form={form} setForm={setForm} errors={errors} loading={loading} handleSubmit={handleSubmit} />
                    ) : (
                        <MFAChallengeForm form={form} setForm={setForm} errors={errors} loading={loading} handleSubmit={handleMFASubmit} onBack={() => setShowMFA(false)} />
                    )}

                    <p className="mt-16 text-center text-[10px] text-[#8A8A85] font-bold uppercase tracking-widest animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        By signing in, you agree to our policies.
                    </p>
                </div>
            </div>
        </div>
    );
}