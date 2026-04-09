import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { User, Package, MapPin, LogOut, Clock } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      const res = await api.get(`/orders/user/${user?.id || 1}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Profile Info */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Guest User'}</h2>
            <p className="text-gray-500 text-sm mb-6">{user?.email || 'guest@example.com'}</p>
            <button
              onClick={logout}
              className="w-full py-3 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span className="text-sm">Tech City, CA 90210</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-5 h-5 text-primary-600" />
              <span className="text-sm">Member since April 2026</span>
            </div>
          </div>
        </aside>

        {/* Order History */}
        <main className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Package className="w-6 h-6 mr-3 text-primary-600" /> My Orders
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {orders && orders.length > 0 ? (
                orders.map((order: any) => (
                  <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">Order ID</span>
                        <p className="font-bold text-gray-900">#ORD-{order.id}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">Date</span>
                        <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">Total</span>
                        <p className="font-bold text-primary-600">${order.totalAmount.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">Status</span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
