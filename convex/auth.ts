import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      profile(googleProfile) {
        console.log('Google profile:', googleProfile);

        return {
          id: googleProfile.sub,
          name: googleProfile.name,
          email: googleProfile.email,
          image: googleProfile.picture,
          isAdmin: false,
          isRegistered: false,
        };
      },
    }),
  ],
});
