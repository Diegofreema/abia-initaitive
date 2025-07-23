'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({
  className,
  lines = 3,
}: LoadingSkeletonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const skeletonLines =
        containerRef.current.querySelectorAll('.skeleton-line');

      gsap.to(skeletonLines, {
        opacity: 0.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'power2.inOut',
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'skeleton-line h-4 bg-gray-200 rounded',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}
