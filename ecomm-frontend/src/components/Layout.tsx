import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { ShoppingBag } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Standard Shopify-style Footer */}
      <footer className="bg-[#f8f8f8] border-t border-gray-200 pt-16 pb-8 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-black">ESSENCE.</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Premium lifestyle goods and technology designed for the modern aesthetic. Built to last, designed to perform.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-medium text-black mb-4 uppercase text-xs tracking-wider">Quick links</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/products" className="hover:text-black hover:underline underline-offset-4">Shop All</Link></li>
                <li><Link to="/technology" className="hover:text-black hover:underline underline-offset-4">Our Technology</Link></li>
                <li><Link to="/cart" className="hover:text-black hover:underline underline-offset-4">Your Cart</Link></li>
                <li><Link to="/admin" className="hover:text-black hover:underline underline-offset-4">Staff Login</Link></li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div>
              <h4 className="font-medium text-black mb-4 uppercase text-xs tracking-wider">Customer Care</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black hover:underline underline-offset-4">Search</a></li>
                <li><a href="#" className="hover:text-black hover:underline underline-offset-4">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-black hover:underline underline-offset-4">Refund Policy</a></li>
                <li><a href="#" className="hover:text-black hover:underline underline-offset-4">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter/Social */}
            <div>
               <h4 className="font-medium text-black mb-4 uppercase text-xs tracking-wider">Stay connected</h4>
               <div className="flex space-x-4 mb-6">
                 <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black">Instagram</a>
                 <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black">LinkedIn</a>
               </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} ESSENCE. All rights reserved.
            </div>
            
            {/* Payment icons representation */}
            <div className="flex gap-2 opacity-60">
              <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
              <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
              <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
              <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button - standard circle icon style commonly used on Shopify */}
      {totalItems() > 0 && !isCartPage && (
        <Link
          to="/cart"
          id="floating-cart-btn"
          className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${
            scrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <div className="relative">
            <ShoppingBag size={24} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center border border-black/10">
              {totalItems()}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Layout;
