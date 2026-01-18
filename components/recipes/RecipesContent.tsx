'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { usePageTransition } from '@/components/ui/PageTransition';
import { InteractiveCocktail } from './InteractiveCocktail';

// Recipe data
const recipes = [
  {
    id: 'tziosmo',
    name: 'Tziosmo',
    tagline: 'Smoke meets citrus',
    ingredients: [
      '2 oz Ron Maruata Cítricos',
      '1 oz Jugo de Mandarina con...',
      '½ oz TZIO Triple Sec',
      '2 dash Bitter de Toronjil',
      'Humo de Bergamota',
      '¼ oz Jugo de Limón Verde',
    ],
    interactive: true,
  },
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan',
    tagline: 'Elegance in a glass',
    ingredients: ['1.5 oz Vodka', '1 oz TZIO Triple Sec', '0.5 oz Cranberry juice', '0.5 oz Fresh lime juice'],
  },
  {
    id: 'mai-tai',
    name: 'Mai Tai',
    tagline: 'Tropical escape',
    ingredients: ['1.5 oz White rum', '0.75 oz TZIO Triple Sec', '0.5 oz Orgeat', '0.75 oz Fresh lime juice'],
  },
  {
    id: 'sidecar',
    name: 'Sidecar',
    tagline: 'Prohibition era classic',
    ingredients: ['2 oz Cognac', '1 oz TZIO Triple Sec', '0.75 oz Fresh lemon juice', 'Sugar rim'],
  },
  {
    id: 'white-lady',
    name: 'White Lady',
    tagline: 'Sophisticated simplicity',
    ingredients: ['1.5 oz Gin', '1 oz TZIO Triple Sec', '0.75 oz Fresh lemon juice', 'Egg white (optional)'],
  },
  {
    id: 'long-island',
    name: 'Long Island Iced Tea',
    tagline: 'Deceptively strong',
    ingredients: ['0.5 oz Vodka', '0.5 oz Rum', '0.5 oz Gin', '0.5 oz Tequila', '0.5 oz TZIO Triple Sec', 'Splash of cola'],
  },
];

