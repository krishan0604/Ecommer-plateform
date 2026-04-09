import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { MoveRight } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF7]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Premium Footer */}
      <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-2 space-y-12">
              <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none italic">
                Get in <br /> <span className="not-italic">Touch.</span>
              </h2>
              <div className="flex items-center gap-12 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Newsletter</h4>
              <p className="text-lg font-light text-gray-400 mb-8 leading-relaxed">
                Receive invitations to our private collection launches and seasonal drops.
              </p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:border-white transition-all outline-none text-xl"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                  <MoveRight />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Navigation</h4>
              <ul className="space-y-4 text-lg font-light text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors">All Pieces</Link></li>
                <li><Link to="/products?category=1" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Inventory</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Internal</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-900 gap-8">
            <div className="text-2xl font-medium tracking-tighter">ESSENCE.</div>
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              © 2026 Creative Essence Studio. All rights reserved.
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-6 bg-gray-900 rounded opacity-50"></div>
              <div className="w-10 h-6 bg-gray-900 rounded opacity-50"></div>
              <div className="w-10 h-6 bg-gray-900 rounded opacity-50"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
