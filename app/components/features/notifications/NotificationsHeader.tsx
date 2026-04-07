interface NotificationsHeaderProps {
    unreadCount: number;
}

export function NotificationsHeader({ unreadCount }: NotificationsHeaderProps) {
    return (
        <div className="space-y-3 animate-fade-in-up">
            <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase">Activity</p>
            <h1 className="font-black text-[#1A1C19] text-6xl md:text-8xl tracking-tighter leading-[0.85]">
                Notifications.
            </h1>
            <p className="text-[#444941] text-xl font-medium">
                {unreadCount > 0 ? (
                    <>You have <span className="text-[#1A1C19] font-black">{unreadCount} unread</span> alerts.</>
                ) : "You're all caught up."}
            </p>
        </div>
    );
}
