import Link from 'next/link';
import { BiNote } from 'react-icons/bi';
import { Button } from '@/components/ui/Button';

export function LandingNav() {
    return (
        /* 1. REMOVED the solid bg color here so it's transparent */
        <nav className="fixed top-8 left-0 right-0 z-[100] px-6 pointer-events-none">

            {/* 2. Swapped bg-white/80 for our theme Paper color #F9F7F2/90 */}
            <div className="max-w-2xl mx-auto flex items-center justify-between p-1.5 pl-5 pr-1.5 bg-[#F9F7F2]/90 backdrop-blur-2xl border border-[#E5E2D9] rounded-full shadow-[0_20px_50px_rgba(26,28,25,0.1)] pointer-events-auto">

                {/* Brand Identity */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-[#1A1C19] rounded-full flex items-center justify-center group-hover:bg-[#2D5A43] transition-all duration-500 shadow-sm">
                        <BiNote size={18} className="text-[#FDFCF9]" />
                    </div>
                    <span className="font-black text-xl tracking-tighter text-[#1A1C19] leading-none">
                        Warrantor.
                    </span>
                </Link>

                {/* Navigation Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/login" className="hidden sm:block">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444941] hover:text-[#2D5A43] transition-colors">
                            Log in
                        </span>
                    </Link>

                    <Link href="/signup">
                        <Button
                            className="h-10 px-6 rounded-full bg-[#1A1C19] hover:bg-[#2D5A43] text-[#FDFCF9] text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 border-none shadow-md"
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}