import { useUserContext } from '@/components/providers/UserProvider';

export function useUser() {
    return useUserContext();
}
