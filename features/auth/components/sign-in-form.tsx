'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthActions } from '@convex-dev/auth/react';

import { IconBrandGoogle } from '@tabler/icons-react';

export function SignInForm() {
  const { signIn } = useAuthActions();
  //   const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    void signIn('google', {
      redirectTo: '/user/profile',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your ABIA Youth Leadership Academy account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
            <IconBrandGoogle className="mr-2 h-4 w-4" />
            {'Continue with Google'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
