import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4 pt-20">
      <div className="max-w-xl w-full text-center reveal">
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-black rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-12 shadow-2xl shadow-black/20">
          <CheckCircle className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 block mb-4">
          Order Placed
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter mb-4 sm:mb-6 italic leading-none">
          Confirmed.
        </h1>
        <p className="text-gray-500 text-base sm:text-lg font-light mb-4">
          Thank you for your purchase.
        </p>
        <div className="inline-block bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-full font-mono text-black font-bold mb-10 sm:mb-16 text-sm sm:text-base">
          #ORD-{orderId || 'SUCCESS'}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-black text-white font-bold rounded-full text-xs sm:text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/20"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-full text-xs sm:text-sm uppercase tracking-widest transition-all"
          >
            View Orders <ShoppingBag className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
