'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
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

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { RegistrationData, SponsorInfo } from '../../types';
import { sponsorInfoSchema } from '../../validators';
import { generateErrorMessage } from '@/features/shared/utils';

interface SponsorInfoStepProps {
  data: SponsorInfo;
  registrationData: RegistrationData;
  onPrevious: () => void;
  onUpdate: (data: SponsorInfo) => void;
}

export function SponsorInfoStep({
  data,
  registrationData,
  onPrevious,
  onUpdate,
}: SponsorInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createRegistration = useMutation(api.registrations.create);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SponsorInfo>({
    resolver: zodResolver(sponsorInfoSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = async (formData: SponsorInfo) => {
    setIsSubmitting(true);
    try {
      onUpdate(formData);

      const completeData = {
        ...registrationData,
        sponsorInfo: formData,
      };

      await createRegistration(completeData);

      toast.success('Registration Successful!', {
        description: 'Your application has been submitted successfully.',
      });

      router.push('/profile');
    } catch (error) {
      console.log(error);
      const errorMessage = generateErrorMessage(
        error,
        'There was an error submitting your application. Please try again.'
      );
      toast.error('Registration Failed', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sponsor Information
        </h2>
        <p className="text-gray-600">
          Please provide emergency contact details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Select
              onValueChange={(value) => setValue('title', value)}
              defaultValue={data.title}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="Miss">Miss</SelectItem>
                <SelectItem value="Dr">Dr</SelectItem>
                <SelectItem value="Prof">Prof</SelectItem>
                <SelectItem value="Rev">Rev</SelectItem>
                <SelectItem value="Pastor">Pastor</SelectItem>
              </SelectContent>
            </Select>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            {...register('middleName')}
            placeholder="Enter middle name (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <Select
              onValueChange={(value) => setValue('gender', value)}
              defaultValue={data.gender}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="designation">Designation *</Label>
            <Select
              onValueChange={(value) => setValue('designation', value)}
              defaultValue={data.designation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Guardian">Guardian</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Faith Leader">Faith Leader</SelectItem>
                <SelectItem value="Mentor">Mentor</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mobileNumber">Mobile Number *</Label>
            <Input
              id="mobileNumber"
              {...register('mobileNumber')}
              placeholder="+234"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="alternateMobileNumber">
              Alternate Mobile Number
            </Label>
            <Input
              id="alternateMobileNumber"
              {...register('alternateMobileNumber')}
              placeholder="+234 (optional)"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="residentialAddress">Residential Address *</Label>
          <Textarea
            id="residentialAddress"
            {...register('residentialAddress')}
            placeholder="Enter full residential address"
            rows={3}
          />
          {errors.residentialAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.residentialAddress.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting
              ? 'Submitting Registration...'
              : 'Submit Registration'}
          </Button>
        </div>
      </form>
    </div>
  );
}
