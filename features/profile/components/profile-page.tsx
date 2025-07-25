'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { LoadingSpinner } from '@/features/shared/components/loading-spinner';
import { cn } from '@/lib/utils';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';
import { format } from 'date-fns';
import {
  CalendarDays,
  FileText,
  Heart,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProfilePage() {
  const registration = useQuery(api.registrations.getCurrentUserRegistration);
  const router = useRouter();
  const { signOut } = useAuthActions();
  if (registration === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (!registration) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Registration Found
              </h2>
              <p className="text-gray-600">
                You haven&apos;t completed your registration yet.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => router.push('/user/register')}>
                Start Registration
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">
            ABIA Youth Leadership Academy Registration
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex sm:items-center justify-between gap-y-2 flex-col sm:flex-row">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={registration.profilePicture || '/placeholder.svg'}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {getInitials(registration.firstName, registration.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {registration.title} {registration.firstName}{' '}
                    {registration.lastName}
                  </h2>
                  <p className="text-gray-600">{registration.emailAddress}</p>
                </div>
              </div>
              <Badge
                className={cn('w-fit', getStatusColor(registration.status))}
              >
                {registration.status.charAt(0).toUpperCase() +
                  registration.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-900">
                    {registration.title} {registration.firstName}{' '}
                    {registration.middleName} {registration.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-gray-900">{registration.gender}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </p>
                  <p className="text-gray-900 flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {format(new Date(registration.dateOfBirth), 'PPP')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Marital Status
                  </p>
                  <p className="text-gray-900">{registration.maritalStatus}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email Address
                </p>
                <p className="text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {registration.emailAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {registration.phoneNumber}
                  </p>
                </div>
                {registration.alternatePhoneNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Alternate Phone
                    </p>
                    <p className="text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {registration.alternatePhoneNumber}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  State of Origin
                </p>
                <p className="text-gray-900">{'Abia'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    LGA of Origin
                  </p>
                  <p className="text-gray-900">{registration.lgaOfOrigin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Town</p>
                  <p className="text-gray-900">{registration.town}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    LGA of Residence
                  </p>
                  <p className="text-gray-900">{registration.lgaOfResidence}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Town of Residence
                  </p>
                  <p className="text-gray-900">
                    {registration.townOfResidence}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Residential Address
                </p>
                <p className="text-gray-900">
                  {registration.residentialAddress}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Identification Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Identification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  National ID Number (NIN)
                </p>
                <p className="text-gray-900 font-mono">
                  {registration.nationalIdNumber}
                </p>
              </div>
              {registration.abiaStateIdNumber && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Abia State ID Number (ABSINN)
                  </p>
                  <p className="text-gray-900 font-mono">
                    {registration.abiaStateIdNumber}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Medical Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Blood Type
                  </p>
                  <p className="text-gray-900">{registration.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Blood Group
                  </p>
                  <p className="text-gray-900">{registration.bloodGroup}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Medical Condition
                </p>
                <p className="text-gray-900">
                  {registration.hasMedicalCondition ? 'Yes' : 'No'}
                </p>
                {registration.hasMedicalCondition &&
                  registration.medicalConditionDetails && (
                    <p className="text-gray-600 text-sm mt-1">
                      {registration.medicalConditionDetails}
                    </p>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Sponsor Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Sponsor Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-900">
                    {registration.sponsorTitle} {registration.sponsorFirstName}{' '}
                    {registration.sponsorMiddleName}{' '}
                    {registration.sponsorLastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-gray-900">{registration.sponsorGender}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Mobile Number
                  </p>
                  <p className="text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {registration.sponsorMobileNumber}
                  </p>
                </div>
                {registration.sponsorAlternateMobileNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Alternate Mobile
                    </p>
                    <p className="text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {registration.sponsorAlternateMobileNumber}
                    </p>
                  </div>
                )}
                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-sm font-medium text-gray-500">
                    Residential Address
                  </p>
                  <p className="text-gray-900">
                    {registration.sponsorResidentialAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submission Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-500">
              <p>
                Registration submitted on{' '}
                {format(new Date(registration._creationTime), 'PPP')}
              </p>
              {registration.reviewedAt && (
                <p>
                  Reviewed on {format(new Date(registration.reviewedAt), 'PPP')}
                </p>
              )}
              {registration.reviewNotes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Review Notes:</p>
                  <p className="text-gray-600">{registration.reviewNotes}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <div className="flex justify-center space-x-4">
              <Button
                variant={'default'}
                className="w-[200px]"
                onClick={() => router.push('/')}
              >
                Home
              </Button>
              <Button
                variant={'destructive'}
                className="w-[200px]"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
