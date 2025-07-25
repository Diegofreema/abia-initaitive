import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function CodeInput({ length = 8 }: { length?: number }) {
  return (
    <div className="mb-4">
      <InputOTP maxLength={8} name="code" className={'self-center  w-full'}>
        <InputOTPGroup
          className={'flex items-center self-center flex-1 w-full'}
        >
          {Array(length)
            .fill(null)
            .map((_, index) => (
              <InputOTPSlot key={index} index={index} className={'flex-1'} />
            ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
