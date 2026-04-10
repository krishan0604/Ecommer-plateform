import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import api from '../api/axios';
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/orders', {
        userId: user?.id || 1,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
      });
      if (res.data) {
        clearCart();
        navigate(`/confirmation?orderId=${res.data.id}`);
      }
    } catch (error) {
      console.error('Order failed', error);
      alert('Order failed. Please try again.');
    }
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-10 sm:mb-16 md:mb-20 reveal">
          Checkout<span className="italic font-light text-gray-400">.</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          {/* Left: Form Fields */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            {/* Shipping Section */}
            <section className="bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-black/50" />
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 sm:mb-3">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-black/10 focus:bg-white outline-none transition-all text-base sm:text-lg font-light"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 sm:mb-3">Street Address</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-black/10 focus:bg-white outline-none transition-all text-base sm:text-lg font-light"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 sm:mb-3">City</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-black/10 focus:bg-white outline-none transition-all text-base sm:text-lg font-light"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 sm:mb-3">Zip Code</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-black/10 focus:bg-white outline-none transition-all text-base sm:text-lg font-light"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-black/50" />
                Payment Information
              </h2>
              <div className="p-5 sm:p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center text-gray-500">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-400" />
                <p className="font-medium text-gray-900 text-sm sm:text-base">Secure Payment Simulation</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Click "Place Order" to finish your purchase.</p>
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[380px] xl:w-[420px]">
            <div className="bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-sm lg:sticky lg:top-32">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6">Order Breakdown</h2>
              <div className="max-h-52 overflow-y-auto mb-5 sm:mb-6 pr-2 space-y-3 sm:space-y-4 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 line-clamp-1 flex-1 text-xs sm:text-sm">{item.productName} × {item.quantity}</span>
                    <span className="font-bold ml-3 sm:ml-4 text-xs sm:text-sm">${(item.productPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 sm:mb-8 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Amount</span>
                  <span className="text-2xl sm:text-3xl font-medium tracking-tight">${subtotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                id="place-order-btn"
                className="w-full bg-black text-white font-bold py-4 sm:py-6 rounded-full flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/20"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Place Your Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
