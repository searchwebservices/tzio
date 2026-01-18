'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface TransitionContextType {
  navigateWithTransition: (href: string, options?: { delay?: number }) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
}

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateWithTransition = useCallback((href: string, options?: { delay?: number }) => {
    const delay = options?.delay ?? 0;
    
    setIsTransitioning(true);

    // Animate overlay in
    gsap.to('.page-transition-overlay', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // Navigate after overlay is fully visible
        setTimeout(() => {
          router.push(href);
        }, delay);
      },
    });
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      
      {/* Transition Overlay */}
      <div 
        className="page-transition-overlay fixed inset-0 z-[9999] pointer-events-none"
        style={{
          backgroundColor: 'rgba(45, 27, 14, 1)',
          opacity: 0,
        }}
      />
    </TransitionContext.Provider>
  );
}
