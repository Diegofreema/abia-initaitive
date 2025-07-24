'use client';

import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RegistrationFormData } from '../../types';

interface NextOfKinStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export function NextOfKinStep({ form }: NextOfKinStepProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const { nokTitle, nokRelationship, nokGender } = watch();
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#060622] mb-2">
          Sponsor details
        </h2>
        <p className="text-gray-600">
          Please provide emergency contact details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nokTitle" className="text-[#060622] font-medium">
            Title *
          </Label>
          <Select
            {...register('nokTitle', { required: 'Title is required' })}
            required
            value={nokTitle}
            onValueChange={(value) => setValue('nokTitle', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mr">Mr</SelectItem>
              <SelectItem value="Mrs">Mrs</SelectItem>
              <SelectItem value="Miss">Miss</SelectItem>
            </SelectContent>
          </Select>
          {errors.nokTitle && (
            <p className="text-red-500 text-sm">{errors.nokTitle.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nokFirstName" className="text-[#060622] font-medium">
            First Name *
          </Label>
          <Input
            id="nokFirstName"
            {...register('nokFirstName', {
              required: 'First name is required',
            })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.nokFirstName && (
            <p className="text-red-500 text-sm">
              {errors.nokFirstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nokLastName" className="text-[#060622] font-medium">
            Last Name *
          </Label>
          <Input
            id="nokLastName"
            {...register('nokLastName', { required: 'Last name is required' })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.nokLastName && (
            <p className="text-red-500 text-sm">{errors.nokLastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nokMiddleName" className="text-[#060622] font-medium">
            Middle Name
          </Label>
          <Input
            id="nokMiddleName"
            {...register('nokMiddleName')}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nokGender" className="text-[#060622] font-medium">
            Gender *
          </Label>
          <Select
            {...register('nokGender', { required: 'Gender is required' })}
            required
            value={nokGender}
            onValueChange={(value) => setValue('nokGender', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.nokGender && (
            <p className="text-red-500 text-sm">{errors.nokGender.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nokRelationship" className="text-[#060622] font-medium">
          Relationship *
        </Label>
        <Select
          {...register('nokRelationship', {
            required: 'Relationship is required',
          })}
          required
          value={nokRelationship}
          onValueChange={(value) => setValue('nokRelationship', value)}
        >
          <SelectTrigger className="border-gray-300 focus:border-[#060622]">
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Sibling">Sibling</SelectItem>
            <SelectItem value="Spouse">Spouse</SelectItem>
            <SelectItem value="Child">Child</SelectItem>
            <SelectItem value="Guardian">Guardian</SelectItem>
            <SelectItem value="Friend">Friend</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.nokRelationship && (
          <p className="text-red-500 text-sm">
            {errors.nokRelationship.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="nokMobileNumber"
            className="text-[#060622] font-medium"
          >
            Mobile Number *
          </Label>
          <Input
            id="nokMobileNumber"
            {...register('nokMobileNumber', {
              required: 'Mobile number is required',
              pattern: {
                value: /^\d{11}$/,
                message: 'Mobile number must be 11 digits',
              },
            })}
            placeholder="+234"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
            type={'number'}
          />
          {errors.nokMobileNumber && (
            <p className="text-red-500 text-sm">
              {errors.nokMobileNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="nokAlternateMobileNumber"
            className="text-[#060622] font-medium"
          >
            Alternate Mobile Number
          </Label>
          <Input
            id="nokAlternateMobileNumber"
            {...register('nokAlternateMobileNumber')}
            placeholder="+234"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
            type={'number'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="nokResidentialAddress"
          className="text-[#060622] font-medium"
        >
          Residential Address *
        </Label>
        <Textarea
          id="nokResidentialAddress"
          {...register('nokResidentialAddress', {
            required: 'Residential address is required',
          })}
          className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          rows={3}
        />
        {errors.nokResidentialAddress && (
          <p className="text-red-500 text-sm">
            {errors.nokResidentialAddress.message}
          </p>
        )}
      </div>
    </div>
  );
}
