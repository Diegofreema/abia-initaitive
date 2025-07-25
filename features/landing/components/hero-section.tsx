'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, Target } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
      .fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        statsRef.current ? Array.from(statsRef.current.children) : [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        '-=0.5'
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 hero-gradient overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              ABIA FIRST
              <span className="block text-green-200">LEADERSHIP</span>
              <span className="block">ACADEMY</span>
            </h1>

            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Empowering the next generation of leaders in Abia State through
              comprehensive leadership development, skills training, and
              mentorship programs designed to build confident, capable, and
              visionary young leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/user/register">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 text-lg"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {/* <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 text-lg bg-transparent"
                >
                  Learn More
                </Button>
              </Link> */}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-green-200" />
                </div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-green-200 text-sm">Young Leaders</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-green-200" />
                </div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-green-200 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-8 w-8 text-green-200" />
                </div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-green-200 text-sm">Programs</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative z-10">
              <Image
                src="https://abiastate.gov.ng/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-08.48.41-1.jpeg"
                alt="Young leaders in training"
                width={500}
                height={600}
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
