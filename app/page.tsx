'use client';

import { useState, useCallback } from 'react';
import { MarketStand } from '@/components/landing/MarketStand';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { LoadingSequence } from '@/components/landing/LoadingSequence';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay to ensure smooth transition, then trigger animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <>
      {showSplash && (
        <LoadingSequence onComplete={handleLoadingComplete} />
      )}
      <TransitionWrapper>
        <main>
          <MarketStand animateIn={isLoaded} />
        </main>
      </TransitionWrapper>
    </>
  );
}
