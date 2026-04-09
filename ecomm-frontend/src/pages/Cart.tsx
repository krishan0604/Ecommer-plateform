import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, MoveRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center px-4 pt-20">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-10">
          <ShoppingBag className="w-10 h-10 text-gray-200" />
        </div>
        <h2 className="text-5xl font-medium tracking-tight mb-6 text-gray-900">Your collection is empty.</h2>
        <p className="text-xl text-gray-500 font-light mb-12">Pieces you collect will appear here for checkout.</p>
        <Link
          to="/products"
          className="group flex items-center gap-4 text-sm font-bold bg-black text-white px-10 py-5 rounded-full hover:scale-105 transition-all"
        >
          Explore Shop
          <MoveRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF7] min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-gray-900">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-20 reveal">
          Your <span className="italic font-light">Inventory.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8 reveal" style={{animationDelay: '0.1s'}}>
            {items.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-8 group">
                <div className="w-40 h-40 rounded-3xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-medium mb-1">{item.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{item.categoryName || 'Product'}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-6">
                    <div className="flex items-center bg-gray-50 rounded-full p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Minus className="w-3 h-3 text-gray-900" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm tracking-tight text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Plus className="w-3 h-3 text-gray-900" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col sm:items-end justify-between self-stretch py-2">
                  <p className="text-2xl font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="reveal" style={{animationDelay: '0.2s'}}>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-2xl font-medium mb-8">Summary</h3>
              <div className="space-y-6 mb-10 pb-10 border-b border-gray-50">
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Subtotal</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Shipping</span>
                  <span className="text-green-600 uppercase font-bold text-[10px] tracking-widest">Calculated at next step</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-10 px-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Estimated Total</span>
                <span className="text-4xl font-medium tracking-tight text-gray-900">${totalPrice().toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-4 w-full bg-black text-white py-6 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/20"
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
