'use client';

import { FiTrash2, FiCalendar, FiClock, FiEdit2, FiEye } from 'react-icons/fi';
import type { Warranty } from '@/types';

interface WarrantyCardProps {
    warranty: Warranty;
    onDelete: (id: string) => void;
    onEdit: (warranty: Warranty) => void;
}

function getStatusConfig(status: Warranty['status']) {
    switch (status) {
        case 'active':
            return { label: 'Active', dotColor: 'bg-[#2D5A43]', badgeBg: 'bg-[#D4E3D7] text-[#2D5A43]', textColor: 'text-[#2D5A43]' };
        case 'expiring':
            return { label: 'Expiring', dotColor: 'bg-amber-500 animate-pulse', badgeBg: 'bg-amber-50 text-amber-700', textColor: 'text-amber-600' };
        case 'expired':
            return { label: 'Expired', dotColor: 'bg-[#A64D3F]', badgeBg: 'bg-[#FDF2F0] text-[#A64D3F]', textColor: 'text-[#A64D3F]' };
    }
}

function formatDate(isoString: string) {
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function WarrantyCard({ warranty, onDelete, onEdit }: WarrantyCardProps) {
    const config = getStatusConfig(warranty.status);

    return (
        <div className={`group bg-[#F9F7F2] rounded-[2.5rem] border border-[#E5E2D9] p-10 h-full flex flex-col hover:border-[#2D5A43] hover:shadow-xl hover:shadow-black/5 transition-all duration-300 ${
            warranty.status === 'expired' ? 'opacity-60' : ''
        }`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${config.dotColor}`} />
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${config.badgeBg}`}>
                        {config.label}
                    </span>
                </div>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-black bg-[#FDFCF9] text-[#8A8A85] uppercase tracking-widest border border-[#E5E2D9]">
                    {warranty.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex-grow mb-6">
                <h3 className={`text-2xl font-black text-[#1A1C19] mb-2 leading-tight tracking-tight ${
                    warranty.status === 'expired' ? 'line-through decoration-[#A64D3F]/40' : ''
                }`}>
                    {warranty.productName}
                </h3>
                <p className="text-sm text-[#8A8A85] font-bold mb-4">
                    {warranty.brand} • {warranty.warrantyProvider}
                </p>
                {warranty.coverageDetails && (
                    <p className="text-sm text-[#444941] leading-relaxed line-clamp-2 font-medium">
                        {warranty.coverageDetails}
                    </p>
                )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#FDFCF9] rounded-2xl p-4 border border-[#E5E2D9]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <FiCalendar size={11} className="text-[#8A8A85]" />
                        <span className="text-[9px] font-black text-[#8A8A85] uppercase tracking-widest">Purchased</span>
                    </div>
                    <p className="text-sm font-black text-[#1A1C19]">{formatDate(warranty.purchaseDate)}</p>
                </div>
                <div className="bg-[#FDFCF9] rounded-2xl p-4 border border-[#E5E2D9]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <FiClock size={11} className="text-[#8A8A85]" />
                        <span className="text-[9px] font-black text-[#8A8A85] uppercase tracking-widest">Expires</span>
                    </div>
                    <p className="text-sm font-black text-[#1A1C19]">{formatDate(warranty.expiryDate)}</p>
                </div>
            </div>

            <div className="pt-5 mt-auto border-t border-[#E5E2D9] flex items-center justify-between">
                <div className={`text-sm font-black ${config.textColor}`}>
                    {warranty.status === 'expired'
                        ? 'Coverage ended'
                        : `${warranty.daysRemaining} days left`
                    }
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    {/* View Photo */}
                    {(warranty as any).pictureUrl && (
                        <button
                            onClick={() => window.open((warranty as any).pictureUrl, '_blank')}
                            className="p-2 text-[#8A8A85] hover:text-[#2D5A43] transition-all rounded-xl hover:bg-[#F1F8F4]"
                            title="View Receipt"
                        >
                            <FiEye size={16} />
                        </button>
                    )}
                    {/* Edit */}
                    <button
                        onClick={() => onEdit(warranty)}
                        className="p-2 text-[#8A8A85] hover:text-[#2D5A43] transition-all rounded-xl hover:bg-[#F1F8F4]"
                        title="Edit Warranty"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    {/* Delete */}
                    <button
                        onClick={() => onDelete(warranty.id)}
                        className="p-2 text-[#8A8A85] hover:text-[#A64D3F] transition-all rounded-xl hover:bg-[#FDF2F0]"
                        title="Remove Warranty"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
