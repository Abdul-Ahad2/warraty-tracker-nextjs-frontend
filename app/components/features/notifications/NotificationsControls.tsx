import { Tabs } from '@/components/ui/Tabs';

interface NotificationsControlsProps {
    tabs: { label: string; value: string; badge?: number }[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    unreadCount: number;
    handleMarkAllRead: () => void;
}

export function NotificationsControls({ tabs, activeTab, setActiveTab, unreadCount, handleMarkAllRead }: NotificationsControlsProps) {
    return (
        <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#F9F7F2] rounded-[2rem] p-4 pl-6 border border-[#E5E2D9]">
                <div className="flex-1">
                    <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
                </div>
                <div className="flex items-center gap-4 pr-3">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8A8A85] hover:text-[#2D5A43] transition-colors whitespace-nowrap"
                        >
                            Mark all read
                        </button>
                    )}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#FDFCF9] rounded-xl border border-[#E5E2D9]">
                        <div className={`w-2.5 h-2.5 rounded-full ${unreadCount > 0 ? 'bg-[#2D5A43] animate-pulse shadow-[0_0_8px_#2D5A43]' : 'bg-[#8A8A85]'}`} />
                        <span className="text-xs font-black text-[#1A1C19]">{unreadCount} New</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
