'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Home, ArrowLeft, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate container
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Animate 404 number with a bounce effect
    tl.fromTo(
      numberRef.current,
      { scale: 0, rotation: -10 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Animate illustration
    tl.fromTo(
      illustrationRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Add floating animation to illustration
    gsap.to(illustrationRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    // Add subtle rotation to the search icon
    gsap.to('.search-icon', {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div ref={containerRef} className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* 404 Number */}
            <div ref={numberRef} className="mb-6">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">
                404
              </h1>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off.
              Don&apos;t worry, even the best explorers sometimes take a wrong
              turn.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Link href="/about">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    About Us
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Register
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div ref={illustrationRef} className="relative">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                {/* Search Illustration */}
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <div className="search-icon">
                    <Search className="w-16 h-16 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Lost in the Academy?
                </h3>
                <p className="text-gray-600 mb-6">
                  Let us help you find your way back to developing your
                  leadership potential.
                </p>

                {/* Mini Navigation */}
                <div className="space-y-3">
                  <Link href="/" className="block">
                    <div className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <Home className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">Homepage</span>
                    </div>
                  </Link>
                  <Link href="/register" className="block">
                    <div className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">Registration</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 rounded-full opacity-30 blur-2xl -z-10"></div>
          </div>
        </div>

        {/* Bottom Help Text */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still can&#39;t find what you&#39;re looking for?{' '}
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
