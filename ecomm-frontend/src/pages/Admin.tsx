import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import ScrollReveal from '../components/ScrollReveal';
import { Plus, Trash2, Edit, Package, ShoppingCart, Users, ArrowUpRight, Lock, KeyRound, LayoutDashboard } from 'lucide-react';

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
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4">
        <ScrollReveal className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <Lock className="text-white w-10 h-10" />
            </div>
            <h1 className="text-5xl font-medium tracking-tighter mb-4 italic">Security Gate.</h1>
            <p className="text-gray-400 font-light text-sm tracking-widest uppercase">Encryption Active</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-8 bg-white/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <LayoutDashboard className="w-32 h-32" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 ml-2">Access Hash</label>
              <div className="relative">
                <KeyRound className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-6 bg-white/50 border border-black/5 rounded-3xl focus:ring-2 focus:ring-black outline-none transition-all text-xl"
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold mt-4 tracking-wide">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-6 bg-black text-white rounded-full font-black text-xs tracking-[0.4em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/20"
            >
              Verify Authority
            </button>
          </form>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7] pt-52 pb-20 px-6 md:px-12 text-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6 opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">System</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">v4.0.2</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none mb-6">
              Inventory <br /> <span className="italic font-light">Management.</span>
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-lg">
                Exclusive control interface for AuraHub curators and stock managers.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="w-full md:w-auto">
            <button 
              onClick={() => setIsAdding(true)}
              className="group flex items-center justify-center gap-6 bg-black text-white w-full md:w-auto px-12 py-6 rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl shadow-black/20"
            >
              Add New Piece
              <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </ScrollReveal>
        </header>

        {/* Dynamic Stats - Floating Interaction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { label: 'Revenue Stream', value: '$128,430', icon: ArrowUpRight, color: 'bg-black' },
            { label: 'Curated Assets', value: products?.length || '0', icon: Package, color: 'bg-black' },
            { label: 'Global Traffic', value: '1.4k', icon: Users, color: 'bg-black' },
            { label: 'Processing', value: '12', icon: ShoppingCart, color: 'bg-black' },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100} className="relative group">
                <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700">
                    <div className="absolute top-8 right-8 text-black opacity-10 group-hover:opacity-40 transition-opacity">
                        <stat.icon className="w-12 h-12" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-8">{stat.label}</p>
                    <h3 className="text-5xl font-medium tracking-tighter">{stat.value}</h3>
                </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Expensive Table UI */}
        <ScrollReveal delay={400} className="bg-white rounded-[4rem] border border-black/5 shadow-xl overflow-hidden">
          <div className="bg-gray-50/50 px-12 py-6 border-b border-black/5 flex justify-between items-center">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Master Inventory List</span>
             <div className="flex gap-2">
                 {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-black/5" />)}
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 uppercase text-[10px] font-black tracking-[0.2em] text-black/20">
                  <th className="px-12 py-10">Asset Details</th>
                  <th className="px-12 py-10">Category</th>
                  <th className="px-12 py-10">Valuation</th>
                  <th className="px-12 py-10">Availability</th>
                  <th className="px-12 py-10 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {products?.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-gray-100 overflow-hidden relative shadow-inner">
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                        </div>
                        <div>
                            <span className="font-medium text-2xl tracking-tighter block mb-1">{product.name}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-20 italic">SKU-AURA-{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                        <span className="text-sm font-light text-gray-500 italic">{product.categoryName}</span>
                    </td>
                    <td className="px-12 py-10">
                        <span className="text-2xl font-medium tracking-tight">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {product.stock} Units
                        </span>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                        <button className="p-4 hover:bg-black hover:text-white rounded-full transition-all bg-gray-50 border border-black/5">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => deleteMutation.mutate(product.id)}
                          className="p-4 hover:bg-red-500 hover:text-white rounded-full transition-all bg-gray-50 border border-black/5"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>

      {/* Expensive Modal UI */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] reveal active animate-in grow scale-95 hover:scale-100 transition-transform duration-700">
            <h2 className="text-6xl font-medium tracking-tighter mb-12 italic leading-none">Catalog <br /> <span className="not-italic">Addition.</span></h2>
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 ml-4">Piece Name</label>
                <input 
                  type="text" 
                  placeholder="Essential Artifact..."
                  className="w-full px-10 py-6 rounded-[2rem] bg-gray-50 border border-transparent focus:border-black/5 focus:bg-white outline-none transition-all text-xl font-light italic"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 ml-4">Valuation ($)</label>
                  <input 
                    type="number" 
                    className="w-full px-10 py-6 rounded-[2rem] bg-gray-50 border border-transparent focus:border-black/5 outline-none transition-all text-xl"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 ml-4">Stocking</label>
                  <input 
                    type="number" 
                    className="w-full px-10 py-6 rounded-[2rem] bg-gray-50 border border-transparent focus:border-black/5 outline-none transition-all text-xl"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 ml-4">Content URI (Image)</label>
                <input 
                  type="text" 
                  placeholder="https://visuals.aura..."
                  className="w-full px-10 py-6 rounded-[2rem] bg-gray-50 border border-transparent focus:border-black/5 outline-none transition-all text-lg font-light"
                  value={newProduct.imageUrl}
                  onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-6 mt-16">
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 py-7 rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:bg-gray-100 transition-all border border-black/5"
              >
                Retract
              </button>
              <button 
                onClick={() => createMutation.mutate(newProduct)}
                className="flex-1 py-7 rounded-full bg-black text-white font-black text-[10px] tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl shadow-black/30"
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
