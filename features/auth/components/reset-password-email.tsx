import { CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { CodeInput } from './code-input';
import { PasswordInput } from './password-input';

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  email: string;
  submitting: boolean;
  flow: 'signIn' | 'signUp' | { email: string } | 'forgot';
  setFlow: Dispatch<
    SetStateAction<
      | 'signIn'
      | 'signUp'
      | {
          email: string;
        }
      | 'forgot'
    >
  >;
};
export const ResetPasswordEmail = ({
  onSubmit,
  email,
  submitting,
  setFlow,
  flow,
}: Props) => {
  const [password, setPassword] = useState('');

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
  return (
    <CardContent>
      {flow === 'forgot' ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <Label>
            <span className="text-[#060622] font-medium">
              Enter the email address associated with your account
            </span>
          </Label>
          <Input
            name="email"
            required
            placeholder="Email"
            type="email"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622] h-12"
          />
          <input name="flow" type="hidden" value="reset" />
          <div className="flex justify-end">
            <Button variant={'link'} onClick={() => setFlow('signIn')}>
              Cancel
            </Button>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full  text-base font-medium"
          >
            Send code
          </Button>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#060622] font-medium">
              Code *
            </Label>
            <CodeInput />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#060622] font-medium">
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
            <Input name="email" type="hidden" value={email} />
            <Input name="flow" type="hidden" value="reset-verification" />
          </div>

          <div className="flex items-center justify-end">
            <Button
              className="p-0 h-auto"
              type="button"
              variant="link"
              onClick={() => setFlow('signIn')}
            >
              Sign in
            </Button>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full  text-base font-medium"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Reset
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      )}
    </CardContent>
  );
};
