import { FiBell, FiAlertTriangle, FiXCircle, FiZap } from 'react-icons/fi';
import type { Notification, NotificationType } from '@/types';

interface NotificationRowProps {
    notification: Notification;
    onRead: (id: string) => void;
    index: number;
}

const typeIcons: Record<NotificationType, React.ReactNode> = {
    expiry_warning: <FiAlertTriangle size={16} strokeWidth={2} />,
    expired: <FiXCircle size={16} strokeWidth={2} />,
    renewal: <FiBell size={16} strokeWidth={2} />,
    system: <FiZap size={16} strokeWidth={2} />,
};

const typeColors: Record<NotificationType, string> = {
    expiry_warning: 'bg-amber-100 text-amber-600',
    expired: 'bg-[#FDF2F0] text-[#A64D3F]',
    renewal: 'bg-[#D4E3D7] text-[#2D5A43]',
    system: 'bg-[#F9F7F2] text-[#444941]',
};

const typeLabels: Record<NotificationType, string> = {
    expiry_warning: 'Expiry Warning',
    expired: 'Expired',
    renewal: 'Renewal',
    system: 'System',
};

function formatRelativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
}

export function NotificationRow({ notification, onRead, index }: NotificationRowProps) {
    const n = notification;
    return (
        <div className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
            <div
                className={`flex items-start gap-5 p-8 rounded-[2rem] border transition-all duration-200 cursor-pointer ${!n.read
                    ? 'bg-[#F9F7F2] border-[#E5E2D9] hover:border-[#2D5A43] hover:shadow-lg hover:shadow-black/5'
                    : 'bg-[#F9F7F2] border-[#EDEBE4] opacity-50'
                }`}
                onClick={() => !n.read && onRead(n.id)}
            >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                    {typeIcons[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1.5">
                        <span className="text-[10px] font-black text-[#8A8A85] uppercase tracking-widest">
                            {typeLabels[n.type]} • {formatRelativeTime(n.createdAt)}
                        </span>
                        {n.productName && (
                            <span className="text-[10px] font-black text-[#2D5A43] bg-[#D4E3D7] px-2.5 py-1 rounded-lg uppercase tracking-widest">
                                {n.productName}
                            </span>
                        )}
                    </div>
                    <p className={`text-sm leading-relaxed font-bold ${!n.read ? 'text-[#1A1C19]' : 'text-[#444941]'}`}>
                        {n.message}
                    </p>
                </div>
                {!n.read && (
                    <div className="w-3 h-3 rounded-full bg-[#2D5A43] shrink-0 mt-2 shadow-[0_0_8px_#2D5A43]" />
                )}
            </div>
        </div>
    );
}
