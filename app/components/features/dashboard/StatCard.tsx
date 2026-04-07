interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend?: string;
    index: number;
}

export function StatCard({ icon, label, value, trend, index }: StatCardProps) {
    return (
        <div
            className="group bg-[#F9F7F2] rounded-[2.5rem] p-10 border border-[#E5E2D9] hover:border-[#2D5A43]/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
        >
            <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#1A1C19] text-[#FDFCF9] flex items-center justify-center group-hover:bg-[#2D5A43] transition-colors duration-300">
                    {icon}
                </div>
                {trend && (
                    <span className="text-[10px] font-black text-[#2D5A43] bg-[#D4E3D7] px-3 py-1.5 rounded-full uppercase tracking-widest">
                        {trend}
                    </span>
                )}
            </div>
            <p className="font-black text-5xl text-[#1A1C19] tracking-tighter mb-2">{value}</p>
            <p className="text-sm text-[#8A8A85] font-bold uppercase tracking-widest">{label}</p>
        </div>
    );
}
