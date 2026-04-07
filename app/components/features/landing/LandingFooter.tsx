import { BiNote } from 'react-icons/bi';

export function LandingFooter() {
    return (
        <footer className="bg-[#FDFCF9] pt-40 pb-20 border-t border-[#E5E2D9] overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-8 relative z-10">

                {/* 1. The Brand Signature Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-40">
                    <div className="space-y-8 max-w-sm">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            {/* Logo: Deep Charcoal to Sage on hover */}
                            <div className="w-16 h-16 bg-[#1A1C19] rounded-[2rem] flex items-center justify-center group-hover:bg-[#2D5A43] transition-all duration-500 shadow-xl shadow-black/5">
                                <BiNote size={32} className="text-[#FDFCF9]" />
                            </div>
                            <span className="font-black text-4xl tracking-tighter text-[#1A1C19]">Warrantor.</span>
                        </div>
                        <p className="text-xl text-[#444941] font-medium leading-relaxed">
                            Protecting your peace of mind, one purchase at a time. The modern vault for your high-value assets.
                        </p>
                    </div>

                    {/* 2. Navigation Grid: Bold & Clean */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-24 gap-y-16">
                        <div className="space-y-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D5A43]">Product</p>
                            <ul className="space-y-4 text-lg font-black text-[#1A1C19]">
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Security</a></li>
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Pricing</a></li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D5A43]">Company</p>
                            <ul className="space-y-4 text-lg font-black text-[#1A1C19]">
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Legal</a></li>
                            </ul>
                        </div>
                        <div className="space-y-8 hidden md:block">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D5A43]">Connect</p>
                            <ul className="space-y-4 text-lg font-black text-[#1A1C19]">
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-[#2D5A43] transition-colors">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. The Fine Print & Global Stamp */}
                <div className="pt-12 border-t border-[#E5E2D9] flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-[#444941]/40">
                        <a href="#" className="hover:text-[#1A1C19] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#1A1C19] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[#1A1C19] transition-colors">Cookie Policy</a>
                    </div>

                    <p className="text-[10px] font-black text-[#444941]/40 uppercase tracking-[0.2em]">
                        © 2026 — BUILT FOR THE MODERN HOME
                    </p>
                </div>
            </div>

            {/* Decorative Brand Stamp (Background Text) */}
            <div className="absolute bottom-[-5%] left-0 right-0 text-center select-none pointer-events-none opacity-[0.03] transform translate-y-1/2">
                <span className="text-[25vw] font-black tracking-tighter text-[#1A1C19] uppercase leading-none">
                    Warrantor
                </span>
            </div>
        </footer>
    );
}