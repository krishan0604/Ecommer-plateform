import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ScrollReveal from '../components/ScrollReveal';
import { Search as SearchIcon, ChevronDown } from 'lucide-react';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 reveal active">
            <ScrollReveal className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4 block">Archive</span>
              <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-6">
                Curated <span className="italic font-light">Inventory.</span>
              </h1>
              <p className="text-xl text-gray-500 font-light">
                Explore our collection of meticulously designed products for your home and lifestyle.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className="flex gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Find something..."
                  className="pl-14 pr-8 py-4 bg-white border border-gray-100 rounded-full text-sm font-medium focus:ring-2 focus:ring-black transition-all w-full md:w-[300px] shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </ScrollReveal>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Minimalist Sidebar */}
          <aside className="w-full lg:w-64 space-y-12 shrink-0">
            <ScrollReveal>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Categories</h3>
              <div className="flex flex-col items-start gap-4">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`text-lg transition-all ${!categoryId ? 'font-bold underline underline-offset-8' : 'font-light text-gray-500 hover:text-black'}`}
                >
                  All Items
                </button>
                {categories?.map((category: any) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id.toString())}
                    className={`text-lg transition-all ${categoryId === category.id.toString() ? 'font-bold underline underline-offset-8' : 'font-light text-gray-500 hover:text-black'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Filter</h3>
              <div className="flex items-center justify-between text-sm px-4 py-3 border border-gray-100 rounded-full bg-white cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                <span>Price: Low to High</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </ScrollReveal>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                {productsData?.content.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                    {productsData.content.map((product: any, i: number) => (
                      <ScrollReveal key={product.id} delay={i * 50}>
                        <ProductCard product={product} />
                      </ScrollReveal>
                    ))}
                  </div>
                ) : (
                  <ScrollReveal className="text-center py-40 bg-white rounded-[40px] border border-gray-100">
                    <SearchIcon className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                    <h3 className="text-2xl font-medium tracking-tight mb-2">No results found.</h3>
                    <p className="text-gray-400 font-light">Try exploring another category or clearing your search.</p>
                  </ScrollReveal>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Brand Partnership Marquee */}
      <section className="mt-32 py-10 border-y border-black/5 opacity-30 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-20 text-[10px] font-black uppercase tracking-[0.5em]">
              <span>Curated by Apple</span>
              <span>Authentic Sony</span>
              <span>Tesla Innovation</span>
              <span>Gucci Essence</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;
