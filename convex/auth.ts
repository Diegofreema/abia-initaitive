import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';
import { ConvexError } from 'convex/values';
import { INVALID_PASSWORD } from './errors';
import { ResendOTPPasswordReset } from './ResendOtPPasswordReset';
import { Password } from '@convex-dev/auth/providers/Password';
import { DataModel } from './_generated/dataModel';
import z from 'zod';
import { ResendOTP } from './ResendOTP';
const ParamsSchema = z.object({
  email: z.email(),
});
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
    Password<DataModel>({
      id: 'password-custom',
      profile(params) {
        const { error, data } = ParamsSchema.safeParse(params);
        if (error) {
          console.log('error-reg', error);
          throw new ConvexError(error.message);
        }
        return {
          email: data.email as string,
          name: params.firstName + ' ' + params.lastName,
          isAdmin: false,
          isRegistered: false,
        };
      },
      validatePasswordRequirements: (password: string) => {
        let checksCount = 0;

        if (password && password.length >= 6) {
          checksCount++;
        }

        if (/\d/.test(password)) {
          checksCount++;
        }

        if (/[a-z]/.test(password)) {
          checksCount++;
        }

        if (/[A-Z]/.test(password)) {
          checksCount++;
        }

        if (/[^A-Za-z0-9]/.test(password)) {
          checksCount++;
        }

        if (checksCount < 4) {
          throw new ConvexError(INVALID_PASSWORD);
        }
      },
      // verify: ResendOtp,
      reset: ResendOTPPasswordReset,
      verify: ResendOTP,
    }),
  ],
});
