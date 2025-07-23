'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, BookOpen, Target, Award, Lightbulb, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.feature-card');

    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Leadership Development',
      description:
        'Comprehensive training in leadership principles, team management, and decision-making skills.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: BookOpen,
      title: 'Skills Training',
      description:
        'Practical workshops on communication, project management, and professional development.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description:
        'Learn to set SMART goals, create action plans, and track progress towards achieving objectives.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Award,
      title: 'Recognition',
      description:
        'Earn certificates and recognition for your achievements and contributions to the community.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'Develop creative thinking skills and learn to identify and solve community challenges.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description:
        'Engage in meaningful community service projects that create positive social change.',
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You&apos;ll Learn
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive program covers all aspects of leadership
            development, from personal growth to community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
