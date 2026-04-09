import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ScrollReveal from '../components/ScrollReveal';
import { Cpu, Zap, Radio, Laptop } from 'lucide-react';

const Technology: React.FC = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['tech-products'],
    queryFn: async () => {
      const res = await api.get('/products?categoryId=1&size=8');
      return res.data.content;
    },
  });

  return (
    <div className="bg-[#FCFBF7] text-black">
      {/* Immersive Tech Hero */}
      <section className="relative min-h-[100vh] flex items-center pt-32 overflow-hidden border-b border-black/5 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="z-10 text-white">
            <ScrollReveal>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 block font-sans">Future Forward</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-[0.85] mb-12 italic">
                    Digital <br /> 
                    <span className="not-italic font-bold">Evolution.</span>
                </h1>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
                <ScrollReveal delay={300}>
                    <div className="flex items-center gap-4">
                        <Cpu className="text-white/40" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Neural Engines</span>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                    <div className="flex items-center gap-4">
                        <Zap className="text-white/40" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Energy Flow</span>
                    </div>
                </ScrollReveal>
            </div>
          </div>
          
          <div className="relative aspect-square reveal">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-[120px]" />
            <ScrollReveal delay={500}>
                <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" 
                    alt="Tech Hardware"
                    className="w-full h-full object-cover rounded-[100px] shadow-2xl grayscale contrast-125"
                />
            </ScrollReveal>
          </div>
        </div>
        
        {/* Floating Code Text */}
        <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/10 rotate-90 origin-right">
            {'const innovation = () => { return "Infinite"; };'}
        </div>
      </section>

      {/* Logic Grid */}
      <section className="py-40 px-6 md:px-12 max-w-[1600px] mx-auto">
        <ScrollReveal className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8 italic">The Inventory.</h2>
            <p className="text-xl text-black/40 font-light max-w-2xl mx-auto italic">"Advanced technology is indistinguishable from magic, if designed with essence."</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Feature Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-20">
            <ScrollReveal className="space-y-6">
                <Laptop className="w-12 h-12 text-white/20" />
                <h3 className="text-2xl font-medium tracking-tight italic">Performance First</h3>
                <p className="text-sm font-light text-white/40 leading-relaxed">Built for the creators who demand absolute reliability in every digital touchpoint.</p>
            </ScrollReveal>
            <ScrollReveal delay={200} className="space-y-6">
                <Radio className="w-12 h-12 text-white/20" />
                <h3 className="text-2xl font-medium tracking-tight italic">Global Signal</h3>
                <p className="text-sm font-light text-white/40 leading-relaxed">Seamless connectivity across borders, ensuring your aura remains constant everywhere.</p>
            </ScrollReveal>
            <ScrollReveal delay={400} className="space-y-6">
                <Zap className="w-12 h-12 text-white/20" />
                <h3 className="text-2xl font-medium tracking-tight italic">Instant Logic</h3>
                <p className="text-sm font-light text-white/40 leading-relaxed">Latency is a thing of the past. Our interfaces react as fast as your intent.</p>
            </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Technology;