export function RecipesContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = usePageTransition();

  useEffect(() => {
    // Animate scroll indicator
    gsap.to('.scroll-indicator', {
      x: 10,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="h-screen w-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* BACKGROUND: Blurred market - FIXED */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/assets/market.png"
          alt="Market Background"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div 
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(45, 27, 14, 0.75)',
          }}
        />
      </div>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="relative z-10 flex h-screen">
        
        {/* ============================================ */}
        {/* SECTION 1: HERO - Brand Story Introduction  */}
        {/* ============================================ */}
        <section 
          className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-[4vw] gap-[3vw]"
          style={{ scrollSnapAlign: 'start' }}
        >
          {/* LEFT: Bottle - LARGE */}
          <div 
            className="relative flex-shrink-0"
            style={{
              height: '95vh',
              width: '35vw',
              minWidth: '350px',
              maxWidth: '550px',
            }}
          >
            <Image
              src="/assets/bottle.png"
              alt="TZIO Triple Sec Bottle"
              fill
              priority
              className="object-contain object-center"
              style={{
                filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7))',
              }}
            />
          </div>

          {/* RIGHT: Story Card with DARKER Concrete Texture */}
          <div 
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              width: '55vw',
              minWidth: '500px',
              maxWidth: '850px',
              height: '82vh',
              maxHeight: '750px',
            }}
          >
            {/* Concrete texture background */}
            <div className="absolute inset-0">
              <Image
                src="/assets/textures/concrete.png"
                alt=""
                fill
                className="object-cover"
              />
              
              {/* DARK OVERLAY - Key for readability */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: 'rgba(30, 20, 10, 0.75)',
                }}
              />
              
              {/* Warm tint on top */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(139, 69, 19, 0.1) 0%, rgba(45, 27, 14, 0.2) 100%)',
                }}
              />
            </div>

            {/* Border frame */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                border: '3px solid rgba(245, 130, 31, 0.5)',
                boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.5)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-12 lg:p-16">
              
              {/* Eyebrow - LARGER */}
              <p 
                className="font-sign text-tzio-orange text-base lg:text-lg tracking-[0.3em] mb-4 uppercase"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              >
                Mexican Triple Sec
              </p>

              {/* Main headline - MUCH LARGER */}
              <h1 
                className="font-display text-5xl lg:text-6xl xl:text-7xl text-white mb-2 leading-[1.1]"
                style={{ 
                  textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
                }}
              >
                De Bartenders,
              </h1>
              <h1 
                className="font-display text-5xl lg:text-6xl xl:text-7xl text-tzio-yellow mb-8 leading-[1.1]"
                style={{ 
                  textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
                }}
              >
                Para Bartenders
              </h1>

              {/* Divider line */}
              <div 
                className="w-24 h-1.5 mb-8"
                style={{ backgroundColor: 'rgba(245, 130, 31, 0.8)' }}
              />

              {/* Story copy - LARGER with better line height */}
              <p 
                className="text-white text-lg lg:text-xl xl:text-2xl leading-relaxed mb-10 max-w-[550px]"
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  lineHeight: '1.7',
                }}
              >
                TZIO was born behind the bar, not in a boardroom. We&apos;re bartenders who got tired of triple secs that tasted like sugar water. So we made our own — with real Michoacán oranges, real craft, and real respect for the cocktails we build every night.
              </p>

              {/* CTA */}
              <div className="flex items-center gap-8">
                <button 
                  className="bg-tzio-orange text-white font-sign text-lg lg:text-xl tracking-wider px-10 py-5 hover:bg-tzio-yellow hover:text-mercado-shadow transition-all duration-300"
                  style={{
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.4)',
                  }}
                >
                  EXPLORE RECIPES
                </button>
                
                {/* Scroll hint */}
                <div className="flex items-center gap-3 text-white/70">
                  <span className="font-sign text-base tracking-wider">SCROLL</span>
                  <span className="scroll-indicator text-2xl">→</span>
                </div>
              </div>

            </div>

            {/* Corner accent */}
            <div 
              className="absolute top-0 right-0 w-20 h-20"
              style={{
                background: 'linear-gradient(135deg, transparent 50%, rgba(245, 130, 31, 0.4) 50%)',
              }}
            />
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2+: Recipe Cards                    */}
        {/* ============================================ */}
        {recipes.map((recipe, index) => (
          <section
            key={recipe.id}
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-[5vw]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div 
              className="relative w-full max-w-[1100px] h-[70vh] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(45, 27, 14, 0.85) 0%, rgba(45, 27, 14, 0.95) 100%)',
                border: '2px solid rgba(245, 130, 31, 0.3)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Recipe number */}
              <span 
                className="absolute top-6 right-8 font-sign text-tzio-orange/20 text-[100px] lg:text-[140px] leading-none"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Recipe content */}
              <div className="relative z-10 w-[55%] h-full flex flex-col justify-center p-10 lg:p-16">
                <p className="font-sign text-tzio-yellow text-sm tracking-[0.2em] mb-3">
                  {recipe.tagline.toUpperCase()}
                </p>
                <h2 
                  className="font-display text-4xl lg:text-6xl text-white mb-8"
                  style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
                >
                  {recipe.name}
                </h2>

                {/* Ingredients */}
                <div className="mb-8">
                  <p className="font-sign text-xs tracking-[0.2em] text-white/50 mb-4">INGREDIENTS</p>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-white/90 text-lg flex items-center gap-3">
                        <span className="w-2 h-2 bg-tzio-orange rounded-full flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="self-start bg-tzio-orange text-white font-sign tracking-wider px-8 py-4 hover:bg-tzio-yellow hover:text-mercado-shadow transition-colors">
                  VIEW FULL RECIPE
                </button>
              </div>

              {/* Recipe Image - Interactive or Static */}
              {'interactive' in recipe && recipe.interactive ? (
                <div className="absolute right-0 top-0 w-[50%] h-full flex items-center justify-center overflow-hidden">
                  <InteractiveCocktail className="w-[90%] h-[85%]" />
                </div>
              ) : null}

              {/* Decorative gradient */}
              <div 
                className="absolute bottom-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 100% 100%, rgba(245, 130, 31, 0.3) 0%, transparent 50%)',
                }}
              />
            </div>
          </section>
        ))}

        {/* ============================================ */}
        {/* SECTION FINAL: Submit CTA                   */}
        {/* ============================================ */}
        <section
          className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-[5vw]"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="text-center max-w-lg">
            <p className="font-sign text-tzio-yellow text-xl tracking-widest mb-4">
              GOT A RECIPE?
            </p>
            <h2 
              className="font-display text-5xl lg:text-6xl text-white mb-6"
              style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
            >
              Share Your Creation
            </h2>
            <p className="text-white/70 text-xl mb-8">
              Join the TZIO community and submit your signature cocktail.
            </p>
            <button className="bg-tzio-orange text-white font-sign text-xl tracking-wider px-12 py-5 hover:bg-tzio-yellow hover:text-mercado-shadow transition-colors">
              SUBMIT YOUR RECIPE
            </button>
          </div>
        </section>

      </div>

      {/* Back button - FIXED */}
      <button 
        onClick={() => navigateWithTransition('/')}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
      >
        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
        <span className="font-sign tracking-wider">BACK TO STAND</span>
      </button>

      {/* Page indicator - FIXED */}
      <div className="fixed bottom-8 right-8 z-50">
        <p className="font-sign text-sm tracking-wider text-white/40">
          {recipes.length + 2} SECTIONS
        </p>
      </div>

      {/* Vignette - FIXED */}
      <div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          boxShadow: 'inset 0 0 200px 80px rgba(0, 0, 0, 0.4)',
        }}
      />
    </div>
  );
}
