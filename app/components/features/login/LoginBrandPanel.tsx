import Link from 'next/link';
import { BiNote } from 'react-icons/bi';
import { FloatingStatsCard } from './FloatingStatsCard';

export function LoginBrandPanel() {
    return (
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative overflow-hidden bg-[#fcf8ed] border-r border-[#E5E2D9]">
            <Link href="/" className="relative flex items-center gap-3 z-10 w-fit group">
                <div className="w-10 h-10 bg-[#1A1C19] rounded-full flex items-center justify-center group-hover:bg-[#2D5A43] transition-all duration-500">
                    <BiNote size={20} className="text-[#FDFCF9]" />
                </div>
                <span className="font-black text-3xl tracking-tighter text-[#1A1C19]">Warrantor.</span>
            </Link>

            <div className="relative z-10 mb-24 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="font-black text-[#1A1C19] mb-6 tracking-tighter leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                    Welcome back.
                    <br />
                    <span className="text-[#2D5A43]">
                        Your warranties
                        <br />
                        are waiting.
                    </span>
                </h2>
                <p className="text-[#444941] text-lg leading-relaxed font-medium">
                    Your vault is ready with all your warranties, expiry alerts, and protection details.
                </p>
            </div>

            <FloatingStatsCard />
        </div>
    );
}
