'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface ParallaxLayerProps {
  children: ReactNode;
  depth: number; // 0 = no movement, 1 = max movement
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({ 
  children, 
  depth, 
  className = '',
  style = {}
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate offset from center (-0.5 to 0.5)
      const xOffset = (clientX / innerWidth - 0.5) * 2;
      const yOffset = (clientY / innerHeight - 0.5) * 2;
      
      // Apply movement based on depth (max 30px movement)
      const moveX = xOffset * depth * 30;
      const moveY = yOffset * depth * 15;

      gsap.to(layer, {
        x: moveX,
        y: moveY,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [depth]);

  return (
    <div 
      ref={layerRef} 
      className={`absolute inset-0 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
