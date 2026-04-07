import { FiSearch, FiArrowDown, FiGrid, FiList } from 'react-icons/fi';
import { Tabs } from '@/components/ui/Tabs';

interface DocumentsControlsProps {
    tabs: { label: string; value: string }[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    search: string;
    setSearch: (search: string) => void;
    sortBy: 'modified' | 'title';
    setSortBy: (sort: 'modified' | 'title') => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}

export function DocumentsControls({
    tabs, activeTab, setActiveTab, search, setSearch, sortBy, setSortBy, viewMode, setViewMode
}: DocumentsControlsProps) {
    return (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#F9F7F2] rounded-[2rem] p-4 pl-6 border border-[#E5E2D9]">
            <div className="flex-1">
                <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative group flex-1 md:flex-initial">
                    <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A85] group-focus-within:text-[#2D5A43] transition-colors" />
                    <input
                        type="search"
                        placeholder="Search warranties..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-[260px] h-11 pl-11 pr-4 text-sm font-bold bg-[#FDFCF9] border border-[#E5E2D9] rounded-2xl focus:bg-white focus:border-[#2D5A43] focus:ring-2 focus:ring-[#2D5A43] transition-all outline-none"
                    />
                </div>
                <button
                    onClick={() => setSortBy(sortBy === 'modified' ? 'title' : 'modified')}
                    className="h-11 px-5 bg-[#FDFCF9] text-[#444941] hover:text-[#1A1C19] rounded-2xl border border-[#E5E2D9] transition-all font-bold text-sm flex items-center gap-2"
                >
                    <FiArrowDown size={14} className={sortBy === 'title' ? 'rotate-180' : ''} />
                    {sortBy === 'modified' ? 'Recent' : 'Name'}
                </button>
                <div className="flex bg-[#FDFCF9] p-1 rounded-2xl border border-[#E5E2D9]">
                    {[
                        { mode: 'grid', icon: <FiGrid size={16} /> },
                        { mode: 'list', icon: <FiList size={16} /> },
                    ].map(({ mode, icon }) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode as 'grid' | 'list')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === mode ? 'bg-[#1A1C19] text-[#FDFCF9] shadow-sm' : 'text-[#8A8A85] hover:text-[#1A1C19]'}`}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
