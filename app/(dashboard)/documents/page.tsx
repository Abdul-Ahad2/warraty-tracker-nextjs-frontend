"use client"
import { useEffect, useState } from 'react';
import { FiShield } from 'react-icons/fi';
import { WarrantyCard } from '@/components/shared/WarrantyCard';
import { DocumentsHeader } from '@/components/features/documents/DocumentsHeader';
import { DocumentsControls } from '@/components/features/documents/DocumentsControls';
import { tabs } from '@/components/features/documents/constants';
import { AddWarrantyModal } from '@/components/features/warranty/AddWarrantyModal';
import type { Warranty } from '@/types';
import { api } from '@/utils/api';
import { calculateWarrantyStatus, calculateDaysRemaining } from '@/utils/warranty';

export default function WarrantiesPage() {
    const [warranties, setWarranties] = useState<Warranty[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'modified' | 'title'>('modified');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingWarranty, setEditingWarranty] = useState<Warranty | null>(null);

    useEffect(() => {
        const fetchWarranties = async () => {
            try {
                const data = await api.get<{ warranties: Warranty[], count: number }>('/warranties');
                const enriched = (data.warranties || []).map(w => ({
                    ...w,
                    status: calculateWarrantyStatus(w.expiryDate),
                    daysRemaining: calculateDaysRemaining(w.expiryDate)
                }));
                setWarranties(enriched);
            } catch (error) {
                console.error('Error fetching warranties:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWarranties();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this warranty?')) return;
        try {
            await api.delete(`/warranties/${id}`);
            setWarranties(prev => prev.filter(w => w.id !== id));
        } catch (error) {
            console.error('Error deleting warranty:', error);
            alert('Failed to delete warranty.');
        }
    };

    const handleSave = async (warrantyData: any) => {
        try {
            if (warrantyData.id) {
                // Update
                await api.put(`/warranties/${warrantyData.id}`, warrantyData);
                const updated = warranties.map(w => 
                    w.id === warrantyData.id 
                        ? { 
                            ...w, 
                            ...warrantyData, 
                            status: calculateWarrantyStatus(warrantyData.expiryDate),
                            daysRemaining: calculateDaysRemaining(warrantyData.expiryDate)
                        } 
                        : w
                );
                setWarranties(updated);
            } else {
                // Create
                const result = await api.post<any>('/warranties', warrantyData);
                const enriched: Warranty = {
                    ...warrantyData,
                    id: result.warrantyId,
                    status: calculateWarrantyStatus(warrantyData.expiryDate),
                    daysRemaining: calculateDaysRemaining(warrantyData.expiryDate)
                };
                setWarranties(prev => [enriched, ...prev]);
            }
        } catch (error) {
            console.error('Error saving warranty:', error);
            alert('Failed to save warranty. Please try again.');
        }
    };

    const handleEdit = (warranty: Warranty) => {
        setEditingWarranty(warranty);
        setIsAddOpen(true);
    };

    const filtered = warranties
        .filter((w) => {
            if (activeTab === 'active' && w.status === 'expired') return false;
            if (activeTab === 'expiring' && w.status !== 'expiring') return false;
            if (activeTab === 'expired' && w.status !== 'expired') return false;
            const matchesSearch = !search || 
                w.productName.toLowerCase().includes(search.toLowerCase()) || 
                w.brand.toLowerCase().includes(search.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'title') return (a.productName || '').localeCompare(b.productName || '');
            return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime();
        });

    return (
        <div className="min-h-screen bg-[#FDFCF9] py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <DocumentsHeader onAddClick={() => {
                    setEditingWarranty(null);
                    setIsAddOpen(true);
                }} />
                <div className="animate-fade-in-up space-y-8" style={{ animationDelay: '0.2s' }}>
                    <DocumentsControls tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode} />
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-10 h-10 border-2 border-[#E5E2D9] border-t-[#2D5A43] rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-32 bg-[#F9F7F2] rounded-[3rem] border-2 border-dashed border-[#E5E2D9]">
                                    <div className="w-20 h-20 bg-[#1A1C19] rounded-3xl flex items-center justify-center mb-6">
                                        <FiShield size={32} className="text-[#FDFCF9]" />
                                    </div>
                                    <h3 className="font-black text-2xl text-[#1A1C19] mb-2 tracking-tight">No warranties found</h3>
                                    <p className="text-[#8A8A85] text-sm font-medium">No warranties match your filter.</p>
                                </div>
                            ) : (
                                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch' : 'flex flex-col gap-5'}>
                                    {filtered.map((warranty, i) => (
                                        <div key={warranty.id} className="animate-fade-in-up h-full" style={{ animationDelay: `${0.3 + i * 0.05}s` }}>
                                            <WarrantyCard 
                                                warranty={warranty} 
                                                onDelete={handleDelete} 
                                                onEdit={handleEdit}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <AddWarrantyModal 
                    open={isAddOpen} 
                    onClose={() => setIsAddOpen(false)} 
                    onAdd={handleSave} 
                    initialData={editingWarranty}
                />
            </div>
        </div>
    );
}