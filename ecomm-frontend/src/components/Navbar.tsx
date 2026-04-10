import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCartStore();
  const { user } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-700 px-4 sm:px-6 md:px-12 ${isScrolled ? 'py-3 md:py-4 glass border-b border-gray-100 shadow-sm' : 'py-5 md:py-8 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-medium tracking-tighter shrink-0 z-50">
            ESSENCE<span className="opacity-50">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {['Archive', 'Technology', 'Admin'].map((item) => (
              <Link
                key={item}
                to={item === 'Archive' ? '/products' : `/${item.toLowerCase()}`}
                className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-900/40 hover:text-black transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
            <button className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-400 hover:text-black transition-colors">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 group">
              <ShoppingBag className="w-5 h-5 stroke-[1.5] text-gray-400 group-hover:text-black transition-colors" />
              {totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems()}
                </span>
              )}
            </Link>

            <Link to={user ? "/profile" : "/register"} className="hidden sm:flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <User className="w-4 h-4 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">
                {user ? user.name.split(' ')[0] : 'ID'}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden flex items-center justify-center w-10 h-10 z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-[#FCFBF7] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-6 sm:px-10">
          <div className="space-y-6 sm:space-y-10">
            {[
              { label: 'Archive', path: '/products' },
              { label: 'Technology', path: '/technology' },
              { label: 'Admin', path: '/admin' },
              { label: 'Profile', path: user ? '/profile' : '/register' }
            ].map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="group flex items-center justify-between border-b border-black/5 pb-4 sm:pb-6 overflow-hidden"
              >
                <span className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tighter group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                  {item.label}
                </span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-500" />
              </Link>
            ))}
          </div>

          <div className="absolute bottom-10 left-6 sm:left-10 flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Social Connect</span>
            <div className="flex gap-6 sm:gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-60 transition-opacity">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
