'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Are you passionate about making a difference? Do you want to test your
          ability to lead by disruption
        </h2>

        <div className="space-y-4 mb-4">
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            If yes, then welcome to the Abia First Leadership Academy.
          </p>
          <p className="text-md text-green-100 mb-8 leading-relaxed">
            Apply now for a chance to be a part of the 1, 000 young Abians to be
            selected for a unique learning and mentorship experience at the 2025
            Abia First Leadership Academy. Interested applicants are expected to
            be high performing students of government-recognized senior
            secondary schools and institutions of higher learning. Recent
            secondary school graduates awaiting admission into higher
            institutions can also apply. The Academy is open to both male and
            female applicants between the ages of 16 and 20. Application portal
            will be open till 6th August 2025.
          </p>
          <p className="text-md text-green-100 mb-8 leading-relaxed">
            The Abia First Leadership Academy is an initiative of the Governor
            Alex Otti administration to prepare young Abians for the demands of
            leadership in a fast-changing world. Parents, teachers and heads of
            institutions are invited to encourage their children, wards and
            students to register for a chance to be selected for this
            life-changing opportunity.
          </p>
          <p className="text-md text-green-100 mb-8 leading-relaxed">
            Registration and training costs would be borne entirely by the Abia
            State Government.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/user/register">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 text-lg"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 text-lg bg-transparent"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
