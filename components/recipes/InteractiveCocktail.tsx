'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

type CocktailState = 'fresh' | 'spilling' | 'spilled';

interface InteractiveCocktailProps {
  className?: string;
}

export function InteractiveCocktail({ className = '' }: InteractiveCocktailProps) {
  const [state, setState] = useState<CocktailState>('fresh');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const freshRef = useRef<HTMLDivElement>(null);
  const spillingRef = useRef<HTMLDivElement>(null);
  const spilledRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSpill = useCallback(() => {
    if (isAnimating || state !== 'fresh') return;
    
    setIsAnimating(true);
    setHoverProgress(0);
    
    // Fade out fresh, fade in spilling
    gsap.to(freshRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    });
    
    gsap.fromTo(spillingRef.current, 
      { opacity: 0, scale: 1.05 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.3,
        delay: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          setState('spilling');
          
          // Then transition to fully spilled
          setTimeout(() => {
            gsap.to(spillingRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            });
            
            gsap.fromTo(spilledRef.current,
              { opacity: 0, y: -20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                  setState('spilled');
                  setIsAnimating(false);
                },
              }
            );
          }, 400);
        },
      }
    );
  }, [isAnimating, state]);

  const triggerReset = useCallback(() => {
    if (isAnimating || state !== 'spilled') return;
    
    setIsAnimating(true);
    
    // Swipe the spilled glass off
    gsap.to(spilledRef.current, {
      x: 300,
      opacity: 0,
      rotation: 15,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        // Reset spilled position
        gsap.set(spilledRef.current, { x: 0, rotation: 0 });
        
        // Drop in fresh cocktail from above
        gsap.set(freshRef.current, { y: -100, opacity: 0, scale: 1 });
        
        gsap.to(freshRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'bounce.out',
          onComplete: () => {
            setState('fresh');
            setIsAnimating(false);
          },
        });
      },
    });
  }, [isAnimating, state]);

  // Handle hover timer for auto-spill
  useEffect(() => {
    if (isHovered && state === 'fresh' && !isAnimating) {
      // Start progress animation
      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 3000, 1);
        setHoverProgress(progress);
      }, 50);

      // Set timer for 3 seconds
      hoverTimerRef.current = setTimeout(() => {
        triggerSpill();
      }, 3000);
    } else {
      // Clear timers if not hovering or not fresh
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (!isAnimating) {
        setHoverProgress(0);
      }
    }

    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovered, state, isAnimating, triggerSpill]);

  const handleClick = () => {
    if (isAnimating) return;

    if (state === 'fresh') {
      triggerSpill();
    } else if (state === 'spilled') {
      triggerReset();
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isAnimating ? 'wait' : 'pointer' }}
    >
      {/* Fresh cocktail (upright) */}
      <div 
        ref={freshRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: state === 'fresh' ? 1 : 0 }}
      >
        <div className="relative w-[80%] h-[80%]">
          <Image
            src="/assets/tziosmo.png"
            alt="Tziosmo Cocktail"
            fill
            className="object-contain"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))' }}
          />
        </div>
      </div>

      {/* Spilling cocktail (tipping) */}
      <div 
        ref={spillingRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="relative w-[90%] h-[90%]">
          <Image
            src="/assets/tziosmospill.png"
            alt="Tziosmo Spilling"
            fill
            className="object-contain"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))' }}
          />
        </div>
      </div>

      {/* Spilled cocktail (on ground) */}
      <div 
        ref={spilledRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="relative w-[95%] h-[95%]">
          <Image
            src="/assets/tziosmospilled.png"
            alt="Tziosmo Spilled"
            fill
            className="object-contain"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))' }}
          />
        </div>
      </div>

      {/* Hover progress indicator (only shows when fresh and hovering) */}
      {state === 'fresh' && hoverProgress > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%]">
          <div 
            className="h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <div 
              className="h-full bg-tzio-orange rounded-full transition-all duration-100"
              style={{ width: `${hoverProgress * 100}%` }}
            />
          </div>
          <p className="text-center text-white/50 font-sign text-xs mt-2 tracking-wider">
            {hoverProgress < 1 ? 'HOLD TO SPILL...' : 'SPILLING!'}
          </p>
        </div>
      )}
      
      {/* Hint text */}
      <div 
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-300"
        style={{ opacity: isAnimating || hoverProgress > 0 ? 0 : 0.7 }}
      >
        <span className="font-sign text-xs tracking-wider text-white/70">
          {state === 'spilled' ? 'CLICK TO RESET' : 'HOVER OR CLICK'}
        </span>
      </div>
    </div>
  );
}
