import { z } from 'zod';

const currentDate = new Date(); // Current date: July 24, 2025
const minDate = new Date(currentDate);
minDate.setFullYear(currentDate.getFullYear() - 20); // 2005
const maxDate = new Date(currentDate);
maxDate.setFullYear(currentDate.getFullYear() - 16);
export const personalInfoSchema = z.object({
  profilePicture: z.string().min(1, 'Profile picture is required'),
  title: z.string().min(1, 'Title is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  maritalStatus: z.string().min(1, 'Marital status is required'),
  emailAddress: z.email().min(1, 'Email address is required'),

  lgaOfOrigin: z.string().min(1, 'LGA of origin is required'),
  town: z.string().min(1, 'Town is required'),
  lgaOfResidence: z.string().min(1, 'LGA of residence is required'),
  townOfResidence: z.string().min(1, 'Town of residence is required'),
  residentialAddress: z.string().min(1, 'Residential address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  alternatePhoneNumber: z.string().optional(),
});

export const identificationInfoSchema = z.object({
  nationalIdNumber: z
    .string()
    .min(11, 'National ID must be 11 digits')
    .max(11, 'National ID must be 11 digits'),
  abiaStateIdNumber: z.string().optional(),
});

export const medicalInfoSchema = z.object({
  bloodType: z.string().min(1, 'Blood type is required'),
  bloodGroup: z.string().min(1, 'Blood group is required'),
  hasMedicalCondition: z.boolean(),
  medicalConditionDetails: z.string().optional(),
});

export const sponsorInfoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  gender: z.string().min(1, 'Gender is required'),
  designation: z.string().min(1, 'Designation is required'),
  mobileNumber: z.string().min(1, 'Mobile number is required'),
  alternateMobileNumber: z.string().optional(),
  residentialAddress: z.string().min(1, 'Residential address is required'),
});

export const registrationSchema = z.object({
  personalInfo: personalInfoSchema,
  identificationInfo: identificationInfoSchema,
  medicalInfo: medicalInfoSchema,
  sponsorInfo: sponsorInfoSchema,
});
