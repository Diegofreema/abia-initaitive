'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StepProps } from '../../types';
import { Notice } from '../notice';

export function IdStep({ form, isEdit }: StepProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      {!isEdit && (
        <Notice
          title="Identification Details"
          subject="Please provide your identification information"
          description="⚠️ Ensure that the information provided is correct as it will be used to screen your admission , if you do not have an ABSSIN (Abia State Identification Number) click on the link below to create one."
          link="https://abiapay.com/create-abssin"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nin" className="text-[#060622] font-medium">
            National Identification Number (NIN) *
          </Label>
          <Input
            id="nin"
            {...register('nin', {
              required: 'NIN is required',
              pattern: {
                value: /^\d{11}$/,
                message: 'NIN must be 11 digits',
              },
            })}
            placeholder="Enter your 11-digit NIN"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.nin && (
            <p className="text-red-500 text-sm">{errors.nin.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="absin" className="text-[#060622] font-medium">
            Abia State Identification Number (ABSSIN)
          </Label>
          <Input
            id="absin"
            {...register('absin')}
            placeholder="Enter your ABSSIN"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.absin && (
            <p className="text-red-500 text-sm">{errors.absin.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
