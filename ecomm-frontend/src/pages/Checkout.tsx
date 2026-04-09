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
      // Create order
      // In a real app, we'd send the actual userId. For now, using guest flow or mock.
      const res = await api.post('/orders', {
        userId: user?.id || 1, // Defaulting to 1 if no user
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          {/* Shipping Section */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Truck className="w-6 h-6 mr-3 text-primary-600" /> Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Zip Code</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Payment Section - Mock */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-3 text-primary-600" /> Payment Information
            </h2>
            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center text-gray-500">
              <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-primary-400" />
              <p className="font-medium text-gray-900">Secure Payment Simulation</p>
              <p className="text-sm">Click "Place Order" to finish your purchase.</p>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Breakdown</h2>
            <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1 flex-1">{item.productName} x {item.quantity}</span>
                  <span className="font-bold ml-4">${(item.productPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mb-8 pt-4 border-t">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-primary-600/25 active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Place Your Order</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
