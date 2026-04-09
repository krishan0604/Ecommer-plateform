import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ScrollReveal from '../components/ScrollReveal';
import { Search as SearchIcon, SlidersHorizontal, ChevronDown } from 'lucide-react';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      let url = '/products?size=20';
      if (categoryId) url += `&categoryId=${categoryId}`;
      if (searchQuery) url += `&name=${searchQuery}`;
      const res = await api.get(url);
      return res.data;
    },
  });

  const handleCategoryChange = (id: string | null) => {
    if (id) {
      setSearchParams({ category: id });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen pt-32 pb-20">
      {/* Massive Awwwards-style Header */}
      <header className="px-6 md:px-12 mb-12">
        <ScrollReveal className="max-w-[1600px] mx-auto">
          <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-[0.85] mb-8">
            Digital <br className="hidden md:block"/>
            <span className="italic font-light text-gray-400">Exhibitions.</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-xl md:text-3xl text-gray-900 font-light max-w-2xl">
              Curated experiences and products blurring the line between utility and high art.
            </p>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-[350px]">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search exhibitions..."
                  className="pl-16 pr-8 py-5 bg-white border border-gray-100/50 rounded-full text-base font-medium focus:ring-1 focus:ring-black outline-none transition-all w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </header>

      {/* Sticky Filter & Category Bar */}
      <div className="sticky top-[80px] z-40 bg-[#FCFBF7]/80 backdrop-blur-xl border-y border-black/5 py-4 mb-20 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          
          <div className="flex-1 overflow-x-auto scrollbar-hide mask-linear-fade">
            <div className="flex items-center gap-2 w-max pr-12">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`text-sm tracking-widest uppercase font-bold px-6 py-3 rounded-full transition-all ${
                  !categoryId ? 'bg-black text-white' : 'bg-transparent text-gray-400 hover:text-black hover:bg-black/5'
                }`}
              >
                All Works
              </button>
              {categories?.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id.toString())}
                  className={`text-sm tracking-widest uppercase font-bold px-6 py-3 rounded-full transition-all ${
                    categoryId === category.id.toString() ? 'bg-black text-white' : 'bg-transparent text-gray-400 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-full shrink-0 hover:bg-gray-50 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline">Filters</span>
          </button>

        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {productsData?.content.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                {productsData.content.map((product: any, i: number) => (
                  <ScrollReveal key={product.id} delay={(i % 4) * 100}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal className="text-center py-40 max-w-2xl mx-auto">
                <SearchIcon className="w-12 h-12 text-gray-200 mx-auto mb-8" />
                <h3 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 italic">No matching works.</h3>
                <p className="text-xl text-gray-400 font-light">Try exploring another category or broadening your search parameters.</p>
              </ScrollReveal>
            )}
          </>
        )}
      </div>

      {/* Infinite Footer Marquee */}
      <section className="mt-40 py-16 bg-black text-white overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-24">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-24 text-4xl md:text-6xl font-medium tracking-tighter uppercase">
              <span>Apple Design</span>
              <span className="italic font-light opacity-50">Award Winning</span>
              <span>Sony Forms</span>
              <span className="italic font-light opacity-50">Global Standard</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;
