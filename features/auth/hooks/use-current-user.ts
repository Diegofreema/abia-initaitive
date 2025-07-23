import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export const useCurrentUser = () => {
  return useQuery(api.users.getCurrentUser);
};
