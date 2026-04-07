interface SettingsNavProps { tabs: { label: string; value: string; icon: React.ReactNode }[]; activeTab: string; setActiveTab: (tab: string) => void; }

export function SettingsNav({ tabs, activeTab, setActiveTab }: SettingsNavProps) {
    return (
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#F9F7F2] rounded-[2rem] p-3 border border-[#E5E2D9]">
                <div className="flex gap-1.5 flex-wrap">
                    {tabs.map((tab) => (
                        <button key={tab.value} onClick={() => setActiveTab(tab.value)}
                            className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.value ? 'bg-[#1A1C19] text-[#FDFCF9] shadow-lg' : 'text-[#8A8A85] hover:text-[#1A1C19] hover:bg-[#FDFCF9]'}`}>
                            <span className="flex-shrink-0">{tab.icon}</span>
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
                <div className="hidden lg:block pr-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8A8A85]">Last saved: Just now</span>
                </div>
            </div>
        </div>
    );
}
