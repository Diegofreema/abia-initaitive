'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { INVALID_PASSWORD } from '@/convex/errors';
import { useAuthActions } from '@convex-dev/auth/react';

import { useConvexAuth } from 'convex/react';
import { ConvexError } from 'convex/values';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useCurrentUser } from '../hooks/use-current-user';
import { SignInSignUp } from './sign-in-sign-up';
import { VerifyEmailForm } from './verify-email-form';

export function SignInForm() {
  //   const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuthActions();
  const user = useCurrentUser();
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();

  const [flow, setFlow] = useState<'signIn' | 'signUp' | { email: string }>(
    'signIn'
  );

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      router.replace('/admin/dashboard');
    } else if (isAuthenticated && !user?.isAdmin) {
      router.replace('/user/profile');
    }
  }, [isAuthenticated, user, router]);
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500',
    ];

    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || '',
    };
  };

  const passwordStrength = getPasswordStrength(password || '');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (flow === 'signUp' && passwordStrength.strength < 3) {
      toast.error('Error', {
        description: 'Password is too weak',
      });
      return;
    }
    setSubmitting(true);

    if (flow === 'signIn' || flow === 'signUp') {
      void signIn('password-custom', formData)
        .then(() => {
          setSubmitting(true);
          setFlow({ email: formData.get('email') as string });
          // toast.success('Success', {
          //   description: 'A verification code has been sent to your email',
          // });
        })
        .catch((error) => {
          console.log(error.message);
          if (flow === 'signIn') {
            toast.error('Error', {
              description: 'Invalid email or password',
            });
            return;
          }
          if (error instanceof ConvexError && error.data === INVALID_PASSWORD) {
            toast('Error', {
              description: 'Password too weak',
            });
            return;
          }

          toast.error('Error', {
            description: 'Something went wrong, please try again',
          });
        })
        .finally(() => {
          setSubmitting(false);
        });

      // void signIn('password-custom', formData)
      //   .then(() => {
      //     setSubmitting(true);
      //     setFlow({ email: formData.get('email') as string });
      //   })
      //   .catch((error) => {
      //     if (error instanceof ConvexError && error.data === INVALID_PASSWORD) {
      //       toast('Error', {
      //         description: 'Password too weak',
      //       });
      //     }
      //   })
      //   .finally(() => {
      //     setSubmitting(false);
      //   });
    } else {
      void signIn('password-custom', formData)
        .then(() => {
          toast.success('Success', {
            description: 'Email verified, welcome onboard',
          });
          router.replace('/user/register');
          setFlow('signUp');
        })
        .catch(() => {
          toast.error('Error', {
            description: 'Something went wrong, please try again',
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }

    // setFlow({ email: formData.get("email") as string });
  };

  const flowSwitcherText =
    flow === 'signIn'
      ? "Don't have an account? Sign up"
      : 'Already have an account? Sign in';

  const buttonText = flow === 'signIn' ? 'Sign In' : 'Sign Up';
  const loadingButtonText =
    flow === 'signIn' ? 'Signing In...' : 'Signing Up...';
  const formTitle =
    flow === 'signIn'
      ? 'Sign In'
      : flow === 'signUp'
        ? 'Sign Up'
        : 'Verify Email';
  const isSignInOrSigUp = flow === 'signIn' || flow === 'signUp';
  // const handleGoogleSignIn = async () => {
  //   setSubmitting(true);
  //   void signIn('google', {
  //     redirectTo: '/user/profile',
  //   }).finally(() => {
  //     setSubmitting(false);
  //   });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{formTitle}</CardTitle>
          <CardDescription>
            Sign in to your ABIA Youth Leadership Academy account
          </CardDescription>
        </CardHeader>
        {isSignInOrSigUp ? (
          <SignInSignUp
            flow={flow}
            loadingButtonText={loadingButtonText}
            passwordStrength={passwordStrength.strength}
            password={password}
            buttonText={buttonText}
            flowSwitcherText={flowSwitcherText}
            onSubmit={onSubmit}
            setFlow={setFlow}
            passwordStrengthColor={passwordStrength.color}
            passwordStrengthLabel={passwordStrength.label}
            setPassword={setPassword}
            submitting={submitting}
          />
        ) : (
          <VerifyEmailForm
            submitting={submitting}
            onSubmit={onSubmit}
            email={flow.email}
            onCancel={() => setFlow('signIn')}
          />
        )}
        {/* <CardContent className="">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full mt-5"
            size="lg"
            disabled={submitting}
          >
            <IconBrandGoogle className="mr-2 h-4 w-4" />
            {'Continue with Google'}
          </Button>
        </CardContent> */}
      </Card>
    </div>
  );
}
