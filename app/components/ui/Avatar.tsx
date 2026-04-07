import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]): string {
    return twMerge(clsx(inputs));
}

// Minimalist color palette for avatars
const avatarColors = [
    'bg-white text-neutral-900 border-neutral-200',
    'bg-neutral-50 text-neutral-900 border-neutral-200',
    'bg-neutral-100 text-neutral-900 border-neutral-300',
    'bg-neutral-900 text-white border-neutral-950',
];

function getColorIndex(name: string): number {
    return name.charCodeAt(0) % avatarColors.length;
}

interface AvatarProps {
    name: string;
    src?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    status?: 'online' | 'away' | 'offline';
    className?: string;
    style?: React.CSSProperties;
}

const sizes = {
    xs: { container: 'w-6 h-6 text-[10px]', ring: 'w-2 h-2 border' },
    sm: { container: 'w-8 h-8 text-xs', ring: 'w-2.5 h-2.5 border' },
    md: { container: 'w-10 h-10 text-sm', ring: 'w-3 h-3 border-[1.5px]' },
    lg: { container: 'w-12 h-12 text-base', ring: 'w-3.5 h-3.5 border-2' },
    xl: { container: 'w-16 h-16 text-xl', ring: 'w-4 h-4 border-2' },
};

const statusColors = {
    online: 'bg-black',
    away: 'bg-neutral-400',
    offline: 'bg-neutral-300',
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export function Avatar({ name, src, size = 'md', status, className, style }: AvatarProps) {
    const s = sizes[size];
    const colorClass = avatarColors[getColorIndex(name)];

    return (
        <div className={cn('relative inline-flex shrink-0', className)} style={style}>
            <div
                className={cn(
                    s.container,
                    'rounded-full flex items-center justify-center font-semibold overflow-hidden border transition-shadow duration-200',
                    !src && colorClass,
                    'shadow-sm hover:shadow-md'
                )}
                style={{
                    fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
                }}
            >
                {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={name} className="w-full h-full object-cover" />
                ) : (
                    getInitials(name)
                )}
            </div>
            {status && (
                <span
                    className={cn(
                        s.ring,
                        'absolute bottom-0 right-0 rounded-full border-white',
                        statusColors[status]
                    )}
                />
            )}
        </div>
    );
}

// Avatar group (stacked)
interface AvatarGroupProps {
    users: { name: string; src?: string }[];
    max?: number;
    size?: AvatarProps['size'];
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
    const visible = users.slice(0, max);
    const overflow = users.length - max;
    const s = sizes[size];

    return (
        <div className="flex items-center -space-x-2">
            {visible.map((u, i) => (
                <Avatar
                    key={i}
                    name={u.name}
                    src={u.src}
                    size={size}
                    className="ring-2 ring-white"
                    style={{ zIndex: visible.length - i }}
                />
            ))}
            {overflow > 0 && (
                <div
                    className={cn(
                        s.container,
                        'rounded-full flex items-center justify-center font-semibold text-neutral-700 bg-neutral-100 ring-2 ring-white border border-neutral-200'
                    )}
                    style={{
                        zIndex: 0,
                        fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
                    }}
                >
                    +{overflow}
                </div>
            )}
        </div>
    );
}