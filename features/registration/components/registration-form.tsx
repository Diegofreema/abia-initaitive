'use client';

import { api } from '@/convex/_generated/api';
import { LoadingSpinner } from '@/features/shared/components/loading-spinner';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RegistrationComponent } from './registration-component';

export function RegistrationForm() {
  const user = useQuery(api.users.getCurrentUser);

  const router = useRouter();
  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (user === null) {
      router.replace('/auth/signin');
      return;
    }

    if (user.isRegistered) {
      router.replace('/user/profile');
    }
  }, [user, router]);

  if (user === undefined) {
    return <LoadingSpinner />;
  }

  if (user === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ABIA Youth Leadership Academy Registration
          </h1>
          <p className="text-gray-600">
            Complete your application to join our leadership program
          </p>
        </div>
        <RegistrationComponent user={user} />
      </div>
    </div>
  );
}
