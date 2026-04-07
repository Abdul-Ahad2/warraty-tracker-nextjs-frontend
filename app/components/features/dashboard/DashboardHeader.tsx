import { FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

interface DashboardHeaderProps {
    userName: string;
    warrantiesCount: number;
}

export function DashboardHeader({ userName, warrantiesCount }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 animate-fade-in-up">
            <div>
                <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase mb-4">Dashboard</p>
                <h1 className="font-black text-[#1A1C19] text-6xl md:text-8xl tracking-tighter leading-[0.85] mb-3">
                    Hi, {userName.split(' ')[0]}.
                </h1>
                <p className="text-[#444941] text-xl font-medium">
                    You have <span className="text-[#1A1C19] font-black">{warrantiesCount} warranties</span> under protection.
                </p>
            </div>
        </div>
    );
}
