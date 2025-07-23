import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';

export const getCurrentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null; // User is not authenticated
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null; // User not found in the database
    }
    return user;
  },
});
