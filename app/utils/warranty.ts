import type { WarrantyStatus } from '@/types';

export function calculateDaysRemaining(expiryDate: string): number {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateWarrantyStatus(expiryDate: string): WarrantyStatus {
    const daysLeft = calculateDaysRemaining(expiryDate);
    
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 30) return 'expiring';
    return 'active';
}
