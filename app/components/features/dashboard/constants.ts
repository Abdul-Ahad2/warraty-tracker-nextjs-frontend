import type { Warranty, Notification } from '@/types';

export const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Expiring Soon', value: 'expiring' },
    { label: 'Expired', value: 'expired' },
];

function daysFromNow(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString();
}

function daysAgo(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
}

export const mockWarranties: Warranty[] = [
    {
        id: 'w1',
        productName: 'MacBook Pro 16"',
        brand: 'Apple',
        category: 'Electronics',
        purchaseDate: daysAgo(180),
        expiryDate: daysFromNow(185),
        warrantyProvider: 'AppleCare+',
        status: 'active',
        daysRemaining: 185,
        coverageDetails: 'Accidental damage, battery replacement, hardware repair',
        purchasePrice: 2499,
        notes: 'Extended warranty purchased at time of sale',
    },
    {
        id: 'w2',
        productName: 'Galaxy S24 Ultra',
        brand: 'Samsung',
        category: 'Electronics',
        purchaseDate: daysAgo(300),
        expiryDate: daysFromNow(65),
        warrantyProvider: 'Samsung Care',
        status: 'active',
        daysRemaining: 65,
        coverageDetails: 'Screen repair, manufacturer defects',
        purchasePrice: 1299,
    },
    {
        id: 'w3',
        productName: 'LG French Door Refrigerator',
        brand: 'LG',
        category: 'Appliances',
        purchaseDate: daysAgo(700),
        expiryDate: daysFromNow(25),
        warrantyProvider: 'LG Premium Care',
        status: 'expiring',
        daysRemaining: 25,
        coverageDetails: 'Compressor, cooling system, linear inverter motor',
        purchasePrice: 1899,
        notes: 'Consider renewing before expiry',
    },
    {
        id: 'w4',
        productName: 'Sony WH-1000XM5',
        brand: 'Sony',
        category: 'Electronics',
        purchaseDate: daysAgo(400),
        expiryDate: daysFromNow(12),
        warrantyProvider: 'Sony Standard',
        status: 'expiring',
        daysRemaining: 12,
        coverageDetails: 'Manufacturing defects only',
        purchasePrice: 349,
    },
    {
        id: 'w5',
        productName: 'Dyson V15 Detect',
        brand: 'Dyson',
        category: 'Appliances',
        purchaseDate: daysAgo(800),
        expiryDate: daysAgo(10),
        warrantyProvider: 'Dyson Standard',
        status: 'expired',
        daysRemaining: 0,
        coverageDetails: 'Motor, battery, filtration system',
        purchasePrice: 749,
    },
    {
        id: 'w6',
        productName: 'Herman Miller Aeron Chair',
        brand: 'Herman Miller',
        category: 'Furniture',
        purchaseDate: daysAgo(365),
        expiryDate: daysFromNow(3650),
        warrantyProvider: 'Herman Miller 12-Year',
        status: 'active',
        daysRemaining: 3650,
        coverageDetails: 'Full coverage — frame, mechanism, pneumatic cylinder',
        purchasePrice: 1395,
    },
];

export const mockNotifications: Notification[] = [
    {
        id: 'n1',
        type: 'expiry_warning',
        status: 'pending',
        warrantyId: 'w4',
        productName: 'Sony WH-1000XM5',
        message: 'Your Sony WH-1000XM5 warranty expires in 12 days. Consider filing any pending claims.',
        createdAt: daysAgo(1),
        read: false,
    },
    {
        id: 'n2',
        type: 'expiry_warning',
        status: 'pending',
        warrantyId: 'w3',
        productName: 'LG French Door Refrigerator',
        message: 'Your LG Refrigerator warranty expires in 25 days. Review your coverage details.',
        createdAt: daysAgo(2),
        read: false,
    },
    {
        id: 'n3',
        type: 'expired',
        status: 'read',
        warrantyId: 'w5',
        productName: 'Dyson V15 Detect',
        message: 'Your Dyson V15 Detect warranty has expired. You can no longer file claims under this warranty.',
        createdAt: daysAgo(10),
        read: true,
    },
    {
        id: 'n4',
        type: 'system',
        status: 'read',
        message: 'Welcome to Warrantor! Start by adding your first warranty to get expiry reminders.',
        createdAt: daysAgo(30),
        read: true,
    },
];
