'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface TransitionWrapperProps {
  children: ReactNode;
}

export function TransitionWrapper({ children }: TransitionWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade out the overlay when page loads
    gsap.to('.page-transition-overlay', {
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
      ease: 'power2.out',
    });

    // Immediately make wrapper visible (content inside is still hidden by .animate-hidden-* classes)
    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, { opacity: 1, visibility: 'visible' });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={{ opacity: 0, visibility: 'hidden' }}>
      {children}
    </div>
  );
}
