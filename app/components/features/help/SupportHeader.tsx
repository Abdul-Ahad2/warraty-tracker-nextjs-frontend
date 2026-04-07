import { FiSearch } from "react-icons/fi";

interface SupportHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function SupportHeader({ searchQuery, setSearchQuery }: SupportHeaderProps) {
    return (
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white pt-20 pb-16 px-6 ">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
                <h1 className="font-black text-5xl md:text-6xl tracking-tighter leading-tight">
                    Help & Support
                </h1>
                <p className="text-xl text-neutral-300 font-medium max-w-2xl mx-auto">
                    Find answers, get support, and learn how to make the most of Notez.
                </p>

                {/* Search bar */}
                <div
                    className="relative max-w-2xl mx-auto mt-10 animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    <FiSearch
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                        strokeWidth={2}
                    />
                    <input
                        type="search"
                        placeholder="Search help articles…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-14 pr-6 text-base border border-white/20 rounded-[1.5rem] bg-white/10 backdrop-blur-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all hover:border-white/30"
                    />
                </div>
            </div>
        </div>
    );
}
