'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useAuthActions } from '@convex-dev/auth/react';
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthActions();
  const user = useCurrentUser();

  useEffect(() => {
    gsap.fromTo(
      '.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AY</span>
            </div>
            <span className="font-bold text-xl text-gray-900">AYLA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/programs"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>

            <AuthLoading>
              <div className="flex space-x-2">
                <Skeleton className="h-5 w-[60px] rounded-full" />
                <Skeleton className="h-5 w-[60px] rounded-full" />
              </div>
            </AuthLoading>
            <Authenticated>
              <div className="space-x-2 flex">
                <Link href="/user/profile" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Profile
                  </Button>
                </Link>
                {user && user?.isAdmin && (
                  <Link href="/admin/dashboard" className="block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  Sign Out
                </Button>
              </div>
            </Authenticated>
            <Unauthenticated>
              <div className="space-x-2 flex">
                <Link href="/auth/signin" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/user/register" className="block">
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </Unauthenticated>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
              >
                About
              </Link>
              <Link
                href="/programs"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
              >
                Programs
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
              >
                Contact
              </Link>

              <div className="pt-4 border-t">
                <AuthLoading>
                  <div className="flex space-x-2">
                    <Skeleton className="h-5 w-[60px] rounded-full" />
                    <Skeleton className="h-5 w-[60px] rounded-full" />
                  </div>
                </AuthLoading>
                <Authenticated>
                  <div className="space-y-2">
                    <Link href="/user/profile" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                      >
                        Profile
                      </Button>
                    </Link>
                    {user && user?.isAdmin && (
                      <Link href="/admin" className="block">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                        >
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Sign Out
                    </Button>
                  </div>
                </Authenticated>
                <Unauthenticated>
                  <div className="space-y-2">
                    <Link href="/auth/signin" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/user/register" className="block">
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                </Unauthenticated>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
