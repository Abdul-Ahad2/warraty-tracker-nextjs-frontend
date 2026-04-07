import { FiBell, FiUploadCloud, FiSearch, FiShield, FiArrowRight } from 'react-icons/fi';

export function BentoFeatureGrid() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-40 bg-[#FDFCF9]">
            {/* Header: Refined Typography & Colors */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
                <div className="max-w-2xl">
                    <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase mb-6">The Platform</p>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#1A1C19] leading-[0.85]">
                        Built to protect <br />your hard-earned <span className="text-[#2D5A43]/40">purchases.</span>
                    </h2>
                </div>
                <p className="text-xl text-[#444941] font-medium max-w-xs leading-relaxed border-l-2 border-[#E5E2D9] pl-8">
                    Simple enough for your kitchen, powerful enough for your tech.
                </p>
            </div>

            {/* The Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* 1. FEATURED CARD: Upload (Sage Green Focus) */}
                <div className="md:col-span-7 bg-[#2D5A43] p-14 rounded-[3.5rem] hover:shadow-2xl hover:shadow-[#2D5A43]/20 transition-all group flex flex-col justify-between min-h-[500px] text-[#FDFCF9]">
                    <div className="w-24 h-24 rounded-[2rem] bg-[#FDFCF9]/10 flex items-center justify-center mb-8 backdrop-blur-md border border-[#FDFCF9]/20 group-hover:scale-110 transition-transform duration-500">
                        <FiUploadCloud size={44} className="text-[#FDFCF9]" />
                    </div>
                    <div>
                        <h3 className="text-5xl font-black tracking-tighter mb-6 leading-none">Instant Paperless Storage</h3>
                        <p className="text-xl text-[#FDFCF9]/70 font-medium leading-relaxed max-w-md">
                            Forget the "junk drawer." Snap a photo and we'll extract the dates, store name, and price automatically.
                        </p>
                    </div>
                </div>

                {/* 2. SECONDARY CARD: Alerts (Sand Tone) */}
                <div className="md:col-span-5 bg-[#F9F7F2] p-14 rounded-[3.5rem] border border-[#E5E2D9] flex flex-col justify-between overflow-hidden relative group">
                    <div className="w-20 h-20 rounded-3xl bg-[#1A1C19] text-[#FDFCF9] flex items-center justify-center mb-8 shadow-xl">
                        <FiBell size={36} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-4xl font-black tracking-tighter text-[#1A1C19] mb-4">Never Miss a Deadline</h3>
                        <p className="text-lg text-[#444941] font-bold leading-snug">
                            Friendly reminders sent before coverage ends.
                        </p>
                    </div>
                    {/* Visual Decorative Element - Muted Sage */}
                    <FiBell className="absolute -bottom-10 -right-10 opacity-[0.03] text-[#2D5A43] group-hover:rotate-12 transition-transform duration-700" size={280} />
                </div>

                {/* 3. SMALLER CARD: Search (Muted Sage/Cream) */}
                <div className="md:col-span-5 bg-[#D4E3D7] p-14 rounded-[3.5rem] border border-[#2D5A43]/10 flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                        <div className="w-16 h-16 rounded-2xl bg-[#FDFCF9] flex items-center justify-center text-[#2D5A43] shadow-sm">
                            <FiSearch size={28} />
                        </div>
                        <FiArrowRight className="text-[#2D5A43] group-hover:translate-x-2 transition-transform" size={28} />
                    </div>
                    <div className="mt-20">
                        <h3 className="text-4xl font-black tracking-tighter text-[#1A1C19] mb-4 text-balance">Organized with Intelligence.</h3>
                        <p className="text-lg text-[#2D5A43] font-bold">
                            Find any receipt in seconds.
                        </p>
                    </div>
                </div>

                {/* 4. MEDIUM CARD: Security (Deep Charcoal) */}
                <div className="md:col-span-7 bg-[#1A1C19] p-14 rounded-[3.5rem] text-[#FDFCF9] flex flex-col md:flex-row items-center gap-12 group">
                    <div className="w-40 h-40 flex-shrink-0 bg-[#FDFCF9]/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#FDFCF9]/10 group-hover:bg-[#2D5A43]/20 transition-colors">
                        <FiShield size={64} className="text-[#2D5A43]" />
                    </div>
                    <div>
                        <h3 className="text-4xl font-black tracking-tighter mb-4">Bank-Level Privacy</h3>
                        <p className="text-lg text-[#FDFCF9]/50 font-medium leading-relaxed">
                            Your data is encrypted and private. We use end-to-end security so only you can access your history.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}