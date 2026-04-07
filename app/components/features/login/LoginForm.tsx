import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface LoginFormProps {
    form: { email: string; password: string; code?: string };
    setForm: (form: any) => void;
    errors: { email?: string; password?: string; code?: string; general?: string };
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({ form, setForm, errors, loading, handleSubmit }: LoginFormProps) {
    const handleGoogleLogin = () => {
        console.log('Mock Google Login triggered');
        window.location.href = '/dashboard';
    };

    return (
        <div className="w-full max-w-[440px]">
            <div className="grid grid-cols-1 gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 h-14 border border-[#E5E2D9] rounded-2xl bg-[#FDFCF9] text-sm font-black text-[#1A1C19] hover:bg-[#F9F7F2] hover:border-[#444941]/30 transition-all duration-200"
                >
                    <FcGoogle size={20} />
                    <span>Sign in with Google</span>
                </button>
            </div>

            <div className="flex items-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex-1 h-px bg-[#E5E2D9]" />
                <span className="text-[10px] text-[#8A8A85] font-black uppercase tracking-widest">Or</span>
                <div className="flex-1 h-px bg-[#E5E2D9]" />
            </div>

            {errors.general && (
                <div className="mb-6 p-5 bg-[#FDF2F0] border border-[#A64D3F]/20 text-[#A64D3F] text-sm font-bold rounded-2xl">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }} noValidate>
                <Input id="email" type="email" label="Email address" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} icon={<FiMail size={18} strokeWidth={1.5} />} autoComplete="email" />
                <Input id="password" type="password" label="Password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} icon={<FiLock size={18} strokeWidth={1.5} />} autoComplete="current-password" />

                <div className="flex justify-end pt-1">
                    <Link href="/forgot-password" className="text-sm text-[#444941] hover:text-[#2D5A43] font-bold transition-colors">
                        Forgot your password?
                    </Link>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}
                    className="h-14 mt-4 text-base font-black rounded-2xl"
                    iconRight={!loading ? <FiArrowRight size={18} strokeWidth={2.5} /> : undefined}
                >
                    {loading ? 'Verifying…' : 'Sign in'}
                </Button>
            </form>
        </div>
    );
}
