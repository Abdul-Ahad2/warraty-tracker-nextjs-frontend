import Link from 'next/link';
import { BiNote } from 'react-icons/bi';
import { FiCheckCircle } from 'react-icons/fi';

export function SignupBrandPanel() {
    return (
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative overflow-hidden bg-[#fcf8ed] border-r border-[#E5E2D9]">
            <Link href="/" className="relative flex items-center gap-3 z-10 w-fit group">
                <div className="w-10 h-10 bg-[#1A1C19] rounded-full flex items-center justify-center group-hover:bg-[#2D5A43] transition-all duration-500">
                    <BiNote size={20} className="text-[#FDFCF9]" />
                </div>
                <span className="font-black text-3xl tracking-tighter text-[#1A1C19]">Warrantor.</span>
            </Link>
            <div className="relative z-10 mb-24 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="font-black text-[#1A1C19] mb-8 tracking-tighter leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                    Join the<br /><span className="text-[#2D5A43]">protection<br />revolution.</span>
                </h2>
                <div className="space-y-5 mb-16">
                    {['Unlimited warranty tracking', 'Smart expiry reminders', 'Secure document vault'].map((item, i) => (
                        <div key={item} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                            <div className="w-7 h-7 rounded-full bg-[#D4E3D7] flex items-center justify-center flex-shrink-0">
                                <FiCheckCircle size={14} className="text-[#2D5A43]" strokeWidth={2.5} />
                            </div>
                            <span className="text-[#444941] font-bold">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-8 border-t border-[#E5E2D9] text-[10px] font-black text-[#8A8A85] uppercase tracking-[0.3em]">
                    Trusted by thousands worldwide
                </div>
            </div>
        </div>
    );
}
