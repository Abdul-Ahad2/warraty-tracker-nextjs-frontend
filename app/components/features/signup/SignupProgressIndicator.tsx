interface SignupProgressIndicatorProps { step: number; }

export function SignupProgressIndicator({ step }: SignupProgressIndicatorProps) {
    return (
        <div className="flex items-center gap-3 mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${step >= s ? 'bg-[#2D5A43] text-[#FDFCF9]' : 'bg-[#E5E2D9] text-[#8A8A85]'}`}>
                        {step > s ? '✓' : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-1 w-12 rounded-full transition-all duration-300 ${step > s ? 'bg-[#2D5A43]' : 'bg-[#E5E2D9]'}`} />}
                </div>
            ))}
            <span className="ml-auto text-[10px] font-black text-[#8A8A85] uppercase tracking-widest">Step {step}/3</span>
        </div>
    );
}
