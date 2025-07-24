export type PersonalInfo = {
  profilePicture: string;
  title: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  emailAddress: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  town: string;
  lgaOfResidence: string;
  townOfResidence: string;
  residentialAddress: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
};

export interface IdentificationInfo {
  nationalIdNumber: string;
  abiaStateIdNumber?: string;
}

export interface MedicalInfo {
  bloodType: string;
  bloodGroup: string;
  hasMedicalCondition: boolean;
  medicalConditionDetails?: string;
}

export interface SponsorInfo {
  title: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: string;
  designation: string;
  mobileNumber: string;
  alternateMobileNumber?: string;
  residentialAddress: string;
}

export interface RegistrationData {
  personalInfo: PersonalInfo;
  identificationInfo: IdentificationInfo;
  medicalInfo: MedicalInfo;
  sponsorInfo: SponsorInfo;
}

export type RegistrationStep =
  | 'personal'
  | 'identification'
  | 'medical'
  | 'sponsor';

import { UseFormReturn } from 'react-hook-form';
// import { CreateEmailResponseSuccess, ErrorResponse } from 'resend';

export interface RegistrationFormData {
  // ID Section
  nin: string;
  absin?: string;

  // Bio Section
  title: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  town: string;
  lgaOfResidence: string;
  townOfResidence: string;
  residentialAddress: string;
  email: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  profilePicture?: File | string;
  // Medical Section
  bloodType: string;
  bloodGroup: string;
  hasMedicalCondition: boolean;
  medicalConditions?: string[];

  // Next of Kin Section
  nokTitle: string;
  nokLastName: string;
  nokFirstName: string;
  nokMiddleName?: string;
  nokGender: string;
  nokRelationship: string;
  nokMobileNumber: string;
  nokAlternateMobileNumber?: string;
  nokResidentialAddress: string;
}
export type Status = 'pending' | 'approved' | 'rejected';
export const MEDICAL_CONDITIONS = [
  'Visual Impairment',
  'Hearing Impairment',
  'Physical Disability',
  'Learning Disability',
  'Mental Health Condition',
  'Chronic Illness',
  'Other',
];

export const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

export const courses = [
  'Fullstack Web Development (Javascript)',
  'FullStack Web Development (Python)',
  'Mobile app development (React native)',
  'Product management & UI/UX',
  'Digital Arts & Animation',
  'AI & Prompt Engineering',
  'Data Engineering',
  'CyberSecurity',
  '3D Animation and Game Development with Blender and Godot 4',
  'Machine Learning and AI with Python',
];

export const requiredFields: (keyof RegistrationFormData)[] = [
  'nin',
  'title',
  'lastName',
  'firstName',
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
  'bloodType',
  'bloodGroup',
  'nokTitle',
  'nokLastName',
  'nokFirstName',
  'nokGender',
  'nokRelationship',
  'nokMobileNumber',
  'nokResidentialAddress',
];

export type StepProps = {
  form: UseFormReturn<RegistrationFormData>;
  isEdit?: boolean;
};

// export type ApiResponse = {
//   message: string;
//   error?: ErrorResponse | unknown;
//   data?: CreateEmailResponseSuccess;
// };

export const local = [
  'Aba North',
  'Aba South',
  'Arochukwu',
  'Bende',
  'Ikwuano',
  'Isiala Ngwa North',
  'Isiala Ngwa South',
  'Isuikwuato',
  'Obi Ngwa',
  'Ohafia',
  'Osisioma Ngwa',
  'Ugwunagbo',
  'Ukwa East',
  'Ukwa West',
  'Umuahia North',
  'Umuahia South',
  'Umu-Nneochi',
  'Others',
];
