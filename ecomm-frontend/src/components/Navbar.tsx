import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCartStore();
  const { user } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Shop', path: '/products' },
    { label: 'Technology', path: '/technology' },
    { label: 'Admin', path: '/admin' }
  ];

  return (
    <>
      <header className="sticky top-0 z-[60] bg-white border-b border-gray-100 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-black text-white text-xs text-center py-2 px-4 font-medium tracking-wide">
          <p>Free shipping on orders over $150. Shop now.</p>
        </div>

        <nav className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Mobile Menu Toggle / Desktop Links */}
            <div className="flex-1 flex items-center justify-start">
              <button
                className="lg:hidden p-2 -ml-2 text-gray-900"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu strokeWidth={1.5} size={24} />
              </button>
              
              <ul className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors uppercase tracking-widest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
                ESSENCE
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="flex-1 flex items-center justify-end space-x-4 lg:space-x-6">
              <button className="hidden lg:block text-gray-900 hover:text-gray-500 transition-colors">
                <Search strokeWidth={1.5} size={20} />
              </button>
              
              <Link to={user ? "/profile" : "/login"} className="hidden lg:block text-gray-900 hover:text-gray-500 transition-colors">
                <User strokeWidth={1.5} size={20} />
              </Link>

              <Link to="/cart" className="relative text-gray-900 hover:text-gray-500 transition-colors inline-block">
                <ShoppingBag strokeWidth={1.5} size={20} />
                {totalItems() > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[70] lg:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div className={`absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-lg font-bold tracking-tight">MENU</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-black"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="block px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-gray-100 mt-4 pt-4">
                <Link
                  to={user ? "/profile" : "/login"}
                  className="px-6 py-4 flex items-center text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  <User size={20} strokeWidth={1.5} className="mr-3 text-gray-500" />
                  {user ? 'Account' : 'Log in'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
