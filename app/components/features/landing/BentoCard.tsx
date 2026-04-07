export function BentoCard({
    children,
    className = "",
    index
}: {
    children: React.ReactNode;
    className?: string;
    index: number;
}) {
    return (
        <div
            className={`group relative bg-white rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300 animate-fade-in-up ${className}`}
            style={{ animationDelay: `${0.2 + index * 0.08}s` }}
        >
            {children}
        </div>
    );
}
