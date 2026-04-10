import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const res = await api.get('/products?size=4');
      return res.data.content;
    },
  });

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Banner split/overlay - Classic Shopify style */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-gray-100 flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400&auto=format&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay for readability */}
        </div>

        {/* Content Box */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Elevate Your Everyday
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Discover our latest collection of premium essentials designed for modern living.
          </p>
          <Link to="/products" className="btn-primary bg-white text-black border-white hover:bg-transparent hover:text-white inline-block">
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* Featured Collection Strip */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Featured collection</h2>
          <Link to="/products" className="text-sm font-medium hover:underline underline-offset-4 text-gray-600 hover:text-black transition-colors">
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
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
      </section>

      {/* Image with Text Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch border border-gray-200 bg-white shadow-sm overflow-hidden rounded-sm">
            <div className="w-full lg:w-1/2 min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
                alt="Brand story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-20 text-center lg:text-left">
              <div className="max-w-md w-full">
                <span className="text-sm uppercase tracking-widest text-gray-500 font-medium block mb-4">Our Standard</span>
                <h2 className="text-3xl font-bold mb-6 tracking-tight">Craftsmanship First</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Every product we create is thoroughly tested and inspected to ensure it meets our rigorous standards for quality and endurance. Designed to last a lifetime.
                </p>
                <Link to="/technology" className="btn-secondary w-auto">
                  Learn about our tech
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Newsletter / Value Props strip at bottom */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to our emails</h2>
          <p className="text-gray-600 mb-6 font-medium">Be the first to know about new collections and exclusive offers.</p>
          <form className="flex w-full max-w-md mx-auto relative border border-gray-300">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full py-3 px-4 outline-none border-none bg-transparent"
            />
            <button type="submit" className="px-4 font-medium uppercase text-sm tracking-wider text-black hover:text-gray-500 transition-colors">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
