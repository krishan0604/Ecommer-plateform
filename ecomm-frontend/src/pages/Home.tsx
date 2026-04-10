import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const res = await api.get('/products?size=8');
      return res.data.content;
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data;
    },
  });

  return (
    <div className="bg-white text-gray-900">
      {/* ─── Hero Banner ─── */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400&auto=format&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" /> 
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Elevate Your Everyday
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto font-light">
            Discover our latest collection of premium essentials designed for modern living. Uncompromising quality.
          </p>
          <Link to="/products" className="btn-primary bg-white text-black border-white hover:bg-transparent hover:text-white inline-block text-sm uppercase tracking-widest px-8">
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* ─── Featured Collection (8 items) ─── */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">New Arrivals</h2>
          <Link to="/products" className="text-sm font-medium hover:underline underline-offset-4 text-gray-600 hover:text-black transition-colors">
            View all new pieces →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {productsLoading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 mb-4 rounded-sm" />
                <div className="h-4 bg-gray-200 w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 w-1/4" />
              </div>
            ))
          ) : (
            products?.map((product: any) => (
              <div key={product.id} className="fade-in">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
        
        <div className="mt-16 text-center">
           <Link to="/products" className="btn-secondary">
             Shop all products
           </Link>
        </div>
      </section>

      {/* ─── Shop by Category ─── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categoriesLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-sm" />
              ))
            ) : (
              categories?.slice(0, 4).map((category: any) => (
                <Link to={`/products?category=${category.id}`} key={category.id} className="group relative aspect-square overflow-hidden rounded-sm bg-gray-100 block">
                  <img 
                    src={category.imageUrl || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500"} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur-sm px-6 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── Image with Text Section ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch border border-gray-200 shadow-sm overflow-hidden rounded-sm">
            <div className="w-full lg:w-1/2 min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
                alt="Brand story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-20 text-center lg:text-left bg-gray-50">
              <div className="max-w-md w-full">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold block mb-4">Our Standard</span>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">Craftsmanship First</h2>
                <p className="text-gray-600 mb-8 leading-relaxed font-light">
                  Every product we create is thoroughly tested and inspected to ensure it meets our rigorous standards for quality and endurance. Designed to last a lifetime, built for your everyday.
                </p>
                <Link to="/technology" className="btn-secondary w-auto">
                  Learn about our process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-24 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Subscribe to our emails</h2>
          <p className="text-gray-600 mb-8 font-light">Be the first to know about new collections, exclusive offers, and behind-the-scenes content.</p>
          <form className="flex w-full max-w-md mx-auto relative border border-gray-300 rounded-sm overflow-hidden focus-within:border-black transition-colors">
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="w-full py-3 px-4 outline-none border-none bg-transparent"
            />
            <button type="submit" className="px-6 font-bold uppercase text-xs tracking-wider text-black bg-gray-50 hover:bg-gray-100 border-l border-gray-300 transition-colors">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
