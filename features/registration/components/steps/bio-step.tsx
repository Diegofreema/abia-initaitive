'use client';

import React, { useState } from 'react';

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

import { local, NIGERIAN_STATES, StepProps } from '../../types';
import { Notice } from '../notice';
import { ProfilePictureUpload } from '../profile-pics';

// Add this after the existing imports and before the BioStepProps interface

export function BioStep({ form, isEdit }: StepProps) {
  const [profilePictureError, setProfilePictureError] = useState<string>('');

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const handleProfilePictureSelect = (file: File | null) => {
    setProfilePictureError('');

    if (!file) {
      setValue('profilePicture', undefined);
      return;
    }

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      setProfilePictureError('Please select a PNG or JPG image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setProfilePictureError('File size must be less than 5MB');
      return;
    }

    setValue('profilePicture', file);
  };
  const {
    profilePicture: picture,
    title,
    gender,
    lgaOfOrigin,
    lgaOfResidence,
    stateOfOrigin,
    maritalStatus,
  } = watch();

  return (
    <div className="space-y-6">
      <Notice
        title="Personal Information"
        subject="Please provide your personal details"
        description="This information will be used to verify your identity, so it should match information on your NIN and ABSINN"
      />

      {/* Page Picture Upload Section */}
      {!isEdit && (
        <div className="space-y-2">
          <Label className="text-[#060622] font-medium">
            Profile Picture *
          </Label>
          <ProfilePictureUpload
            onFileSelect={handleProfilePictureSelect}
            currentFile={picture}
            error={profilePictureError}
            form={form}
          />
          {errors.profilePicture && !picture && (
            <p className="text-red-500 text-sm text-center">
              {errors.profilePicture.message}
            </p>
          )}
        </div>
      )}

      {/* Rest of the existing form fields remain the same... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[#060622] font-medium">
            Title *
          </Label>
          <Select
            {...register('title', { required: 'Title is required' })}
            onValueChange={(value) => setValue('title', value)}
            value={title}
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
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-[#060622] font-medium">
            First Name *
          </Label>
          <Input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-[#060622] font-medium">
            Last Name *
          </Label>
          <Input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="middleName" className="text-[#060622] font-medium">
          Middle Name
        </Label>
        <Input
          id="middleName"
          {...register('middleName')}
          className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-[#060622] font-medium">
            Gender *
          </Label>
          <Select
            required
            {...register('gender', { required: 'Gender is required' })}
            onValueChange={(value) => setValue('gender', value)}
            value={gender}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-[#060622] font-medium">
            Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            disabled={isEdit}
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
              validate: {
                ageRange: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  const monthDiff = today.getMonth() - birthDate.getMonth();
                  const dayDiff = today.getDate() - birthDate.getDate();

                  // Adjust age if birthday hasn't occurred this year
                  const adjustedAge =
                    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)
                      ? age - 1
                      : age;

                  return (
                    (adjustedAge >= 16 && adjustedAge <= 20) ||
                    'Age must be between 16 and 20 years'
                  );
                },
              },
            })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus" className="text-[#060622] font-medium">
            Marital Status *
          </Label>
          <Select
            required
            {...register('maritalStatus', {
              required: 'Marital status is required',
            })}
            value={maritalStatus}
            onValueChange={(value) => setValue('maritalStatus', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#060622] font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            disabled
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stateOfOrigin" className="text-[#060622] font-medium">
            State of Origin *
          </Label>
          <Select
            {...register('stateOfOrigin', {
              required: 'State of origin is required',
            })}
            value={stateOfOrigin}
            onValueChange={(value) => setValue('stateOfOrigin', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {NIGERIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.stateOfOrigin && (
            <p className="text-red-500 text-sm">
              {errors.stateOfOrigin.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lgaOfOrigin" className="text-[#060622] font-medium">
            LGA of Origin *
          </Label>
          <Select
            value={lgaOfOrigin}
            required
            {...register('lgaOfOrigin', {
              required: 'LGA of origin is required',
            })}
            onValueChange={(value) => setValue('lgaOfOrigin', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select LGA" />
            </SelectTrigger>
            <SelectContent>
              {local.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="town" className="text-[#060622] font-medium">
            Town *
          </Label>
          <Input
            id="town"
            {...register('town', { required: 'Town is required' })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.town && (
            <p className="text-red-500 text-sm">{errors.town.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="lgaOfResidence"
            className="text-[#060622] font-medium"
          >
            LGA of Residence *
          </Label>
          <Select
            required
            {...register('lgaOfResidence', {
              required: 'LGA of residence is required',
            })}
            value={lgaOfResidence}
            onValueChange={(value) => setValue('lgaOfResidence', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {local.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="townOfResidence"
            className="text-[#060622] font-medium"
          >
            Town of Residence *
          </Label>
          <Input
            id="townOfResidence"
            {...register('townOfResidence', {
              required: 'Town of residence is required',
            })}
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          />
          {errors.townOfResidence && (
            <p className="text-red-500 text-sm">
              {errors.townOfResidence.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="residentialAddress"
          className="text-[#060622] font-medium"
        >
          Residential Address *
        </Label>
        <Textarea
          id="residentialAddress"
          {...register('residentialAddress', {
            required: 'Residential address is required',
          })}
          className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
          rows={3}
        />
        {errors.residentialAddress && (
          <p className="text-red-500 text-sm">
            {errors.residentialAddress.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-[#060622] font-medium">
            Phone Number *
          </Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^\d{11}$/,
                message: 'Phone number must be 11 digits',
              },
            })}
            placeholder="+234"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
            type={'number'}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="alternatePhoneNumber"
            className="text-[#060622] font-medium"
          >
            Alternate Phone Number
          </Label>
          <Input
            id="alternatePhoneNumber"
            {...register('alternatePhoneNumber', {
              pattern: {
                value: /^\d{11}$/,
                message: 'Alternate number must be 11 digits',
              },
            })}
            placeholder="+234"
            className="border-gray-300 focus:border-[#060622] focus:ring-[#060622]"
            type={'number'}
          />
        </div>
      </div>
    </div>
  );
}
