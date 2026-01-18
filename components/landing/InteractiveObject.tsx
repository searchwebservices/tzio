'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface InteractiveObjectProps {
  id: string;
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  noShadow?: boolean;
}

export function InteractiveObject({
  id,
  src,
  alt,
  className = '',
  style = {},
  priority = false,
  noShadow = false,
}: InteractiveObjectProps) {
  const objectRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (objectRef.current) {
      gsap.to(objectRef.current, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (objectRef.current) {
      gsap.to(objectRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const getFilter = () => {
    if (noShadow) {
      return isHovered ? 'drop-shadow(0 0 30px rgba(245, 130, 31, 0.7))' : 'none';
    }
    return isHovered 
      ? 'drop-shadow(0 0 30px rgba(245, 130, 31, 0.7))' 
      : 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4))';
  };

  return (
    <div
      ref={objectRef}
      data-object-id={id}
      className={`cursor-pointer ${className}`}
      style={{
        ...style,
        filter: getFilter(),
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
}
