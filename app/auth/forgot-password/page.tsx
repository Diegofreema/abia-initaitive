'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/features/auth/components/password-input';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useAuthActions } from '@convex-dev/auth/react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<'forgot' | { email: string }>('forgot');
  const [password, setPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const router = useRouter();
  const user = useCurrentUser();
  const { isAuthenticated } = useConvexAuth();
  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      router.replace('/admin/dashboard');
    } else if (isAuthenticated && !user?.isAdmin) {
      router.replace('/user/profile');
    }
  }, [isAuthenticated, user, router]);
  const startTimer = useCallback(() => {
    setTimeLeft(60); // Reset to 60 seconds
  }, []);
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop if timer reaches 0

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId); // Clear interval when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    // Cleanup interval on unmount or when timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const buttonText = submitting
    ? 'Sending...'
    : timeLeft > 0
      ? `Wait ${timeLeft}s`
      : 'Send reset code';
  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    process: 'first' | 'second'
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (process === 'first') {
      setSubmitting(true);
      void signIn('password-custom', formData)
        .then(() => {
          setStep({ email: formData.get('email') as string });
          startTimer();
          toast('Reset code sent', {
            description: 'Please check your email for the reset code.',
          });
        })
        .catch((e) => {
          console.log(e);

          toast('Reset Failed, make sure you have the right email', {
            description: 'Failed to reset password. Please try again.',
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      setSubmitting(true);
      void signIn('password-custom', formData)
        .then(() => {
          toast('Password reset successfully', {
            description: 'Your password has been reset',
          });
          router.replace('/techrise/profile');
        })
        .catch((e) => {
          console.log(e);

          toast('Reset Failed, make sure you have the right email', {
            description: 'Failed to reset password. Please try again.',
          });
        })
        .finally(() => setSubmitting(false));
    }
  };
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 6) strength++;
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
  const { strength, label, color } = passwordStrength;
  const disabled = submitting || timeLeft > 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#060622] mb-2">
            Forgot password
          </h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-[#060622]">
              Type your email below
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 'forgot' && (
              <form
                onSubmit={(e) => onSubmit(e, 'first')}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#060622] font-medium">
                    Email Address *
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
                  />
                </div>
                <Input
                  name="flow"
                  type="hidden"
                  value="reset"
                  className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
                />
                <Button
                  type="submit"
                  disabled={disabled}
                  className="w-full  h-12 text-base font-medium"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {buttonText}
                    </>
                  ) : (
                    <>
                      {buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
            {step !== 'forgot' && (
              <form
                onSubmit={(e) => onSubmit(e, 'second')}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#060622] font-medium">
                    Code *
                  </Label>
                  <Input
                    name="code"
                    type="text"
                    required
                    placeholder="Enter code sent to your email"
                    className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-[#060622] font-medium"
                  >
                    Password *
                  </Label>
                  <PasswordInput
                    name="newPassword"
                    required
                    placeholder="Enter new password"
                    className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${color}`}
                          style={{
                            width: `${(strength / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{label}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-[#060622] mb-2">
                      Password Requirements:
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle
                          className={`w-3 h-3 ${password?.length >= 6 ? 'text-green-500' : 'text-gray-400'}`}
                        />
                        At least 6 characters
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle
                          className={`w-3 h-3 ${/[A-Z]/.test(password || '') ? 'text-green-500' : 'text-gray-400'}`}
                        />
                        One uppercase letter
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle
                          className={`w-3 h-3 ${/[0-9]/.test(password || '') ? 'text-green-500' : 'text-gray-400'}`}
                        />
                        One number
                      </div>
                    </div>
                  </div>
                  <Input name="email" type="hidden" value={step.email} />
                  <Input name="flow" type="hidden" value="reset-verification" />
                </div>

                <Button
                  type="submit"
                  disabled={submitting || strength < 4}
                  className="w-full  h-12 text-base font-medium"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <div className="mt-8 text-center">
              <Link href="/auth/signin" className="text-sm  transition-colors">
                <Button variant={'link'}>Sign In</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
