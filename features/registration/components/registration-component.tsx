'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BioStep } from './steps/bio-step';
import { IdStep } from './steps/id-step';
import { MedicalStep } from './steps/medical-step';
import { NextOfKinStep } from './steps/next-of-kin-step';

import { Progress } from '@/components/ui/progress';
import { generateErrorMessage } from '@/features/shared/utils';
import { toast } from 'sonner';
import { RegistrationFormData } from '../types';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';

const STEPS = [
  { id: 1, title: 'ID Details', component: IdStep },
  { id: 2, title: 'Bio Data', component: BioStep },
  { id: 3, title: 'Medical', component: MedicalStep },

  { id: 4, title: 'Sponsor', component: NextOfKinStep },
];
type Props = {
  user: Doc<'users'>;
};
export function RegistrationComponent({ user }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const createRegistration = useMutation(api.registrations.create);
  const generateUploadUrl = useMutation(api.registrations.generateUploadUrl);
  const form = useForm<RegistrationFormData>({
    mode: 'onChange',
    defaultValues: {
      hasMedicalCondition: false,
      gender: 'Male',
      lgaOfOrigin: 'Aba North',
      lgaOfResidence: 'Aba North',
      maritalStatus: 'Single',
      stateOfOrigin: 'Abia',
      bloodType: '',
      bloodGroup: '',
      profilePicture: undefined,
      email: user?.email || '',
      title: 'Mr',
      nokGender: 'Male',
      nokTitle: 'Mr',
      nokRelationship: 'Parent',
      phoneNumber: '',
      residentialAddress: '',
      town: '',
      townOfResidence: '',
      nokResidentialAddress: '',
      nokFirstName: '',
      nokLastName: '',
      nokMobileNumber: '',
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      dateOfBirth: '',
      absin: '',
      nin: '',
      alternatePhoneNumber: '',
    },
  });

  const { handleSubmit, trigger } = form;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof RegistrationFormData)[] => {
    switch (step) {
      case 1:
        return ['nin', 'absin'];
      case 2:
        return [
          'title',
          'firstName',
          'lastName',
          'gender',
          'dateOfBirth',
          'maritalStatus',
          'stateOfOrigin',
          'lgaOfOrigin',
          'town',
          'lgaOfResidence',
          'townOfResidence',
          'residentialAddress',
          'email',
          'phoneNumber',
          'profilePicture',
        ];
      case 3:
        return ['bloodType', 'bloodGroup', 'hasMedicalCondition'];
      case 4:
        return [
          'nokTitle',
          'nokFirstName',
          'nokLastName',
          'nokGender',
          'nokRelationship',
          'nokMobileNumber',
          'nokResidentialAddress',
        ];

      default:
        return [];
    }
  };
  const {
    nin,
    title,
    lastName,
    firstName,
    gender,
    dateOfBirth,
    maritalStatus,
    stateOfOrigin,
    lgaOfOrigin,
    town,
    lgaOfResidence,
    townOfResidence,
    residentialAddress,
    email,

    phoneNumber,
    bloodType,
    bloodGroup,
    nokTitle,
    nokLastName,
    nokFirstName,
    nokGender,
    nokRelationship,
    nokMobileNumber,
    nokResidentialAddress,
  } = form.watch();
  const requiredFields = [
    nin,
    title,
    lastName,
    firstName,
    gender,
    dateOfBirth,
    maritalStatus,
    stateOfOrigin,
    lgaOfOrigin,
    town,
    lgaOfResidence,
    townOfResidence,
    residentialAddress,
    email,

    phoneNumber,
    bloodType,
    bloodGroup,
    nokTitle,
    nokLastName,
    nokFirstName,
    nokGender,
    nokRelationship,
    nokMobileNumber,
    nokResidentialAddress,
  ];
  const onSubmit = async (data: RegistrationFormData) => {
    const { profilePicture } = data;
    console.log(data);

    for (const field of requiredFields) {
      if (!field || (typeof field === 'string' && field.trim() === '')) {
        toast.error('Error', {
          description: `${field} is required`,
        });
        return;
      }
    }

    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'image/png' },
        body: profilePicture,
      });
      const { storageId } = await result.json();

      await createRegistration({
        personalInfo: {
          profilePictureId: storageId,
          dateOfBirth: data.dateOfBirth,
          emailAddress: data.email,
          firstName: data.firstName,
          gender: data.gender,
          lastName: data.lastName,
          maritalStatus: data.maritalStatus,
          middleName: data.middleName,
          phoneNumber: data.phoneNumber,
          stateOfOrigin: data.stateOfOrigin,
          title: data.title,
          town: data.town,
          lgaOfOrigin: data.lgaOfOrigin,
          lgaOfResidence: data.lgaOfResidence,
          townOfResidence: data.townOfResidence,
          residentialAddress: data.residentialAddress,
          alternatePhoneNumber: data.alternatePhoneNumber,
        },
        identificationInfo: {
          nationalIdNumber: data.nin,
          abiaStateIdNumber: data.absin,
        },
        medicalInfo: {
          bloodType: data.bloodType,
          bloodGroup: data.bloodGroup,
          hasMedicalCondition: data.hasMedicalCondition,
          medicalConditionDetails: data.medicalConditions,
        },
        sponsorInfo: {
          firstName: data.nokFirstName,
          lastName: data.nokLastName,
          gender: data.nokGender,
          mobileNumber: data.nokMobileNumber,
          alternateMobileNumber: data.nokAlternateMobileNumber,
          middleName: data.nokMiddleName,

          residentialAddress: data.nokResidentialAddress,
          title: data.nokTitle,
        },
      });
      //     await sendWelcomeEmail({
      //     email,
      //     userFirstName: data.firstName,
      //     userLastName: data.lastName,
      //   });
      toast.success('Success', {
        description:
          'Registration successfully, you will receive an email shortly.',
      });
      router.replace('/user/profile');
    } catch (error) {
      console.log('REGISTRATION_ERROR', error);

      const errorMessage = generateErrorMessage(
        error,
        'Failed to submit registration.'
      );
      toast.error('Error', {
        description: errorMessage,
      });
    }
  };

  const submitting = form.formState.isSubmitting;

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 overflow-x-scroll">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center cursor-pointer ${step.id < STEPS.length ? 'flex-1' : ''}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-[#060622] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`ml-2 text-sm font-medium truncate ${currentStep >= step.id ? 'text-[#060622]' : 'text-gray-500'}`}
                >
                  {step.title}
                </span>
                {step.id < STEPS.length && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentStep > step.id ? 'bg-[#060622]' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent Enter key submission
            }
          }}
        >
          <CurrentStepComponent form={form} />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <p className="hidden md:flex"> Previous</p>
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-[#060622] hover:bg-[#060622]/90 flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#060622] hover:bg-[#060622]/90"
              >
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
