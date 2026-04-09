import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useCartStore } from '../store/useCartStore';
import { ShoppingBag, Star, ArrowLeft, Minus, Plus, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="min-h-screen bg-[#FCFBF7]" />;
  if (!product) return null;

  return (
    <div className="bg-[#FCFBF7] min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Main Visual */}
          <div className="reveal">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-white shadow-sm border border-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="reveal" style={{animationDelay: '0.2s'}}>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4 block">
              {product.categoryName}
            </span>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-8">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-8 text-sm font-bold tracking-widest uppercase">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-900">324 Reviews</span>
            </div>

            <p className="text-4xl font-light mb-12 tracking-tight text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 max-w-lg">
              {product.description || "A masterpiece of engineering and aesthetics. Designed for those who appreciate the finer details of modern living."}
            </p>

            <div className="space-y-12">
              <div className="flex items-center gap-8">
                <div className="flex items-center bg-white border border-gray-100 rounded-full p-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-900"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-900"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => addItem(product, quantity)}
                  className="flex-1 bg-black text-white text-sm font-bold uppercase tracking-[0.2em] py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-black/20"
                >
                  Add to Collection
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-gray-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-400 font-light">Worldwide delivery in 3-5 days.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-gray-900">2 Year Warranty</h4>
                    <p className="text-xs text-gray-400 font-light">Full coverage on all internals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
