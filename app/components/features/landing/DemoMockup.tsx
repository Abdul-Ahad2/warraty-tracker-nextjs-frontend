import { FiShield, FiAlertCircle, FiPlus, FiCamera, FiCheckCircle, FiChevronRight, FiClock } from 'react-icons/fi';

export function DemoMockup() {
    return (
        <section className="relative py-48 overflow-hidden bg-[#FDFCF9]">
            {/* Massive Background Accents to match Hero scale */}
            <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#D4E3D7]/30 blur-[150px] -z-10 rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#E8E2D2]/40 blur-[130px] -z-10 rounded-full" />

            <div className="max-w-7xl mx-auto px-6">

                {/* 1. SECTION HEADER: Large Scale */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.5em] uppercase mb-6">Real-time Intelligence</p>
                        <h2 className="text-6xl md:text-8xl font-black text-[#1A1C19] tracking-tighter leading-[0.85]">
                            The vault that <br />
                            <span className="text-[#2D5A43]/30">watches back.</span>
                        </h2>
                    </div>
                    <div className="hidden lg:block pb-4">
                        <div className="flex items-center gap-3 bg-[#F9F7F2] border border-[#E5E2D9] px-6 py-3 rounded-2xl">
                            <div className="w-2.5 h-2.5 bg-[#2D5A43] rounded-full animate-pulse shadow-[0_0_10px_#2D5A43]" />
                            <span className="text-xs font-black text-[#1A1C19] uppercase tracking-widest">Global Status: Protected</span>
                        </div>
                    </div>
                </div>

                {/* 2. THE MAIN GRID: Balanced Heavyweight Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

                    {/* LEFT: The "Command Center" (5 Columns) */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        {/* Status Card: Matching the "Money" Card in the Hero */}
                        <div className="flex-1 bg-[#1A1C19] p-12 md:p-16 rounded-[4rem] text-[#FDFCF9] shadow-[0_50px_100px_rgba(26,28,25,0.15)] flex flex-col justify-between relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-[#2D5A43] rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform duration-500">
                                    <FiShield size={40} />
                                </div>
                                <h3 className="text-5xl font-black tracking-tighter leading-tight mb-6">
                                    14 Active <br /> Warranties.
                                </h3>
                                <p className="text-xl text-[#FDFCF9]/50 font-medium leading-relaxed max-w-xs">
                                    Your high-value assets are digitized and monitored 24/7.
                                </p>
                            </div>

                            <button className="relative z-10 w-full mt-16 py-8 rounded-[2rem] bg-[#2D5A43] hover:bg-[#FDFCF9] hover:text-[#1A1C19] text-[#FDFCF9] text-xl font-black transition-all flex items-center justify-center gap-4 group/btn shadow-2xl shadow-black/20">
                                <FiPlus size={28} />
                                <span>Add New Item</span>
                            </button>
                        </div>

                        {/* Alert: Bold Offset Card */}
                        <div className="bg-[#FDF2F0] border-2 border-[#A64D3F]/20 p-10 rounded-[3rem] flex items-center gap-8 group cursor-pointer hover:bg-[#FCEAE7] transition-colors">
                            <div className="bg-[#A64D3F] text-white p-5 rounded-2xl shadow-lg shadow-[#A64D3F]/30">
                                <FiAlertCircle size={32} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#A64D3F] font-black text-2xl tracking-tight">LG Fridge Expires</p>
                                <p className="text-[#A64D3F]/60 font-bold uppercase text-xs tracking-widest mt-1">Tomorrow at 11:59 PM</p>
                            </div>
                            <FiChevronRight size={32} className="text-[#A64D3F]/30 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>

                    {/* RIGHT: The "Asset Vault" (7 Columns) */}
                    <div className="lg:col-span-7 bg-[#F9F7F2] border border-[#E5E2D9] rounded-[4rem] p-12 md:p-20 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
                            <h3 className="text-4xl font-black text-[#1A1C19] tracking-tighter">Your Assets</h3>
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F9F7F2] bg-[#E5E2D9]" />
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-[#F9F7F2] bg-[#2D5A43] flex items-center justify-center text-[10px] font-black text-white">+10</div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            {[
                                { name: 'MacBook Pro 16"', brand: 'Apple', val: '$2,499', date: 'Sept 2027' },
                                { name: 'Sony 65" 4K TV', brand: 'Sony', val: '$1,299', date: 'Oct 2026' },
                                { name: 'Dyson V15 Detect', brand: 'Dyson', val: '$749', date: 'Dec 2025' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-[#FDFCF9] border border-[#E5E2D9]/60 hover:border-[#2D5A43] hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 bg-[#1A1C19] rounded-2xl flex items-center justify-center text-xl font-black text-[#FDFCF9] group-hover:bg-[#2D5A43] transition-colors">
                                            {item.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-[#1A1C19] tracking-tight">{item.name}</h4>
                                            <p className="text-sm font-bold text-[#444941]/50 uppercase tracking-widest">{item.brand} • {item.val}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block text-right">
                                        <p className="text-[10px] font-black text-[#2D5A43] uppercase tracking-widest mb-1">Coverage</p>
                                        <p className="text-xl font-black text-[#1A1C19]">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Full-width Scan Action */}
                        <button className="mt-12 w-full py-12 border-4 border-dashed border-[#E5E2D9] rounded-[3rem] group hover:border-[#2D5A43] transition-all">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-5 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                    <FiCamera size={40} className="text-[#1A1C19]" />
                                </div>
                                <span className="text-sm font-black text-[#444941]/40 uppercase tracking-[0.3em] group-hover:text-[#2D5A43]">Scan New Receipt</span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}