"use client"
import { useEffect, useState } from 'react';
import { FiShield } from 'react-icons/fi';
import { WarrantyCard } from '@/components/shared/WarrantyCard';
import { DashboardHeader } from '@/components/features/dashboard/DashboardHeader';
import { DashboardStatsGrid } from '@/components/features/dashboard/DashboardStatsGrid';
import { DashboardControls } from '@/components/features/dashboard/DashboardControls';
import { tabs } from '@/components/features/dashboard/constants';
import { AddWarrantyModal } from '@/components/features/warranty/AddWarrantyModal';
import { useUser } from '@/hooks/useUser';
import type { Warranty } from '@/types';
import { api } from '@/utils/api';
import { calculateWarrantyStatus, calculateDaysRemaining } from '@/utils/warranty';

export default function DashboardPage() {
    const { user } = useUser();
    const [warranties, setWarranties] = useState<Warranty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWarranties = async () => {
            try {
                const data = await api.get<{ warranties: Warranty[], count: number }>('/warranties');
                const enrichedWarranties = (data.warranties || []).map(w => ({
                    ...w,
                    status: calculateWarrantyStatus(w.expiryDate),
                    daysRemaining: calculateDaysRemaining(w.expiryDate)
                }));
                setWarranties(enrichedWarranties);
            } catch (error) {
                console.error('Error fetching warranties:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWarranties();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this warranty?')) {
            try {
                await api.delete(`/warranties/${id}`);
                setWarranties(prev => prev.filter(w => w.id !== id));
            } catch (error) {
                console.error('Error deleting warranty:', error);
                alert('Failed to delete warranty. Please try again.');
            }
        }
    };

    const expiringWarranties = warranties.filter(w => w.status === 'expiring');

    return (
        <div className="min-h-screen bg-[#FDFCF9] py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <DashboardHeader
                    userName={user.name}
                    warrantiesCount={warranties.length}
                />

                <DashboardStatsGrid warranties={warranties} />

                <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-6">
                        <h2 className="font-black text-[#1A1C19] text-3xl tracking-tight">Expiring Soon</h2>
                        <span className="px-4 py-2 bg-[#F9F7F2] rounded-full text-xs font-black text-[#8A8A85] border border-[#E5E2D9] uppercase tracking-widest">
                            {expiringWarranties.length} Items
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-10 h-10 border-2 border-[#E5E2D9] border-t-[#2D5A43] rounded-full animate-spin" />
                        </div>
                    ) : expiringWarranties.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-[#F9F7F2] rounded-[3rem] border-2 border-dashed border-[#E5E2D9]">
                            <div className="w-20 h-20 bg-[#1A1C19] rounded-3xl flex items-center justify-center mb-6">
                                <FiShield size={32} className="text-[#FDFCF9]" />
                            </div>
                            <h3 className="font-black text-2xl text-[#1A1C19] mb-2 tracking-tight">Everything is safe</h3>
                            <p className="text-[#8A8A85] text-sm font-medium">No warranties are expiring in the next 30 days.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {expiringWarranties.map((warranty, i) => (
                                <div key={warranty.id} className="animate-fade-in-up h-full" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
                                    <WarrantyCard warranty={warranty} onDelete={handleDelete} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
