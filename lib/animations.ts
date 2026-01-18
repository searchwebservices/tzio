import gsap from 'gsap';

// Easing presets matching our CSS variables
export const easings = {
  outExpo: 'power4.out',
  inOutQuart: 'power2.inOut',
  elastic: 'elastic.out(1, 0.5)',
};

// Standard durations
export const durations = {
  micro: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  dramatic: 1.2,
};

// Reusable animation configs
export const fadeInUp = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0, duration: durations.slow, ease: easings.outExpo },
};

export const scaleIn = {
  from: { opacity: 0, scale: 0.9 },
  to: { opacity: 1, scale: 1, duration: durations.normal, ease: easings.outExpo },
};

// Object spotlight animation (zoom + focus)
export function createSpotlightTimeline(
  element: HTMLElement,
  overlay: HTMLElement,
  options?: { scale?: number; duration?: number }
) {
  const { scale = 1.5, duration = 0.6 } = options || {};
  
  const tl = gsap.timeline({ paused: true });
  
  tl.to(overlay, {
    opacity: 1,
    duration: duration * 0.5,
    ease: easings.outExpo,
  })
  .to(element, {
    scale,
    zIndex: 100,
    duration,
    ease: easings.outExpo,
  }, 0)
  .to('.interactive-object:not(.active)', {
    opacity: 0.3,
    filter: 'blur(2px)',
    duration: duration * 0.5,
  }, 0);
  
  return tl;
}
