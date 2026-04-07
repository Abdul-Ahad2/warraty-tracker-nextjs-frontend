// ─── Core Entity Types ───────────────────────────────────────────────────────

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    initials: string;
    createdAt: string;
}

export type WarrantyStatus = 'active' | 'expiring' | 'expired';

export type WarrantyCategory =
    | 'Electronics'
    | 'Appliances'
    | 'Automotive'
    | 'Furniture'
    | 'Clothing'
    | 'Tools'
    | 'Other';

export interface Warranty {
    id: string;
    productName: string;
    brand: string;
    category: WarrantyCategory;
    purchaseDate: string;
    expiryDate: string;
    warrantyProvider: string;
    receiptUrl?: string;
    notes?: string;
    status: WarrantyStatus;
    daysRemaining: number;
    coverageDetails?: string;
    purchasePrice?: number;
}

// ─── Notification Types ──────────────────────────────────────────────────────

export type NotificationType = 'expiry_warning' | 'expired' | 'renewal' | 'system';
export type NotificationStatus = 'pending' | 'read' | 'dismissed';

export interface Notification {
    id: string;
    type: NotificationType;
    status: NotificationStatus;
    warrantyId?: string;
    productName?: string;
    message: string;
    createdAt: string;
    read: boolean;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface DashboardStats {
    totalWarranties: number;
    activeWarranties: number;
    expiringSoon: number;
    expired: number;
}

// ─── UI/Component Types ──────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

// ─── Form Types ──────────────────────────────────────────────────────────────

export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    acceptTerms: boolean;
}

export interface DropdownItem {
    label?: string;
    icon?: string;
    onClick?: () => void;
    href?: string;
    danger?: boolean;
    divider?: boolean;
    disabled?: boolean;
}

// ─── Navigation Types ────────────────────────────────────────────────────────

export interface NavItem {
    label: string;
    href: string;
    icon?: string;
    badge?: number;
    isActive?: boolean;
}
