import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      let url = '/products?size=48';
      if (categoryId) url += `&categoryId=${categoryId}`;
      if (searchQuery) url += `&name=${searchQuery}`;
      const res = await api.get(url);
      return res.data;
    },
  });

  const handleCategoryChange = (id: string | null) => {
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
    <div className="bg-white min-h-screen">

      {/* ─── Standard Minimal Header ─────────────────────────────────────── */}
      <header className="bg-gray-50 py-16 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Shop the Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium pieces, designed with exceptional quality and built to endure.
          </p>
        </div>
      </header>

      {/* ─── Filter & Search Bar ───────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`shrink-0 text-sm font-medium px-4 py-2 rounded-sm transition-colors ${
                  !categoryId ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              {categories?.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id.toString())}
                  className={`shrink-0 text-sm font-medium px-4 py-2 rounded-sm transition-colors ${
                    categoryId === cat.id.toString()
                      ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-sm transition-colors text-sm font-medium"
              >
                {isSearchOpen ? <X size={18} /> : <SearchIcon size={18} />}
                <span className="hidden sm:inline">{isSearchOpen ? 'Close' : 'Search'}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-sm transition-colors text-sm font-medium">
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filter & Sort</span>
              </button>
            </div>
          </div>

          {/* Expandable search bar */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-24 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-sm text-base focus:border-black focus:ring-1 focus:ring-black outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Standard Product Grid ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 mb-4 rounded-sm" />
                <div className="h-4 bg-gray-200 w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-sm border border-gray-100">
            <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              We couldn't find anything matching your search criteria. Try browsing a different category.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); handleCategoryChange(null); setIsSearchOpen(false); }}
              className="mt-6 btn-secondary"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListing;
