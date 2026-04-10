import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ScrollReveal from '../components/ScrollReveal';
import { MoveRight, ArrowDownRight } from 'lucide-react';

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stats item ───────────────────────────────────────────────────────────────
const StatItem: React.FC<{ value: number; suffix?: string; label: string }> = ({ value, suffix = '', label }) => {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-white leading-none mb-2">
        {count}{suffix}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{label}</div>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const res = await api.get('/products?size=6');
      return res.data.content;
    },
  });

  const heroParallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const heroParallaxY = (mousePos.y / window.innerHeight - 0.5) * 10;

  return (
    <div className="bg-[#FCFBF7] text-black selection:bg-black selection:text-[#FCFBF7] overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════
          HERO — Awwwards split-screen with parallax
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end pt-20 sm:pt-24 md:pt-28 overflow-hidden border-b border-black/5">

        {/* Faint background index */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-black/[0.025] tracking-tighter select-none pointer-events-none leading-none whitespace-nowrap">
          01
        </div>

        {/* Hero image — right aligned, parallax */}
        <div
          className="absolute right-0 top-0 w-full sm:w-[65%] md:w-[58%] h-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(${heroParallaxX * 0.3}px, ${heroParallaxY * 0.2}px)` }}
        >
          <div className="h-full w-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400&auto=format&fit=crop"
              alt="Essence Collection 2026"
              className="w-full h-full object-cover grayscale"
              style={{ transform: `translateY(${scrolled * 0.12}px) scale(1.15)` }}
            />
            {/* Fade left edge to blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FCFBF7] via-[#FCFBF7]/30 to-transparent sm:via-[#FCFBF7]/10" />
          </div>
        </div>

        {/* Foreground text stack */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 w-full pb-10 sm:pb-14 md:pb-20">
          {/* Eyebrow */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6 sm:mb-10">
              <div className="w-2 h-2 rounded-full bg-black" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">
                Estate Collection — 2026
              </span>
            </div>
          </ScrollReveal>

          {/* Giant headline */}
          <div className="overflow-hidden mb-0">
            <ScrollReveal delay={60}>
              <h1 className="text-[19vw] sm:text-[15vw] md:text-[12vw] lg:text-[11vw] font-medium tracking-tighter leading-[0.82]">
                Essence
              </h1>
            </ScrollReveal>
          </div>
          <div className="overflow-hidden">
            <ScrollReveal delay={130}>
              <h1 className="text-[19vw] sm:text-[15vw] md:text-[12vw] lg:text-[11vw] font-medium tracking-tighter leading-[0.82] italic text-black/20">
                Studio.
              </h1>
            </ScrollReveal>
          </div>

          {/* Sub-row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 sm:mt-12 md:mt-16 gap-6 sm:gap-8">
            <ScrollReveal delay={250} className="max-w-sm">
              <p className="text-lg sm:text-xl md:text-2xl font-light text-black/50 leading-snug">
                Redefining digital shopping through{' '}
                <em className="font-medium text-black not-italic italic">minimalism</em> and intent.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={360} direction="right">
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  to="/products"
                  id="hero-explore-btn"
                  className="group flex items-center gap-3 bg-black text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 hover:shadow-2xl hover:shadow-black/25 transition-all duration-500"
                >
                  Explore Archive
                  <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-black/10 flex items-center justify-center hover:border-black hover:rotate-45 transition-all duration-500">
                  <ArrowDownRight className="w-5 h-5 text-black/40" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <div className="w-px h-10 sm:h-14 bg-black animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-90 origin-center mt-2">scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MARQUEE TICKER
      ═══════════════════════════════════════════════════════ */}
      <section className="py-5 sm:py-6 bg-black text-white overflow-hidden whitespace-nowrap border-y border-white/5">
        <div className="flex animate-marquee-fast gap-8 sm:gap-16">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-12 shrink-0">
              <span className="text-lg sm:text-2xl font-medium tracking-tighter uppercase">Apple</span>
              <span className="text-sm text-white/20">✦</span>
              <span className="text-lg sm:text-2xl italic font-light tracking-tighter opacity-40">Tesla</span>
              <span className="text-sm text-white/20">✦</span>
              <span className="text-lg sm:text-2xl font-medium tracking-tighter uppercase">Gucci</span>
              <span className="text-sm text-white/20">✦</span>
              <span className="text-lg sm:text-2xl italic font-light tracking-tighter opacity-40">Prada</span>
              <span className="text-sm text-white/20">✦</span>
              <span className="text-lg sm:text-2xl font-medium tracking-tighter uppercase">Nike</span>
              <span className="text-sm text-white/20">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS — Awwwards counter row
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-16 sm:py-20 px-4 sm:px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-16">
          <StatItem value={240} suffix="+" label="Curated Objects" />
          <StatItem value={12} suffix="k" label="Global Collectors" />
          <StatItem value={4} suffix="" label="Award Distinctions" />
          <StatItem value={98} suffix="%" label="Client Satisfaction" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION LABEL
      ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-8 md:px-12 pt-20 sm:pt-28 md:pt-40 pb-8 sm:pb-12">
        <div className="max-w-[1600px] mx-auto flex items-end justify-between border-b border-black/5 pb-6 sm:pb-10">
          <ScrollReveal>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 block mb-3">02 — Selected Pieces</span>
              <h2 className="text-4xl sm:text-5xl md:text-[7vw] font-medium tracking-tighter leading-none">
                The <em className="italic">Collection</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="right">
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors group"
            >
              View All
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EDITORIAL PRODUCT GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-8 md:px-12 pb-20 sm:pb-32 md:pb-40">
        <div className="max-w-[1600px] mx-auto">
          {isLoading ? (
            <div className="space-y-4 sm:space-y-6">
              <ProductSkeleton variant="featured" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ProductSkeleton variant="wide" />
                <ProductSkeleton variant="wide" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* 1 — Featured (full-bleed dark) */}
              {products?.[0] && (
                <ScrollReveal>
                  <ProductCard product={products[0]} variant="featured" index={0} />
                </ScrollReveal>
              )}

              {/* 2–3 — Wide editorial pair */}
              {products?.slice(1, 3).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {products.slice(1, 3).map((p: any, i: number) => (
                    <ScrollReveal key={p.id} delay={i * 120}>
                      <ProductCard product={p} variant="wide" index={i + 1} />
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {/* 4–6 — Default portrait grid */}
              {products?.slice(3, 6).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {products.slice(3, 6).map((p: any, i: number) => (
                    <ScrollReveal key={p.id} delay={i * 100}>
                      <ProductCard product={p} variant="default" index={i + 3} />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA below grid */}
          <ScrollReveal className="mt-12 sm:mt-20 flex justify-center">
            <Link
              to="/products"
              className="group flex items-center gap-4 border border-black/10 hover:border-black px-8 sm:px-12 py-4 sm:py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500"
            >
              Enter the Full Archive
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PHILOSOPHY CTA — full-bleed dark
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0d0d0d] text-white py-24 sm:py-32 md:py-48 px-4 sm:px-8 md:px-12 overflow-hidden">
        {/* Background text watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.03] tracking-tighter select-none pointer-events-none leading-none whitespace-nowrap">
          ESSENCE
        </div>
        <div className="max-w-[1600px] mx-auto relative">
          <ScrollReveal>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-6">03 — Manifesto</span>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="text-[11vw] sm:text-[9vw] md:text-[7vw] font-medium tracking-tighter leading-[0.85] mb-12 sm:mb-20">
              Procure <br />
              <span className="italic text-white/30">Essence.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <Link
                to="/products"
                className="inline-flex items-center gap-4 px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-2xl shadow-black/50"
              >
                Enter the Archive
              </Link>
              <span className="text-white/20 text-sm font-light">Since 2026 — Est. Creative Studio</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
