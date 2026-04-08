'use client';

import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX, FiPlus, FiCheckCircle } from 'react-icons/fi';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import type { Warranty } from '@/types';
import { api } from '@/utils/api';

interface AddWarrantyModalProps { 
    open: boolean; 
    onClose: () => void; 
    onAdd: (warranty: any) => void;
    initialData?: Warranty | null;
}

const categories = ['Electronics', 'Appliances', 'Furniture', 'Automotive', 'Other'];

export function AddWarrantyModal({ open, onClose, onAdd, initialData }: AddWarrantyModalProps) {
    const [form, setForm] = useState({ 
        productName: '', 
        brand: '', 
        category: 'Electronics', 
        warrantyProvider: '', 
        purchaseDate: '', 
        expiryDate: '', 
        coverageDetails: '', 
        pictureUrl: '' 
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize form when initialData changes
    useEffect(() => {
        if (initialData) {
            setForm({
                productName: initialData.productName || '',
                brand: initialData.brand || '',
                category: initialData.category || 'Electronics',
                warrantyProvider: initialData.warrantyProvider || '',
                purchaseDate: initialData.purchaseDate ? new Date(initialData.purchaseDate).toISOString().split('T')[0] : '',
                expiryDate: initialData.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : '',
                coverageDetails: initialData.coverageDetails || '',
                pictureUrl: (initialData as any).pictureUrl || ''
            });
        } else {
            setForm({ productName: '', brand: '', category: 'Electronics', warrantyProvider: '', purchaseDate: '', expiryDate: '', coverageDetails: '', pictureUrl: '' });
        }
    }, [initialData, open]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.productName.trim()) e.productName = 'Product name is required';
        if (!form.brand.trim()) e.brand = 'Brand is required';
        if (!form.purchaseDate) e.purchaseDate = 'Purchase date is required';
        if (!form.expiryDate) e.expiryDate = 'Expiry date is required';
        if (!form.pictureUrl) e.pictureUrl = 'Receipt/Product photo is required';
        return e;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setErrors(prev => ({ ...prev, pictureUrl: '' }));

        try {
            const { uploadUrl, pictureUrl } = await api.get<{ uploadUrl: string, pictureUrl: string }>('/uploads');
            await api.uploadFile(uploadUrl, file);
            setForm(prev => ({ ...prev, pictureUrl }));
        } catch (error) {
            console.error('Upload failed:', error);
            setErrors(prev => ({ ...prev, pictureUrl: 'Failed to upload image. Please try again.' }));
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        onAdd({ ...form, id: initialData?.id }); 
        setErrors({});
        onClose();
    };

    const isEdit = !!initialData;

    return (
        <Modal 
            open={open} 
            onClose={onClose} 
            title={isEdit ? "Edit Warranty" : "Add Warranty"} 
            description={isEdit ? "Update your product records" : "Register a new product warranty"} 
            size="xl"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                    {/* Left Column: Core Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xs font-black text-[#8A8A85] uppercase tracking-widest bg-[#F9F7F2] inline-block px-3 py-1 rounded-full border border-[#E5E2D9]">Product Details</h3>
                            <div className="space-y-5 pt-2">
                                <Input id="productName" type="text" label="Product Name" placeholder="MacBook Pro 16&quot;" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} error={errors.productName} />
                                <Input id="brand" type="text" label="Brand" placeholder="Apple" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} error={errors.brand} />

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="category" className="text-sm font-bold text-[#1A1C19]">Category</label>
                                    <select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-4 py-3 text-sm border border-[#E5E2D9] rounded-2xl bg-[#FDFCF9] text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent transition-all appearance-none cursor-pointer hover:border-[#444941]/30">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <Input id="warrantyProvider" type="text" label="Warranty Provider" placeholder="AppleCare+" value={form.warrantyProvider} onChange={(e) => setForm({ ...form, warrantyProvider: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Lifecycle & Evidence */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xs font-black text-[#8A8A85] uppercase tracking-widest bg-[#F9F7F2] inline-block px-3 py-1 rounded-full border border-[#E5E2D9]">Timeline & Receipt</h3>
                            <div className="space-y-5 pt-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input id="purchaseDate" type="date" label="Purchase Date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} error={errors.purchaseDate} />
                                    <Input id="expiryDate" type="date" label="Expiry Date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} error={errors.expiryDate} />
                                </div>

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-[2rem] p-6 text-center transition-all cursor-pointer group h-40 flex items-center justify-center
                                        ${form.pictureUrl ? 'border-[#2D5A43] bg-[#F1F8F4]' : 'border-[#E5E2D9] hover:border-[#2D5A43] bg-transparent'}
                                        ${uploading ? 'opacity-50 pointer-events-none' : ''}
                                    `}
                                >
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${form.pictureUrl ? 'bg-[#2D5A43] text-[#FDFCF9]' : 'bg-[#F9F7F2] text-[#8A8A85]'}`}>
                                            {uploading ? <Spinner size="sm" /> : form.pictureUrl ? <FiCheckCircle size={20} /> : <FiUpload size={20} />}
                                        </div>
                                        {uploading ? (
                                            <p className="text-xs font-bold text-[#2D5A43]">Uploading...</p>
                                        ) : form.pictureUrl ? (
                                            <p className="text-xs font-bold text-[#2D5A43]">Receipt logged!</p>
                                        ) : (
                                            <p className="text-xs font-bold text-[#8A8A85] uppercase tracking-tighter">Add Receipt Photo</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="coverageDetails" className="text-sm font-bold text-[#1A1C19]">Coverage Details</label>
                                    <textarea id="coverageDetails" rows={3} placeholder="What does your warranty cover?" value={form.coverageDetails} onChange={(e) => setForm({ ...form, coverageDetails: e.target.value })}
                                        className="w-full px-4 py-3 text-sm border border-[#E5E2D9] rounded-2xl bg-[#FDFCF9] text-[#1A1C19] placeholder-[#8A8A85] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent transition-all resize-none hover:border-[#444941]/30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalFooter>
                    <Button type="button" variant="ghost" onClick={onClose} disabled={uploading} className="rounded-2xl font-black">Cancel</Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={uploading}
                        className="rounded-2xl font-black px-8"
                    >
                        {isEdit ? "Save Changes" : "Save Warranty"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
