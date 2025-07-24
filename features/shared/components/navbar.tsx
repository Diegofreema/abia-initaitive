'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useAuthActions } from '@convex-dev/auth/react';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthActions();
  const user = useCurrentUser();
  const isLoading = user === undefined;
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

            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link href="/user/profile">
                      <Button variant="outline" size="sm">
                        Profile
                      </Button>
                    </Link>
                    {user.isAdmin && (
                      <Link href="/admin">
                        <Button variant="outline" size="sm">
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button onClick={handleSignOut} variant="outline" size="sm">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/auth/signin">
                      <Button variant="outline" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/user/register">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
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

              {!isLoading && (
                <div className="pt-4 border-t">
                  {user ? (
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
                      {user.isAdmin && (
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
                  ) : (
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
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
