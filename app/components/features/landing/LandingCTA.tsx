import Link from 'next/link';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

interface LandingCTAProps {
    cursiveClass: string;
}

export function LandingCTA({ cursiveClass }: LandingCTAProps) {
    return (
        <section className="px-6 py-40 bg-[#FDFCF9] border-t border-[#E5E2D9] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* LEFT SIDE: The Editorial Headline */}
                    <div className="lg:col-span-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2D5A43]/5 border border-[#2D5A43]/10 mb-12">
                            <FiCheckCircle className="text-[#2D5A43]" size={20} />
                            <span className="text-[#2D5A43] text-[10px] font-black uppercase tracking-[0.3em]">
                                Join 12,000+ Protected Homes
                            </span>
                        </div>

                        <h2 className="text-7xl md:text-[10rem] font-black tracking-tight text-[#1A1C19] leading-[0.8] mb-12">
                            Stop losing <br />
                            <span className={`${cursiveClass} text-[#2D5A43] italic`}>
                                money
                            </span> <br />
                            to fine print.
                        </h2>

                        <div className="max-w-xl border-l-4 border-[#2D5A43] pl-10 py-2">
                            <p className="text-2xl text-[#444941] font-medium leading-relaxed">
                                Never pay for a repair that's already covered.
                                <span className="text-[#1A1C19] font-black block mt-2 underline decoration-[#2D5A43]/20"> It’s your money. Keep it.</span>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: The "Action Card" */}
                    <div className="lg:col-span-4 lg:pt-40">
                        {/* Swapped to Deep Carbon bg to anchor the page finish */}
                        <div className="p-12 bg-[#1A1C19] rounded-[4rem] shadow-[0_40px_100px_rgba(26,28,25,0.2)] rotate-[-3deg] hover:rotate-0 transition-all duration-700 ease-out group">
                            <p className="text-[#FDFCF9]/40 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                                Start your vault today
                            </p>

                            <Link href="/signup">
                                <Button className="w-full h-24 rounded-3xl bg-[#2D5A43] hover:bg-[#FDFCF9] hover:text-[#1A1C19] border-none text-[#FDFCF9] text-2xl font-black transition-all flex items-center justify-between px-10 group/btn shadow-2xl shadow-[#2D5A43]/20">
                                    <span>Sign up free</span>
                                    <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" size={32} />
                                </Button>
                            </Link>

                            <div className="mt-10 space-y-4">
                                <div className="flex items-center gap-4 text-[#FDFCF9]/30 text-xs font-bold uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 bg-[#2D5A43] rounded-full shadow-[0_0_8px_#2D5A43]" />
                                    No credit card required
                                </div>
                                <div className="flex items-center gap-4 text-[#FDFCF9]/30 text-xs font-bold uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 bg-[#2D5A43] rounded-full shadow-[0_0_8px_#2D5A43]" />
                                    10 Items included free
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}