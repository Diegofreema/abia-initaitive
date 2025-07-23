'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    // Animate logo with a gentle pulse
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    // Animate loading dots
    const tl = gsap.timeline({ repeat: -1 });

    dotsRef.current.forEach((dot, index) => {
      tl.to(
        dot,
        {
          y: -20,
          duration: 0.4,
          ease: 'power2.out',
        },
        index * 0.1
      ).to(
        dot,
        {
          y: 0,
          duration: 0.4,
          ease: 'power2.in',
        },
        index * 0.1 + 0.4
      );
    });

    // Animate progress bar
    gsap.to('.progress-bar', {
      width: '100%',
      duration: 2,
      repeat: -1,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div ref={containerRef} className="text-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">AY</span>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ABIA Youth Leadership Academy
        </h2>
        <p className="text-gray-600 mb-8">Loading your experience...</p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) dotsRef.current[index] = el;
              }}
              className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="progress-bar h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-0"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      </div>
    </div>
  );
}
