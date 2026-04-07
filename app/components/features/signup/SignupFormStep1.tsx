import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiMail, FiArrowRight } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SignupFormStep1Props { form: { name: string; email: string }; setForm: (form: any) => void; errors: Record<string, string>; handleNext: () => void; }

export function SignupFormStep1({ form, setForm, errors, handleNext }: SignupFormStep1Props) {
    const handleGoogleSignup = () => { console.log('Mock Google Signup'); window.location.href = '/dashboard'; };
    return (
        <div className="space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <button type="button" onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 h-14 border border-[#E5E2D9] rounded-2xl bg-[#FDFCF9] text-sm font-black text-[#1A1C19] hover:bg-[#F9F7F2] transition-all">
                    <FcGoogle size={20} /><span>Sign up with Google</span>
                </button>
            </div>
            <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <div className="flex-1 h-px bg-[#E5E2D9]" /><span className="text-[10px] text-[#8A8A85] font-black uppercase tracking-widest">Or</span><div className="flex-1 h-px bg-[#E5E2D9]" />
            </div>
            {errors.general && <div className="p-5 bg-[#FDF2F0] border border-[#A64D3F]/20 text-[#A64D3F] text-sm font-bold rounded-2xl">{errors.general}</div>}
            <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Input id="name" type="text" label="Full name" placeholder="Sarah Johnson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} icon={<FiUser size={18} strokeWidth={1.5} />} autoComplete="name" />
                <Input id="email" type="email" label="Email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} icon={<FiMail size={18} strokeWidth={1.5} />} autoComplete="email" />
                <Button type="button" variant="primary" size="lg" fullWidth onClick={handleNext} className="h-14 mt-2 text-base font-black rounded-2xl group" iconRight={<FiArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
