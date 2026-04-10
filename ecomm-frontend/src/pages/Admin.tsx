import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import ScrollReveal from '../components/ScrollReveal';
import { Plus, Trash2, Edit, Package, ShoppingCart, Users, ArrowUpRight, Lock, KeyRound, LayoutDashboard, X } from 'lucide-react';

const Admin: React.FC = () => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    categoryId: 1
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect authorization key.');
    }
  };

  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await api.get('/products?size=100');
      return res.data.content;
    },
    enabled: isAuthenticated
  });

  const createMutation = useMutation({
    mutationFn: (product: any) => api.post('/products', product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsAdding(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4 pt-20 pb-10">
        <ScrollReveal className="max-w-md w-full">
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-black rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-6 sm:mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <Lock className="text-white w-7 h-7 sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter mb-3 sm:mb-4 italic">Security Gate.</h1>
            <p className="text-gray-400 font-light text-xs sm:text-sm tracking-widest uppercase">Encryption Active</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8 bg-white/40 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <LayoutDashboard className="w-24 h-24 sm:w-32 sm:h-32" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-3 sm:mb-4 ml-2">Access Hash</label>
              <div className="relative">
                <KeyRound className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 sm:pl-16 pr-6 sm:pr-8 py-4 sm:py-6 bg-white/50 border border-black/5 rounded-2xl sm:rounded-3xl focus:ring-2 focus:ring-black outline-none transition-all text-lg sm:text-xl"
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold mt-3 sm:mt-4 tracking-wide">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-4 sm:py-6 bg-black text-white rounded-full font-black text-xs tracking-[0.4em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/20"
            >
              Verify Authority
            </button>
          </form>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7] pt-24 sm:pt-32 md:pt-40 lg:pt-52 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 text-gray-900">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-20 md:mb-24 gap-8 sm:gap-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4 sm:mb-6 opacity-40">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">System</span>
              <div className="w-8 sm:w-12 h-[1px] bg-black" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">v4.0.2</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-medium tracking-tighter leading-none mb-4 sm:mb-6">
              Inventory <br /> <span className="italic font-light">Management.</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-500 font-light max-w-lg">
              Exclusive control interface for AuraHub curators and stock managers.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="w-full sm:w-auto">
            <button
              onClick={() => setIsAdding(true)}
              id="add-product-btn"
              className="group flex items-center justify-center gap-4 sm:gap-6 bg-black text-white w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl shadow-black/20"
            >
              Add New Piece
              <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </ScrollReveal>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-16 sm:mb-24 md:mb-32">
          {[
            { label: 'Revenue Stream', value: '$128,430', icon: ArrowUpRight },
            { label: 'Curated Assets', value: products?.length || '0', icon: Package },
            { label: 'Global Traffic', value: '1.4k', icon: Users },
            { label: 'Processing', value: '12', icon: ShoppingCart },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100} className="relative group">
              <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-700">
                <div className="absolute top-5 right-5 sm:top-8 sm:right-8 text-black opacity-10 group-hover:opacity-40 transition-opacity">
                  <stat.icon className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-4 sm:mb-8">{stat.label}</p>
                <h3 className="text-3xl sm:text-5xl font-medium tracking-tighter">{stat.value}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Product Table - Responsive */}
        <ScrollReveal delay={400} className="bg-white rounded-[2rem] sm:rounded-[4rem] border border-black/5 shadow-xl overflow-hidden">
          <div className="bg-gray-50/50 px-6 sm:px-12 py-4 sm:py-6 border-b border-black/5 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Master Inventory List</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-black/5" />)}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 uppercase text-[10px] font-black tracking-[0.2em] text-black/20">
                  <th className="px-8 lg:px-12 py-8 lg:py-10">Asset Details</th>
                  <th className="px-8 lg:px-12 py-8 lg:py-10">Category</th>
                  <th className="px-8 lg:px-12 py-8 lg:py-10">Valuation</th>
                  <th className="px-8 lg:px-12 py-8 lg:py-10">Availability</th>
                  <th className="px-8 lg:px-12 py-8 lg:py-10 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {products?.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-8 lg:px-12 py-6 lg:py-10">
                      <div className="flex items-center gap-4 lg:gap-8">
                        <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-[1.5rem] bg-gray-100 overflow-hidden relative shadow-inner shrink-0">
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                        </div>
                        <div>
                          <span className="font-medium text-lg lg:text-2xl tracking-tighter block mb-1">{product.name}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-20 italic">SKU-AURA-{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 lg:px-12 py-6 lg:py-10">
                      <span className="text-sm font-light text-gray-500 italic">{product.categoryName}</span>
                    </td>
                    <td className="px-8 lg:px-12 py-6 lg:py-10">
                      <span className="text-xl lg:text-2xl font-medium tracking-tight">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-8 lg:px-12 py-6 lg:py-10">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{product.stock} Units</span>
                      </div>
                    </td>
                    <td className="px-8 lg:px-12 py-6 lg:py-10 text-right">
                      <div className="flex justify-end gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 translate-x-6 group-hover:translate-x-0 transition-all duration-700">
                        <button className="p-3 sm:p-4 hover:bg-black hover:text-white rounded-full transition-all bg-gray-50 border border-black/5">
                          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(product.id)}
                          className="p-3 sm:p-4 hover:bg-red-500 hover:text-white rounded-full transition-all bg-gray-50 border border-black/5"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-black/5">
            {products?.map((product: any) => (
              <div key={product.id} className="p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                  <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-base tracking-tighter truncate">{product.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{product.categoryName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-base font-medium">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-[10px] font-bold uppercase text-gray-400">{product.stock} units</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(product.id)}
                  className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Add Product Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-white w-full sm:max-w-2xl rounded-t-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-8 sm:mb-12">
              <h2 className="text-4xl sm:text-6xl font-medium tracking-tighter italic leading-none">
                Catalog <br /> <span className="not-italic">Addition.</span>
              </h2>
              <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="space-y-5 sm:space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 sm:mb-4 ml-2">Piece Name</label>
                <input
                  type="text"
                  placeholder="Essential Artifact..."
                  className="w-full px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] bg-gray-50 border border-transparent focus:border-black/5 focus:bg-white outline-none transition-all text-base sm:text-xl font-light italic"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 sm:mb-4 ml-2">Valuation ($)</label>
                  <input
                    type="number"
                    className="w-full px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] bg-gray-50 border border-transparent outline-none transition-all text-base sm:text-xl"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 sm:mb-4 ml-2">Stocking</label>
                  <input
                    type="number"
                    className="w-full px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] bg-gray-50 border border-transparent outline-none transition-all text-base sm:text-xl"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 sm:mb-4 ml-2">Content URI (Image)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] bg-gray-50 border border-transparent outline-none transition-all text-sm sm:text-lg font-light"
                  value={newProduct.imageUrl}
                  onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-16">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-5 sm:py-7 rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:bg-gray-100 transition-all border border-black/5"
              >
                Retract
              </button>
              <button
                onClick={() => createMutation.mutate(newProduct)}
                className="flex-1 py-5 sm:py-7 rounded-full bg-black text-white font-black text-[10px] tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl shadow-black/30"
              >
                Finalize Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
