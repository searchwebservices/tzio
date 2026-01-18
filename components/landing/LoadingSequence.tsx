'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Hold for a moment
    tl.to({}, { duration: 0.9 });

    // Fade out the entire splash screen
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, #8B7355 0%, #A68B5B 25%, #C4A46D 50%, #D4B896 75%, #E8D4B8 100%)',
      }}
    >
      {/* Subtle warm overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(80, 60, 40, 0.3) 100%)',
        }}
      />

      {/* Logo container - LARGER */}
      <div 
        ref={logoRef}
        className="relative"
        style={{
          width: '450px',
          height: '300px',
          opacity: 0,
        }}
      >
        <Image
          src="/assets/tzio-logo.png"
          alt="TZIO"
          fill
          priority
          className="object-contain"
          style={{
            filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.3))',
          }}
        />
      </div>

      {/* Subtle tagline */}
      <p 
        className="absolute bottom-[15%] font-sign text-white/90 text-base tracking-[0.4em] uppercase"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}
      >
        Mexican Triple Sec
      </p>
    </div>
  );
}
