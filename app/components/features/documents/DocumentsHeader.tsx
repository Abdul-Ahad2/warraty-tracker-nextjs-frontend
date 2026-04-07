import { FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

interface DocumentsHeaderProps {
    onAddClick: () => void;
}

export function DocumentsHeader({ onAddClick }: DocumentsHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 animate-fade-in-up">
            <div className="space-y-3">
                <p className="text-[10px] font-black text-[#2D5A43] tracking-[0.4em] uppercase">All Warranties</p>
                <h1 className="font-black text-[#1A1C19] text-6xl md:text-8xl tracking-tighter leading-[0.85]">
                    Warranties.
                </h1>
                <p className="text-[#444941] text-xl font-medium">
                    Browse and manage all your registered warranties.
                </p>
            </div>

            <Button
                variant="primary"
                onClick={onAddClick}
                className="h-20 px-16 mb-5 rounded-[3rem] bg-[#1A1C19] hover:bg-[#2D5A43] text-[#FDFCF9] text-base font-black flex items-center gap-3 shadow-xl shadow-black/10 border-none"
            >
                <FiPlus size={20} strokeWidth={2.5} />
                <span>Add Warranty</span>
            </Button>
        </div>
    );
}
