export interface PersonalInfo {
  profilePicture?: string;
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
}

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
