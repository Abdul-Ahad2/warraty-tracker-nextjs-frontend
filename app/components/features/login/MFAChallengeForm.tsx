import { FiArrowRight, FiShield, FiArrowLeft } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface MFAChallengeFormProps {
    form: { code: string };
    setForm: (form: any) => void;
    errors: { code?: string; general?: string };
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    onBack: () => void;
}

export default function MFAChallengeForm({ form, setForm, errors, loading, handleSubmit, onBack }: MFAChallengeFormProps) {
    return (
        <div className="w-full max-w-[440px]">
            {errors.general && (
                <div className="mb-6 p-5 bg-[#FDF2F0] border border-[#A64D3F]/20 text-[#A64D3F] text-sm font-bold rounded-2xl">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }} noValidate>
                <div className="space-y-2">
                    <Input 
                        id="mfaCode" 
                        type="text" 
                        label="Authenticator Code" 
                        placeholder="000000" 
                        maxLength={6}
                        value={form.code} 
                        onChange={(e) => setForm({ ...form, code: e.target.value.replace(/\D/g, '') })} 
                        error={errors.code} 
                        icon={<FiShield size={18} strokeWidth={1.5} />} 
                        autoComplete="one-time-code"
                        className="text-center text-3xl tracking-[0.5em] font-black h-20"
                    />
                    <p className="text-xs font-medium text-[#444941] ml-4 italic px-2">
                        Open your authenticator app (Google Authenticator, Authy, etc.) to view your code.
                    </p>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        fullWidth 
                        loading={loading}
                        className="h-16 text-base font-black rounded-2xl"
                        iconRight={!loading ? <FiArrowRight size={18} strokeWidth={2.5} /> : undefined}
                    >
                        {loading ? 'Verifying...' : 'Confirm Access'}
                    </Button>
                    
                    <button 
                        type="button"
                        onClick={onBack}
                        className="flex items-center justify-center gap-2 text-sm font-black text-[#444941] hover:text-[#1A1C19] transition-colors py-2"
                    >
                        <FiArrowLeft size={16} />
                        <span>Back to Login</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
