import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ScrollReveal from '../components/ScrollReveal';
import { MoveRight } from 'lucide-react';

const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const res = await api.get('/products?size=4');
      return res.data.content;
    },
  });

  return (
    <div className="bg-[#FCFBF7] text-black selection:bg-black selection:text-[#FCFBF7] overflow-x-hidden">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[120vh] flex items-center pt-32 pb-20 overflow-hidden border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="flex flex-col mb-12 md:mb-20">
            <ScrollReveal>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-black/30 block mb-6">
                Estate Collection 2026
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-[18vw] md:text-[15vw] font-medium tracking-tighter leading-[0.75] italic">
                Essence
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="text-[18vw] md:text-[15vw] font-medium tracking-tighter leading-[0.75] flex items-center gap-4 md:gap-10">
                Studio<span className="w-10 h-10 md:w-32 md:h-32 rounded-full border-[1px] border-black flex items-center justify-center text-xl md:text-8xl not-italic font-light">★</span>
              </h1>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <ScrollReveal delay={400} className="lg:col-span-4 order-2 lg:order-1">
              <p className="text-xl md:text-3xl font-light leading-snug mb-8 md:mb-12 max-w-sm">
                Redefining digital shopping through <span className="italic font-medium">minimalism</span> and intent.
              </p>
              <Link 
                to="/products"
                className="group relative flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] py-4 pr-12 rounded-full w-fit hover:gap-8 transition-all"
              >
                Start Exploring
                <div className="absolute right-0 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:w-full transition-all duration-700">
                  <MoveRight className="w-4 h-4" />
                </div>
              </Link>
            </ScrollReveal>
            
            <ScrollReveal delay={600} className="lg:col-span-8 relative order-1 lg:order-2">
              <div 
                className="aspect-[4/3] md:aspect-[16/9] rounded-[30px] md:rounded-[80px] overflow-hidden shadow-2xl transition-transform duration-700 ease-out"
                style={{ transform: `translateY(${scrolled * -0.05}px)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
                  alt="Hero Visual"
                  className="w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-opacity duration-1000"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-12 md:py-20 bg-black text-white overflow-hidden whitespace-nowrap border-y border-white/10">
        <div className="flex animate-marquee gap-10 md:gap-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-20 text-4xl md:text-8xl font-medium tracking-tighter uppercase">
              <span>Apple</span>
              <span className="italic opacity-30 font-light text-2xl md:text-5xl">Tesla</span>
              <span>Gucci</span>
              <span className="italic opacity-30 font-light text-2xl md:text-5xl">Prada</span>
              <span>Nike</span>
              <span className="italic opacity-30 font-light text-2xl md:text-5xl">Sony</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-32 md:py-60 px-6 md:px-12 max-w-[1600px] mx-auto">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 mb-20 md:mb-40 items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 mb-6 md:mb-8 block">Selected Pieces</span>
            <h2 className="text-6xl md:text-[10vw] font-medium tracking-tighter leading-none mb-8 md:mb-12">
              The <span className="italic">Collection</span>
            </h2>
            <p className="text-lg md:text-xl text-black/40 font-light max-w-sm">
              Each piece is a testament to our commitment to timeless aesthetics.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <div className="w-full md:w-80 group">
              <div className="aspect-[3/4] rounded-[30px] md:rounded-[40px] overflow-hidden bg-gray-100 mb-6 md:mb-8 border border-black/5">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/30 italic">Featured Accessory</p>
              <h4 className="text-xl md:text-2xl font-medium">Sonic Essence 01</h4>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 md:gap-y-32">
          {isLoading ? (
            [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            products?.map((product: any, i: number) => (
              <ScrollReveal key={product.id} delay={i * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-white border-y border-black/5 text-center px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none italic font-medium text-[30vw] md:text-[20vw] select-none flex items-center justify-center -rotate-12 whitespace-nowrap">
          ESSENCE ★ STUDIO
        </div>
        <ScrollReveal>
          <h2 className="text-5xl md:text-[12vw] font-medium tracking-tighter leading-none mb-12 md:mb-20 italic">
            Procure <br /> <span className="not-italic">Essence.</span>
          </h2>
          <Link 
            to="/products"
            className="inline-flex items-center gap-4 md:gap-6 px-10 md:px-16 py-6 md:py-8 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] hover:scale-110 transition-all shadow-2xl shadow-black/30"
          >
            Enter the Archive
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
