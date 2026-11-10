'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Phone, Pause, Play } from 'lucide-react';
import '../styles/hero.css';

const slides = [
  { label: 'Transport & courier', image: '/img/transport-logistics-hero.webp', alt: 'DOM Transsport branded delivery vans at a logistics depot', detail: 'Same-day deliveries. Planned routes. Nationwide transport.', href: '/transport-services/' },
  { label: 'Commercial cleaning', image: '/img/Personaslimpiando1%20(1).webp', alt: 'Commercial cleaning team working in an office', detail: 'Office and commercial cleaning across the West Midlands.', href: '/cleaning-services/' },
  { label: 'Property care', image: '/img/Personaslimpiando2.webp', alt: 'Professional property cleaning team', detail: 'End of tenancy, deep cleaning and property preparation.', href: '/cleaning-services/#cleaning' },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReducedMotion(query.matches); setPlaying(!query.matches); };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!playing || interacting || reducedMotion) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setActive(value => (value + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(interval);
  }, [playing, interacting, reducedMotion]);
  const select = (index: number) => { setActive(index); setPlaying(false); };
  return (
    <section className="dom-hero" aria-label="Transport and cleaning services" aria-roledescription="carousel"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
      onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={event => { if (touchStart.current === null) return; const delta = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(delta) > 50) select((active + (delta > 0 ? 1 : 2)) % 3); touchStart.current = null; }}>
      <div className="dom-hero__photos" aria-hidden="true">
        {slides.map((slide, index) => (
          <img key={slide.image} src={slide.image} alt="" width={index === 0 ? 1672 : undefined} height={index === 0 ? 941 : undefined}
            className={`dom-hero__photo ${index === active ? 'is-active' : ''}`} fetchPriority={index === 0 ? 'high' : 'low'} decoding={index === 0 ? 'sync' : 'async'} />
        ))}
      </div>
      <div className="dom-hero__shade" />
      <div className="container-custom dom-hero__inner">
        <div className="dom-hero__topline"><span>Based in Birmingham</span><span>Serving the West Midlands & UK</span></div>
        <div className="dom-hero__copy">
          <p className="dom-hero__eyebrow"><span /> Transport. Property. People.</p>
          <h1>Courier, Removals<br />& Cleaning <span>in Birmingham.</span></h1>
          <p className="dom-hero__intro">Same-day courier deliveries, home and office moves, and professional property cleaning. Local teams. UK-wide transport.</p>
          <div className="dom-hero__actions">
            <a className="dom-hero__quote" href="/contact/">Get a free quote <ArrowUpRight size={21} /></a>
            <a className="dom-hero__call" href="tel:+447424399563"><Phone size={17} />07424 399563</a>
          </div>
          <div className="dom-hero__standards"><span>Fully insured</span><span>DBS-checked teams</span><a href="https://wa.me/447424399563" target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="dom-hero__caption" aria-live={playing ? 'off' : 'polite'}>
          <span>{String(active + 1).padStart(2, '0')} / 03</span>
          <a href={slides[active].href}>{slides[active].detail}<ArrowRight size={18} /></a>
        </div>
        <div className="dom-hero__navigation" role="group" aria-label="Choose a service image">
          {slides.map((slide, index) => <button key={slide.label} className={`dom-hero__tab ${index === active ? 'is-active' : ''}`} aria-pressed={active === index} aria-label={`Show ${slide.label}`} onClick={() => select(index)}><span className="dom-hero__number">0{index + 1}</span><span>{slide.label}</span><ArrowUpRight size={19} /></button>)}
          <button className="dom-hero__pause" disabled={reducedMotion} onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
        </div>
      </div>
    </section>
  );
}
