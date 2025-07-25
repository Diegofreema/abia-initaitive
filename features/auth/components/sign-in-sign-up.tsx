import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { PasswordInput } from './password-input';
import Link from 'next/link';

type Props = {
  flow: 'signIn' | 'signUp' | 'forgot';
  password: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setPassword: Dispatch<SetStateAction<string>>;
  setFlow: Dispatch<SetStateAction<'signIn' | 'signUp' | { email: string }>>;
  loadingButtonText: string;
  buttonText: string;
  submitting: boolean;
  flowSwitcherText: string;
  passwordStrength: number;
  passwordStrengthColor: string;
  passwordStrengthLabel: string;
};
export const SignInSignUp = ({
  flow,
  password,
  onSubmit,
  setPassword,
  setFlow,
  submitting,
  loadingButtonText,
  buttonText,
  flowSwitcherText,
  passwordStrengthColor,
  passwordStrengthLabel,
  passwordStrength,
}: Props) => {
  //   const router = useRouter();
  return (
    <CardContent>
      <form onSubmit={onSubmit} className="space-y-4">
        {flow === 'signUp' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[#060622] font-medium">
                First Name *
              </Label>
              <Input
                name="firstName"
                required={flow === 'signUp'}
                placeholder="John"
                className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[#060622] font-medium">
                Last Name *
              </Label>
              <Input
                name="lastName"
                required={flow === 'signUp'}
                placeholder="Doe"
                className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
              />
            </div>
          </div>
        )}

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

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#060622] font-medium">
            Password *
          </Label>
          <PasswordInput
            name="password"
            required
            placeholder="Create a strong password"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {password && flow === 'signUp' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrengthColor}`}
                    style={{
                      width: `${(passwordStrength / 5) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {passwordStrengthLabel}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end">
          {flow === 'signIn' ? (
            <Link href={'/auth/forgot-password'}>
              <Button
                variant={'link'}
                className="p-0 h-auto"
                onClick={() => {}}
              >
                Forgot your password?
              </Button>
            </Link>
          ) : null}
        </div>
        {flow === 'signUp' && (
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
        )}
        <input name="flow" type="hidden" value={flow} />
        <Button
          type="submit"
          disabled={submitting}
          className="w-full  text-base font-medium"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {loadingButtonText}
            </>
          ) : (
            <>
              {buttonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
        <Button
          variant="link"
          type="button"
          onClick={() => {
            setFlow(flow === 'signIn' ? 'signUp' : 'signIn');
          }}
        >
          {flowSwitcherText}
        </Button>
      </div>
    </CardContent>
  );
};
