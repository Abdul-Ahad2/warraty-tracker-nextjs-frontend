export function FloatingStatsCard() {
    return (
        <div
            className="relative z-10 bg-white/[0.05] backdrop-blur-2xl border border-white/15 rounded-2xl p-8 shadow-2xl hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group"
            style={{ animationDelay: '0.4s' }}
        >
            <div className="flex items-center gap-4 mb-5">
                <div className="flex -space-x-4">
                    {[
                        { color: '#3b82f6', name: 'Sarah' },
                        { color: '#8b5cf6', name: 'Marcus' },
                        { color: '#ec4899', name: 'Priya' },
                    ].map((avatar, i) => (
                        <div
                            key={i}
                            className="w-10 h-10 rounded-full border-2 border-neutral-950 shadow-lg hover:-translate-y-2 transition-transform flex-shrink-0"
                            style={{ background: avatar.color, zIndex: 10 - i }}
                            title={avatar.name}
                        />
                    ))}
                </div>
                <div className="">
                    <p className="text-black text-sm font-bold">3 teams online</p>
                    <p className="text-black/60 text-xs">Working right now</p>
                </div>
            </div>
            <p className="text-black/70 text-sm leading-relaxed">
                &ldquo;Just shared the Q2 strategy—let&apos;s sync up and crush these goals together!&rdquo;
            </p>
        </div>
    );
}
