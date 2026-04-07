import { FiShield, FiAlertTriangle, FiXCircle, FiDollarSign } from 'react-icons/fi';
import { StatCard } from './StatCard';
import type { Warranty } from '@/types';

interface DashboardStatsGridProps {
    warranties: Warranty[];
}

export function DashboardStatsGrid({ warranties }: DashboardStatsGridProps) {
    const active = warranties.filter(w => w.status !== 'expired').length;
    const expiring = warranties.filter(w => w.status === 'expiring').length;
    const expired = warranties.filter(w => w.status === 'expired').length;
    const categoriesCount = new Set(warranties.map(w => w.category)).size;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            <StatCard
                index={0}
                icon={<FiShield size={24} strokeWidth={2} />}
                label="Active"
                value={active}
            />
            <StatCard
                index={1}
                icon={<FiAlertTriangle size={24} strokeWidth={2} />}
                label="Expiring Soon"
                value={expiring}
            />
            <StatCard
                index={2}
                icon={<FiXCircle size={24} strokeWidth={2} />}
                label="Expired"
                value={expired}
            />
            <StatCard
                index={3}
                icon={<FiDollarSign size={24} strokeWidth={2} />}
                label="Protected"
                value={active}
            />
        </div>
    );
}
