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
    <div className="bg-[#FCFBF7] min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-10 sm:mb-16 md:mb-20 reveal">
          Your <span className="italic font-light">Profile.</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          {/* Profile Info Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 space-y-5 sm:space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-sm text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <User className="w-9 h-9 sm:w-12 sm:h-12 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-medium tracking-tighter text-gray-900 mb-1">
                {user?.name || 'Guest User'}
              </h2>
              <p className="text-gray-400 text-sm mb-6 sm:mb-8 font-light">{user?.email || 'guest@example.com'}</p>
              <button
                onClick={logout}
                className="w-full py-3 sm:py-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 font-bold rounded-full text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black/30 shrink-0" />
                <span className="text-sm font-light">Tech City, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black/30 shrink-0" />
                <span className="text-sm font-light">Member since April 2026</span>
              </div>
            </div>
          </aside>

          {/* Order History */}
          <main className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 tracking-tighter">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-black/30" /> My Orders
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 sm:h-24 bg-gray-100 rounded-[20px] sm:rounded-[24px] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {orders && orders.length > 0 ? (
                  orders.map((order: any) => (
                    <div key={order.id} className="bg-white p-5 sm:p-6 rounded-[20px] sm:rounded-[30px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-widest font-bold">Order ID</span>
                          <p className="font-bold text-gray-900 text-sm">#ORD-{order.id}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-widest font-bold">Date</span>
                          <p className="font-medium text-gray-900 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-widest font-bold">Total</span>
                          <p className="font-bold text-gray-900 text-sm">${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-widest font-bold">Status</span>
                          <span className="px-3 py-1 bg-black text-white text-[9px] font-black rounded-full uppercase tracking-widest">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-[24px] sm:rounded-[40px] p-10 sm:p-16 text-center border border-gray-100">
                    <Package className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-light text-base sm:text-lg">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
