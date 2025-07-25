import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { FormEvent } from 'react';
import { CodeInput } from './code-input';
import { Label } from '@/components/ui/label';

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  email: string;
  onCancel: () => void;
};
export const VerifyEmailForm = ({
  onSubmit,
  submitting,
  email,
  onCancel,
}: Props) => {
  console.log({ email });

  return (
    <CardContent>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>
            <span className="text-[#060622] font-medium">
              Enter the code sent to your email
            </span>
          </Label>
          <CodeInput />
          <input name="email" value={email} type="hidden" />
          <input name="flow" value="email-verification" type="hidden" />
        </div>
        <div className="flex justify-end">
          <Button variant={'link'} onClick={onCancel}>
            Cancel
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
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </CardContent>
  );
};
