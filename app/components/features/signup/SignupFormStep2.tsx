import Link from 'next/link';
import { FiLock } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SignupFormStep2Props { form: { password: string; acceptTerms: boolean }; setForm: (form: any) => void; errors: Record<string, string>; handleSubmit: (e: React.FormEvent) => void; setStep: (step: number) => void; loading: boolean; strength: { score: number; label: string; color: string }; }

export function SignupFormStep2({ form, setForm, errors, handleSubmit, setStep, loading, strength }: SignupFormStep2Props) {
    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }} noValidate>
            {errors.general && <div className="p-5 bg-[#FDF2F0] border border-[#A64D3F]/20 text-[#A64D3F] text-sm font-bold rounded-2xl">{errors.general}</div>}
            <Input id="password" type="password" label="Choose a password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} icon={<FiLock size={18} strokeWidth={1.5} />} autoComplete="new-password" hint="Use uppercase, numbers, and symbols for stronger security" />
            {form.password && (
                <div className="space-y-3 p-5 rounded-2xl bg-[#F9F7F2] border border-[#E5E2D9]">
                    <div className="flex gap-2">{[1, 2, 3, 4].map((lvl) => (<div key={lvl} className="flex-1 h-2 rounded-full transition-all duration-300" style={{ background: lvl <= strength.score ? strength.color : '#E5E2D9' }} />))}</div>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: strength.color }}>{strength.label}</p>
                </div>
            )}
            <label className="flex items-start gap-4 cursor-pointer group p-5 border border-[#E5E2D9] rounded-2xl hover:bg-[#F9F7F2] transition-all">
                <div className="relative flex items-center justify-center mt-0.5 flex-shrink-0">
                    <input type="checkbox" checked={form.acceptTerms} onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })} className="peer appearance-none w-5 h-5 rounded-lg border-2 border-[#E5E2D9] checked:border-[#2D5A43] checked:bg-[#2D5A43] transition-all cursor-pointer" />
                    <svg viewBox="0 0 14 14" fill="none" className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"><path d="M3 8L6 11L11 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="text-sm text-[#444941] leading-relaxed font-medium">
                    I agree to the <Link href="/terms" className="text-[#2D5A43] font-black hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#2D5A43] font-black hover:underline">Privacy Policy</Link>
                </span>
            </label>
            {errors.acceptTerms && <p className="text-xs text-[#A64D3F] font-bold px-1">⚠ {errors.acceptTerms}</p>}
            <div className="flex gap-3 pt-2">
                <Button type="button" variant="secondary" className="h-14 px-8 text-base font-black rounded-2xl" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" variant="primary" fullWidth loading={loading} className="h-14 text-base font-black rounded-2xl">{loading ? 'Creating…' : 'Create account'}</Button>
            </div>
        </form>
    );
}
