import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { MoveRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCartStore();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart' || location.pathname === '/checkout';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF7]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-black text-white pt-16 sm:pt-24 md:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 md:gap-20 mb-16 sm:mb-24 md:mb-32">
            <div className="sm:col-span-2 space-y-8 sm:space-y-12">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-none italic">
                Get in <br /> <span className="not-italic">Touch.</span>
              </h2>
              <div className="flex flex-wrap items-center gap-6 sm:gap-12 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 sm:mb-8">Newsletter</h4>
              <p className="text-base sm:text-lg font-light text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Receive invitations to our private collection launches and seasonal drops.
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-gray-800 py-3 sm:py-4 focus:border-white transition-all outline-none text-base sm:text-xl"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform p-2">
                  <MoveRight />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 sm:mb-8">Navigation</h4>
              <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg font-light text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors">All Pieces</Link></li>
                <li><Link to="/products?category=1" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Inventory</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Internal</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 sm:pt-12 border-t border-gray-900 gap-6 sm:gap-8">
            <div className="text-xl sm:text-2xl font-medium tracking-tighter">ESSENCE.</div>
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest text-center">
              © 2026 Creative Essence Studio. All rights reserved.
            </div>
            <div className="flex gap-3 sm:gap-4">
              <div className="w-8 sm:w-10 h-5 sm:h-6 bg-gray-900 rounded opacity-50"></div>
              <div className="w-8 sm:w-10 h-5 sm:h-6 bg-gray-900 rounded opacity-50"></div>
              <div className="w-8 sm:w-10 h-5 sm:h-6 bg-gray-900 rounded opacity-50"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Floating Cart Bubble ──────────────────────────────── */}
      {totalItems() > 0 && !isCartPage && (
        <Link
          to="/cart"
          id="floating-cart-btn"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black text-white pl-5 pr-4 py-3.5 rounded-full shadow-2xl shadow-black/40 transition-all duration-500 hover:scale-110 hover:shadow-black/60 group ${
            scrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:inline">
            View Cart
          </span>
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black text-[8px] font-black rounded-full flex items-center justify-center">
              {totalItems()}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Layout;
