import { FiUser, FiLock, FiSettings as SettingsIcon } from 'react-icons/fi';

export const settingsTabs = [
    { label: 'Profile', value: 'profile', icon: <FiUser size={18} /> },
    { label: 'Security', value: 'security', icon: <FiLock size={18} /> },
    { label: 'Preferences', value: 'preferences', icon: <SettingsIcon size={18} /> },
];
