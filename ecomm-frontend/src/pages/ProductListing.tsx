import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ScrollReveal from '../components/ScrollReveal';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';

// ─── Awwwards-style editorial grid layout ─────────────────────────────────────
// Repeating 5-card pattern:
//  Row A: [featured full-width]
//  Row B: [wide half] [wide half]
//  Row C: [default] [default] [default]
const LAYOUT_PATTERN = [
  'featured', // 1 - full width
  'wide',     // 2 - half
  'wide',     // 3 - half
  'default',  // 4
  'default',  // 5
  'default',  // 6
];

const getVariant = (index: number) => {
  const pos = index % LAYOUT_PATTERN.length;
  return LAYOUT_PATTERN[pos] as 'featured' | 'wide' | 'default';
};

// ─── Render groups: cluster by visual rows ────────────────────────────────────
const renderProductGroups = (products: any[]) => {
  const groups: React.ReactNode[] = [];
  let i = 0;

  while (i < products.length) {
    const pos = i % LAYOUT_PATTERN.length;

    // Featured — full width
    if (pos === 0 && products[i]) {
      groups.push(
        <ScrollReveal key={`group-featured-${i}`} className="col-span-full mb-2 sm:mb-4">
          <ProductCard product={products[i]} variant="featured" index={i} />
        </ScrollReveal>
      );
      i++;
    }
    // Wide pair
    else if ((pos === 1 || pos === 2) && products[i]) {
      const pair = products.slice(i, i + (2 - (pos - 1)));
      const pairStart = i;
      groups.push(
        <div key={`group-wide-${i}`} className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-2 sm:mb-4">
          {pair.map((p, idx) => (
            <ScrollReveal key={p.id} delay={idx * 120}>
              <ProductCard product={p} variant="wide" index={pairStart + idx} />
            </ScrollReveal>
          ))}
        </div>
      );
      i += pair.length;
    }
    // Default triple
    else if ((pos === 3 || pos === 4 || pos === 5) && products[i]) {
      const triple = products.slice(i, i + (6 - pos));
      const tripleStart = i;
      groups.push(
        <div key={`group-default-${i}`} className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-16">
          {triple.map((p, idx) => (
            <ScrollReveal key={p.id} delay={idx * 100}>
              <ProductCard product={p} variant="default" index={tripleStart + idx} />
            </ScrollReveal>
          ))}
        </div>
      );
      i += triple.length;
    } else {
      i++;
    }
  }

  return groups;
};

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data;
    },
  });

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', categoryId, searchQuery],
    queryFn: async () => {
      let url = '/products?size=24';
      if (categoryId) url += `&categoryId=${categoryId}`;
      if (searchQuery) url += `&name=${searchQuery}`;
      const res = await api.get(url);
      return res.data;
    },
  });

  const handleCategoryChange = (id: string | null) => {
    setActiveFilter(id);
    if (id) setSearchParams({ category: id });
    else setSearchParams({});
  };

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  const products = productsData?.content || [];

  return (
    <div className="bg-[#FCFBF7] min-h-screen overflow-x-hidden">

      {/* ─── Cinematic Header ─────────────────────────────────────── */}
      <header className="relative pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-20 px-4 sm:px-6 md:px-12 border-b border-black/5 overflow-hidden">
        {/* Faint background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-black text-black/[0.025] tracking-tighter uppercase whitespace-nowrap">
            Archive
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">
                {products.length > 0 ? `${products.length} Objects` : 'The Collection'}
              </span>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12">
            <div>
              <ScrollReveal delay={80}>
                <h1 className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-medium tracking-tighter leading-[0.82] mb-0">
                  Digital
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <h1 className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-medium tracking-tighter leading-[0.82] italic text-gray-400">
                  Exhibitions.
                </h1>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={300} className="max-w-sm md:pb-2">
              <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                Curated experiences and products blurring the line between utility and high art.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* ─── Sticky Filter Bar ───────────────────────────────────── */}
      <div className="sticky top-[60px] sm:top-[72px] z-40 bg-[#FCFBF7]/90 backdrop-blur-2xl border-b border-black/5 transition-all">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center h-14 sm:h-16 gap-3 sm:gap-4">

            {/* Category pills — scrollable */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 sm:gap-2 w-max min-w-full">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`shrink-0 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
                    !categoryId
                      ? 'bg-black text-white shadow-lg shadow-black/20'
                      : 'text-gray-400 hover:text-black hover:bg-black/5'
                  }`}
                >
                  All
                </button>
                {categories?.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id.toString())}
                    className={`shrink-0 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                      categoryId === cat.id.toString()
                        ? 'bg-black text-white shadow-lg shadow-black/20'
                        : 'text-gray-400 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-black/10 shrink-0" />

            {/* Search toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="shrink-0 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-black/5 transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black"
            >
              {isSearchOpen ? <X className="w-3.5 h-3.5" /> : <SearchIcon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSearchOpen ? 'Close' : 'Search'}</span>
            </button>

            <button className="shrink-0 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-black/5 transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {/* Expandable search bar */}
          <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${isSearchOpen ? 'max-h-20 pb-4' : 'max-h-0'}`}>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search the archive..."
                className="w-full pl-11 pr-10 py-3 sm:py-4 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:ring-1 focus:ring-black outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Product Grid ─────────────────────────────────────────── */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-6">
            {renderProductGroups(products)}
          </div>
        ) : (
          <div className="text-center py-24 sm:py-40">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-black/5 flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <SearchIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-200" />
            </div>
            <h3 className="text-3xl sm:text-5xl font-medium tracking-tighter mb-3 sm:mb-4 italic">No matching works.</h3>
            <p className="text-base sm:text-xl text-gray-400 font-light max-w-sm mx-auto">
              Try exploring another category or broadening your search.
            </p>
          </div>
        )}
      </main>

      {/* ─── Awwwards-style Footer Marquee ───────────────────────── */}
      <section className="py-10 sm:py-16 bg-black text-white overflow-hidden whitespace-nowrap border-t border-white/5">
        <div className="flex animate-marquee gap-12 sm:gap-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 sm:gap-20 shrink-0">
              <span className="text-3xl sm:text-5xl font-medium tracking-tighter uppercase">Apple Design</span>
              <span className="text-lg sm:text-2xl italic font-light opacity-30">★</span>
              <span className="text-3xl sm:text-5xl font-medium tracking-tighter uppercase">Sony Forms</span>
              <span className="text-lg sm:text-2xl italic font-light opacity-30">★</span>
              <span className="text-3xl sm:text-5xl font-medium tracking-tighter uppercase">Award Winning</span>
              <span className="text-lg sm:text-2xl italic font-light opacity-30">★</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;
