'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { initLenis } from '@/lib/lenis';
import { InteractiveObject } from './InteractiveObject';
import { usePageTransition } from '@/components/ui/PageTransition';

interface MarketStandProps {
  animateIn?: boolean;
}

export function MarketStand({ animateIn = false }: MarketStandProps) {
  const { navigateWithTransition } = usePageTransition();
  
  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const standContainerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const boomboxRef = useRef<HTMLDivElement>(null);
  const tzioBannerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);

  // Entrance animation - only when animateIn becomes true
  useEffect(() => {
    if (!animateIn || hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // Stand slides up from bottom (starts off-screen via inline style)
    tl.to(standContainerRef.current, {
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Staggered entrance for interactive objects (start hidden via inline style)
    tl.to(bottleRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, '-=0.2');

    tl.to(boomboxRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, '-=0.35');

    tl.to(tzioBannerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, '-=0.35');

    // CTA hint fades in last
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, [animateIn]);

  // Navigation handlers with smooth transition
  const handleObjectClick = (objectId: string) => {
    switch (objectId) {
      case 'bottle':
        navigateWithTransition('/recipes');
        break;
      case 'boombox':
        navigateWithTransition('/music');
        break;
      case 'oranges':
        navigateWithTransition('/process');
        break;
      default:
        break;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      
      {/* LAYER 0: Market Background - FIXED, fills viewport */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/market.png"
          alt="Mexican Market Background"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Warm overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(254,243,226,0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* LAYER 1: Stand with Osvaldo + Interactive Objects Container */}
      {/* Initial state: translateY(100vh) - off screen at bottom */}
      <div 
        ref={standContainerRef}
        className="absolute z-10 flex items-end justify-center"
        style={{
          inset: 0,
          paddingBottom: '-10vh',
          transform: 'translateY(100vh)', // Start off-screen
        }}
      >
        {/* Aspect-ratio locked container - matches stand image proportions */}
        <div
          className="relative"
          style={{
            aspectRatio: '1 / 1',
            height: '150vh',
            maxHeight: '150vh',
            maxWidth: '150vw',
            marginBottom: '-32vh',
            marginLeft: '5vw',
          }}
        >
          {/* Stand Image - fills container exactly */}
          <Image
            src="/assets/stand.png"
            alt="TZIO Orange Stand with Osvaldo"
            fill
            priority
            className="object-contain select-none"
            style={{
              filter: 'drop-shadow(0 20px 60px rgba(45, 27, 14, 0.5))',
            }}
            draggable={false}
          />
          
          {/* TZIO Banner - positioned relative to stand */}
          {/* Initial state: opacity 0, scale 0.8 */}
          <div 
            ref={tzioBannerRef}
            className="absolute z-20"
            style={{ 
              top: '54%', 
              left: '48%', 
              width: '61%', 
              height: '19%',
              transform: 'translateX(-50%) perspective(800px) rotateY(-15deg) rotate(2deg) scale(0.8)',
              transformOrigin: 'center center',
              opacity: 0, // Start hidden
            }}
          >
            <InteractiveObject
              id="tzio-banner"
              src="/assets/tzio.png"
              alt="TZIO Banner - Home"
              style={{
                width: '100%',
                height: '100%',
              }}
              priority
              noShadow
            />
          </div>
          
          {/* Bottle - CLICKABLE - positioned relative to stand */}
          {/* Initial state: opacity 0, scale 0.8 */}
          <div 
            ref={bottleRef}
            className="absolute cursor-pointer z-30" 
            style={{ 
              left: '57%', 
              bottom: '43%', 
              width: '11%', 
              height: '19%',
              opacity: 0, // Start hidden
              transform: 'scale(0.8)',
            }}
            onClick={() => handleObjectClick('bottle')}
          >
            <InteractiveObject
              id="bottle"
              src="/assets/bottle.png"
              alt="TZIO Bottle - Recipes"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>

          {/* Boombox - CLICKABLE - positioned relative to stand */}
          {/* Initial state: opacity 0, scale 0.8 */}
          <div 
            ref={boomboxRef}
            className="absolute cursor-pointer z-20" 
            style={{ 
              right: '5%', 
              bottom: '12%', 
              width: '36%', 
              height: '36%',
              opacity: 0, // Start hidden
              transform: 'scale(0.8)',
            }}
            onClick={() => handleObjectClick('boombox')}
          >
            <InteractiveObject
              id="boombox"
              src="/assets/boombox.png"
              alt="Boombox - Music & Happenings"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* LAYER UI: CTA hint */}
      {/* Initial state: opacity 0, y 20 */}
      <div 
        ref={ctaRef}
        className="absolute left-1/2 -translate-x-1/2 text-center z-50"
        style={{ 
          bottom: '2%',
          opacity: 0, // Start hidden
          transform: 'translateX(-50%) translateY(20px)',
        }}
      >
        <p className="font-sign text-sm tracking-widest text-white/70 uppercase drop-shadow-lg">
          Click an object to explore
        </p>
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          boxShadow: 'inset 0 0 200px 50px rgba(45, 27, 14, 0.3)',
        }}
      />
    </div>
  );
}
