import React, { useState, useEffect, useCallback } from 'react';
import type { Listing } from '@arli/contracts';
import { ListingCard } from '../components/ListingCard';
import { SEOHead } from '../components/SEOHead';
import { FAQSection } from '../components/FAQSection';

interface HomeProps {
  listings: Listing[];
  t: any;
  lang: 'en' | 'hi';
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: () => void;
  onNavigate: (screen: string) => void;
  onSelectListing: (id: number) => void;
  onSearchCategory: (cat: string) => void;
}

// Hero carousel slide definition
interface HeroSlide {
  tag: string;
  tagColor: string;
  title: string;
  sub: string;
  gradient: string;
  cta: string;
  ctaAction: 'explore' | 'chat';
  accentBar: string;
  img: string;
}

export const Home: React.FC<HomeProps> = ({
  listings,
  t,
  lang,
  query,
  onQueryChange,
  onSearch,
  onNavigate,
  onSelectListing,
  onSearchCategory,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides: HeroSlide[] = [
    {
      tag: '🎉 New Season',
      tagColor: '#D4AF37',
      title: 'New Arrivals\nJust Dropped',
      sub: 'Fresh kurtas, Banarasi silks & designer lehengas from local artisans — curated for you.',
      gradient: 'linear-gradient(135deg, rgba(26,37,66,0.82) 0%, rgba(122,46,77,0.72) 100%)',
      cta: 'Shop New Arrivals →',
      ctaAction: 'explore',
      accentBar: '#D4AF37',
      img: '/hero/new-arrivals.png',
    },
    {
      tag: '% Limited Offer',
      tagColor: '#C2492F',
      title: 'ARLI10 — 10% Off\nYour First Order',
      sub: 'Use code ARLI10 at checkout. Valid on all fabrics, garments & tailoring services.',
      gradient: 'linear-gradient(135deg, rgba(26,16,16,0.82) 0%, rgba(194,73,47,0.68) 100%)',
      cta: 'Explore Bazaar →',
      ctaAction: 'explore',
      accentBar: '#C2492F',
      img: '/hero/offer.png',
    },
    {
      tag: '📏 Bespoke Tailoring',
      tagColor: '#2E7D5B',
      title: 'Perfect Fit,\nEvery Time',
      sub: 'Share your measurements once and let local tailors create outfits made just for you.',
      gradient: 'linear-gradient(135deg, rgba(13,31,26,0.85) 0%, rgba(30,77,59,0.72) 100%)',
      cta: 'Find a Tailor →',
      ctaAction: 'explore',
      accentBar: '#2E7D5B',
      img: '/hero/tailoring.png',
    },
    {
      tag: '★ Loyalty Club',
      tagColor: '#D4AF37',
      title: 'Earn Points\nOn Every Purchase',
      sub: '1 loyalty point for every ₹100 spent. Redeem for discounts on future orders.',
      gradient: 'linear-gradient(135deg, rgba(26,26,10,0.82) 0%, rgba(90,74,16,0.68) 100%)',
      cta: 'Start Earning →',
      ctaAction: 'explore',
      accentBar: '#D4AF37',
      img: '/hero/loyalty.png',
    },
    {
      tag: '✦ AI Stylist',
      tagColor: '#8B5CF6',
      title: 'Your Personal\nAI Fashion Stylist',
      sub: 'Describe your dream outfit and get instant recommendations from our AI — powered by local artisans.',
      gradient: 'linear-gradient(135deg, rgba(15,11,31,0.85) 0%, rgba(59,31,122,0.72) 100%)',
      cta: 'Try AI Stylist →',
      ctaAction: 'chat',
      accentBar: '#8B5CF6',
      img: '/hero/ai-stylist.png',
    },
    {
      tag: '✦ How It Works',
      tagColor: '#D4AF37',
      title: 'Search. Chat.\nOrder. Earn.',
      sub: 'Find local shops by pincode → chat with tailors → track your order → earn loyalty points.',
      gradient: 'linear-gradient(135deg, rgba(10,15,35,0.88) 0%, rgba(20,25,60,0.78) 100%)',
      cta: 'Start Shopping →',
      ctaAction: 'explore',
      accentBar: '#D4AF37',
      img: '/hero/how-it-works.png',
    },
  ];

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const next = useCallback(() => {
    goToSlide((activeSlide + 1) % totalSlides);
  }, [activeSlide, totalSlides, goToSlide]);

  // Auto-advance every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[activeSlide];

  const categories = [
    { id: 'all',     label: t.catAll     || 'All',       swatch: '#2A3B66', count: '12 shops' },
    { id: 'fabric',  label: t.catFabric  || 'Fabrics',   swatch: '#7A2E4D', count: '4 shops'  },
    { id: 'garment', label: t.catGarment || 'Garments',  swatch: '#4E6B4B', count: '5 shops'  },
    { id: 'service', label: t.catService || 'Tailoring', swatch: '#39597B', count: '3 shops'  },
  ];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <main className="animate-fade-up" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title="ARLI BRAND - by fashion vendors | Local Indian Fashion Bazaar"
        description="Find local boutique fabrics, custom tailors, and ethnic fashion vendors in your pincode area across India. Doorstep measurements and instant reorders."
        keywords="ARLI fashion, local tailors near me, boutique fabrics India, custom stitching, pincode fashion bazaar"
      />

      {/* ===== HERO CAROUSEL ===== */}
      <section className="hero-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          position: 'relative',
          minHeight: '380px',
          overflow: 'hidden',
          backgroundColor: '#1A2542',
        }}>
          {/* Background image (full bleed, covered) */}
          <img
            key={`img-${activeSlide}`}
            src={slide.img}
            alt={slide.title.replace('\n', ' ')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'right center',
              animation: 'heroSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
            }}
          />
          {/* Gradient overlay on top of image — darkens left side for text */}
          <div style={{ position: 'absolute', inset: 0, background: slide.gradient }} />
          {/* Extra vignette for deeper contrast */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.04) 100%)' }} />

          {/* Accent colour bar at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '3px',
            background: slide.accentBar,
            transition: 'background 0.5s ease',
          }} />

          {/* Hero content */}
          <div className="hero-inner">
            {/* Tag pill */}
            <span
              key={`tag-${activeSlide}`}
              style={{
                display: 'inline-flex',
                backgroundColor: slide.tagColor,
                color: slide.tagColor === '#D4AF37' ? '#1A2542' : '#fff',
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '4px 12px',
                borderRadius: '999px',
                animation: 'tagFadeUp 0.45s 0.1s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              {slide.tag}
            </span>

            {/* Headline */}
            <h1
              key={`h1-${activeSlide}`}
              className="hero-title"
              style={{ animation: 'tagFadeUp 0.45s 0.18s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              {slide.title.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${activeSlide}`}
              className="hero-sub"
              style={{ animation: 'tagFadeUp 0.45s 0.26s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              {slide.sub}
            </p>

            {/* Mobile inline search (always shown) */}
            <div className="hero-mobile-search">
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.searchPh || 'Search silk, kurta, tailor…'}
              />
              <button onClick={onSearch}>{t.searchBtn || 'Search'}</button>
            </div>

            {/* CTA */}
            <button
              key={`cta-${activeSlide}`}
              onClick={() => onNavigate(slide.ctaAction)}
              style={{
                backgroundColor: slide.tagColor === '#D4AF37' ? slide.tagColor : slide.accentBar,
                color: slide.tagColor === '#D4AF37' ? '#1A2542' : '#fff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '13px 24px',
                borderRadius: '12px',
                marginTop: '4px',
                minHeight: '48px',
                animation: 'tagFadeUp 0.45s 0.33s cubic-bezier(0.16,1,0.3,1) both',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
            >
              {slide.cta}
            </button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '7px', marginTop: '6px' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === activeSlide ? '22px' : '7px',
                    height: '7px',
                    borderRadius: '999px',
                    backgroundColor: i === activeSlide ? slide.accentBar : 'rgba(255,255,255,0.35)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Prev / Next chevron arrows (desktop) */}
          <button
            onClick={() => goToSlide((activeSlide - 1 + totalSlides) % totalSlides)}
            aria-label="Previous slide"
            style={{
              position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%',
              width: '38px', height: '38px', cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', zIndex: 5,
              transition: 'background 0.2s',
            }}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            style={{
              position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%',
              width: '38px', height: '38px', cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', zIndex: 5,
              transition: 'background 0.2s',
            }}
          >
            ›
          </button>
        </div>

        {/* Category Grid — directly below carousel */}
        <div style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, #F3EAD6 100%)' }}>
          <div className="home-category-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSearchCategory(cat.id)}
                className="home-cat-card hover-scale"
              >
                <div className="home-cat-swatch" style={{ backgroundColor: cat.swatch }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="home-cat-title">{cat.label}</div>
                  <div className="home-cat-count">{cat.count}</div>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL LISTINGS: Full grid (no slice limit) ===== */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '40px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 400, margin: 0 }}>
            {t.featuredTitle || 'Featured near you'}
          </h2>
          <button
            onClick={() => onNavigate('explore')}
            style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 700, cursor: 'pointer', padding: '4px 0', minHeight: '44px' }}
          >
            {t.viewAll || 'View all'} →
          </button>
        </div>

        {listings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '15px' }}>No featured listings yet.</p>
            <p style={{ margin: 0, fontSize: '12px' }}>Add listings from the merchant dashboard.</p>
          </div>
        ) : (
          <div className="home-listings-grid">
            {listings.map((item) => (
              <ListingCard key={item.id} item={item} lang={lang} t={t} onClick={() => onSelectListing(item.id)} />
            ))}
          </div>
        )}
      </section>

      {/* ===== FABRICS SECTION ===== */}
      {listings.filter(l => l.cat === 'fabric').length > 0 && (
        <section style={{ backgroundColor: '#fff', borderTop: '1px solid var(--border-color)', padding: '36px 16px 28px' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(22px, 4.5vw, 30px)', fontWeight: 400, margin: '0 0 3px' }}>
                  🧵 {t.catFabric || 'Fabrics'}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Banarasi, Chanderi, Silk, Khadi & more</p>
              </div>
              <button onClick={() => onSearchCategory('fabric')} style={{ background: 'none', border: '1.5px solid var(--border-color)', borderRadius: '999px', padding: '7px 16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer', minHeight: '38px' }}>
                See all fabrics →
              </button>
            </div>
            <div className="home-listings-grid">
              {listings.filter(l => l.cat === 'fabric').map((item) => (
                <ListingCard key={item.id} item={item} lang={lang} t={t} onClick={() => onSelectListing(item.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== GARMENTS SECTION ===== */}
      {listings.filter(l => l.cat === 'garment').length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-color)', padding: '36px 16px 28px' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(22px, 4.5vw, 30px)', fontWeight: 400, margin: '0 0 3px' }}>
                  👗 {t.catGarment || 'Garments'}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Kurtas, Sarees, Lehengas, Anarkalis & more</p>
              </div>
              <button onClick={() => onSearchCategory('garment')} style={{ background: 'none', border: '1.5px solid var(--border-color)', borderRadius: '999px', padding: '7px 16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer', minHeight: '38px' }}>
                See all garments →
              </button>
            </div>
            <div className="home-listings-grid">
              {listings.filter(l => l.cat === 'garment').map((item) => (
                <ListingCard key={item.id} item={item} lang={lang} t={t} onClick={() => onSelectListing(item.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAILORING SERVICES SECTION ===== */}
      {listings.filter(l => l.cat === 'service').length > 0 && (
        <section style={{ backgroundColor: '#fff', borderTop: '1px solid var(--border-color)', padding: '36px 16px 28px' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(22px, 4.5vw, 30px)', fontWeight: 400, margin: '0 0 3px' }}>
                  ✂️ {t.catService || 'Tailoring'}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Custom stitching, alterations & bespoke fitting</p>
              </div>
              <button onClick={() => onSearchCategory('service')} style={{ background: 'none', border: '1.5px solid var(--border-color)', borderRadius: '999px', padding: '7px 16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer', minHeight: '38px' }}>
                See all tailors →
              </button>
            </div>
            <div className="home-listings-grid">
              {listings.filter(l => l.cat === 'service').map((item) => (
                <ListingCard key={item.id} item={item} lang={lang} t={t} onClick={() => onSelectListing(item.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA BANNER (replaces How It Works) ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #3A1F4B 100%)',
        padding: '48px 16px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 400,
            color: '#FAF6F0',
            margin: '0 0 10px',
          }}>
            Own a shop? Get discovered.
          </h2>
          <p style={{ fontSize: '15px', color: '#C4BAA8', margin: '0 0 24px', lineHeight: 1.6 }}>
            List your fabrics, garments or tailoring services in minutes.
            Receive orders, chat with customers, and grow.
          </p>
          <button
            onClick={() => window.open('http://localhost:5174', '_blank')}
            style={{
              backgroundColor: 'var(--color-gold)',
              color: '#1A2542',
              border: 'none',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              padding: '14px 28px',
              borderRadius: '12px',
              minHeight: '50px',
            }}
          >
            Register your business →
          </button>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQSection />
    </main>
  );
};
