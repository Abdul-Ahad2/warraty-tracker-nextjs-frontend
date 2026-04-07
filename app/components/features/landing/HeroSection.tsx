import Link from 'next/link';
import { FiArrowRight, FiShield } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export function HeroSection({ cursiveClass }: { cursiveClass: string }) {
    return (
        <section className="relative pt-32 pb-40 px-6 overflow-hidden bg-[#FDFCF9]">
            {/* Background: Warm Sun-faded Glows instead of tech-blue */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full bg-[#E8E2D2]/40 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] rounded-full bg-[#D4E3D7]/30 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

                {/* Left Column */}
                <div className="lg:col-span-7 space-y-12">
                    <h1 className="text-[#1A1C19] font-black tracking-tight leading-[0.85] text-[clamp(3.5rem,8vw,6.5rem)]">
                        Stop losing <br />
                        <span className={`${cursiveClass} text-[#2D5A43] italic`}>money</span> <br />
                        to expired <br />
                        warranties.
                    </h1>

                    <p className="max-w-xl text-[#444941] text-2xl font-medium leading-relaxed">
                        Snap a photo of your receipt and relax. We track the dates and alert you <span className="text-[#1A1C19] border-b-4 border-[#2D5A43]/20">before</span> coverage ends.
                    </p>
                </div>

                {/* Right Column: The "Card" */}
                <div className="lg:col-span-5">
                    {/* Card uses a soft 'Paper' color instead of pure white */}
                    <div className="p-12 md:p-16 bg-[#F9F7F2] rounded-[3.5rem] border border-[#E5E2D9] shadow-[0_40px_80px_-15px_rgba(26,28,25,0.05)] relative">

                        {/* Badge: Sophisticated Deep Green */}
                        <div className="absolute -top-6 -right-6 bg-[#2D5A43] text-[#FDFCF9] p-6 rounded-3xl shadow-xl rotate-6 hidden md:block">
                            <p className="text-xs font-bold leading-tight text-center uppercase tracking-widest">
                                Lifetime<br />Access
                            </p>
                        </div>

                        <h2 className="text-2xl font-black text-[#1A1C19] mb-8 tracking-tight">Protect your home.</h2>

                        <div className="space-y-6">
                            <Link href="/signup" className="block w-full">
                                <Button className="w-full h-20 rounded-2xl bg-[#1A1C19] hover:bg-[#2D5A43] text-[#FDFCF9] text-xl font-bold transition-all flex items-center justify-between px-10 group shadow-2xl shadow-black/10">
                                    <span>Get Started</span>
                                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                                </Button>
                            </Link>

                            <div className="flex items-center justify-center gap-2 text-[#444941]/60 text-sm font-bold uppercase tracking-widest">
                                <FiShield className="text-[#2D5A43]" /> <span>Secure & Private Vault</span>
                            </div>
                        </div>

                        {/* Bottom Stat Section */}
                        <div className="mt-12 pt-10 border-t border-[#E5E2D9]">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-5xl font-black text-[#1A1C19] tracking-tighter">$2,450</p>
                                    <p className="text-[10px] font-bold text-[#444941] uppercase tracking-[0.2em] mt-2">Avg. Annual Savings</p>
                                </div>
                                <Link href="/login" className="text-sm font-black text-[#2D5A43] hover:text-[#1A1C19] transition-colors pb-1 border-b-2 border-[#2D5A43]/10">
                                    Sign In →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}