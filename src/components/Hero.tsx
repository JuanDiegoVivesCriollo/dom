'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle, Truck, Sparkles, Facebook } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/img/personastransportandocosas.webp',
    title: 'Professional Transsport',
    subtitle: '& Logistics Solutions',
    description: 'Specialist transport, courier and logistics services with our dedicated fleet across Birmingham, the West Midlands and UK-wide.',
    icon: Truck,
    accent: 'Transsport',
  },
  {
    id: 2,
    image: '/img/Personaslimpiando1%20(1).webp',
    title: 'Office & Commercial',
    subtitle: 'Cleaning Services',
    description: 'Professional office cleaning with industrial equipment. Carpets, desks, and workspaces left spotless by our uniformed teams.',
    icon: Sparkles,
    accent: 'Cleaning',
  },
  {
    id: 3,
    image: '/img/Personaslimpiando2.webp',
    title: 'Deep Cleaning',
    subtitle: '& Property Support',
    description: 'End of tenancy, post-construction and commercial deep cleaning for landlords, estate agents and property managers.',
    icon: Sparkles,
    accent: 'Property',
  },
];

// Preload all images on mount
function usePreloadImages() {
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);

  usePreloadImages();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Touch/swipe handlers (lightweight, no framer drag)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const current = slides[currentSlide];
  const IconComponent = current.icon;

  return (
    <section
      className="relative h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images — simple crossfade, no scale/translate */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 1 : 0,
            willChange: index === currentSlide ? 'opacity' : 'auto',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
              willChange: 'auto',
            }}
          />
          {/* Single combined overlay — fewer layers = less compositing */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 via-[#0a192f]/75 to-[#0a192f]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-transparent to-[#0a192f]/20" />
        </div>
      ))}

      {/* Main Content — stays in place, only text crossfades */}
      <div className="relative z-20 h-full flex items-start md:items-center">
        <div className="container-custom w-full pt-20 md:pt-0 md:py-0">
          <div className="max-w-3xl">
            {/* Service Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30">
                  <IconComponent className="w-4 h-4" />
                  {current.accent}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="mb-6"
              >
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.4)',
                  }}
                >
                  {current.title}
                </h1>
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl font-bold mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #c9a227, #e6c94d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {current.subtitle}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="hidden md:block text-base md:text-lg text-white/80 mb-3 max-w-xl leading-relaxed"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>

            {/* Target Audience */}
            <p className="text-sm md:text-base text-[var(--accent)]/80 font-medium mb-6 max-w-xl">
              For landlords, estate agents, logistics networks, construction companies and private clients.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                  boxShadow: '0 8px 30px rgba(245, 158, 11, 0.35)',
                }}
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/447424399563?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(37, 211, 102, 0.15)',
                  color: '#25D366',
                  border: '2px solid rgba(37, 211, 102, 0.4)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587553721435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(24, 119, 242, 0.15)',
                  color: '#1877F2',
                  border: '2px solid rgba(24, 119, 242, 0.4)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-white/70">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                07424 399563
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="text-sm">Birmingham, West Midlands — UK Wide</span>
            </div>

            {/* Slogan */}
            <div className="mt-4">
              <span className="text-xs md:text-sm font-medium tracking-widest text-[var(--accent)] uppercase opacity-90 leading-relaxed block">
                Driven by Reliability. Operated with Method. Moving with Purpose.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-8 bg-[var(--accent)]'
                : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
