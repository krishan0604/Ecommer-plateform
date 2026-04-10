import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Trash2, ShoppingBag, Minus, Plus, MoveRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center px-4 pt-20">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-8 sm:mb-10">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-gray-200" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 sm:mb-6 text-gray-900 text-center">
          Your collection is empty.
        </h2>
        <p className="text-base sm:text-xl text-gray-500 font-light mb-8 sm:mb-12 text-center max-w-sm">
          Pieces you collect will appear here for checkout.
        </p>
        <Link
          to="/products"
          className="group flex items-center gap-3 sm:gap-4 text-sm font-bold bg-black text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:scale-105 transition-all"
        >
          Explore Shop
          <MoveRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF7] min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 text-gray-900">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-10 sm:mb-16 md:mb-20 reveal">
          Your <span className="italic font-light">Inventory.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-8 reveal" style={{ animationDelay: '0.1s' }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 sm:p-8 rounded-[24px] sm:rounded-[40px] shadow-sm border border-gray-100 flex flex-row items-center gap-4 sm:gap-8 group"
              >
                <div className="w-20 h-20 sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-xl md:text-2xl font-medium mb-1 truncate">{item.productName}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 sm:mb-6">Product</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 sm:w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch py-1 gap-3">
                  <p className="text-lg sm:text-xl md:text-2xl font-medium whitespace-nowrap">
                    ${(item.productPrice * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1 sm:p-2"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="reveal" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] shadow-sm border border-gray-100 lg:sticky lg:top-32">
              <h3 className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8">Summary</h3>
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-gray-50">
                <div className="flex justify-between text-gray-500 font-light text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${subtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light text-sm sm:text-base">
                  <span>Shipping</span>
                  <span className="text-green-600 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest">Calculated next</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 sm:mb-10 px-1 sm:px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Est. Total</span>
                <span className="text-3xl sm:text-4xl font-medium tracking-tight">${subtotal().toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-3 sm:gap-4 w-full bg-black text-white py-5 sm:py-6 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/20"
              >
                Procure Items
                <MoveRight />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
