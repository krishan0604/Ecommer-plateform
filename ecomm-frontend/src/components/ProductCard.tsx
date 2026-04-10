import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: any;
  variant?: 'default' | 'wide' | 'tall' | 'featured';
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default', index = 0 }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  if (variant === 'featured') {
    return (
      <Link
        to={`/products/${product.id}`}
        className="group relative block overflow-hidden bg-[#0d0d0d] rounded-[2rem] md:rounded-[3rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full bleed image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-[1.4s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-105 brightness-50 group-hover:brightness-40"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block mb-2 sm:mb-3">
              {product.categoryName} — Featured
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tighter text-white leading-none mb-2 sm:mb-4">
              {product.name}
            </h3>
            <p className="text-white/50 font-light text-base sm:text-xl">${product.price.toFixed(2)}</p>
          </div>

          <div className={`flex flex-col items-end gap-3 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/30 rounded-full flex items-center justify-center text-white">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Award badge */}
        <div className="absolute top-5 left-5 sm:top-8 sm:left-8">
          <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Editor's Pick</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'wide') {
    return (
      <Link
        to={`/products/${product.id}`}
        className="group relative flex flex-col sm:flex-row overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-black/5 bg-white hover:shadow-2xl transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 block mb-3 sm:mb-4">
              {product.categoryName}
            </span>
            <h3 className="text-2xl sm:text-4xl font-medium tracking-tighter leading-none mb-3 sm:mb-6 group-hover:italic transition-all duration-300">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed line-clamp-2">
              {product.description || "A masterpiece of engineering and aesthetics, designed for those who appreciate the finer details."}
            </p>
          </div>
          <div className="flex items-center justify-between mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-black/5">
            <span className="text-2xl sm:text-3xl font-medium tracking-tight">${product.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 sm:gap-3 bg-black text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add to Case</span>
              <span className="inline sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Default card (tall / portrait)
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden bg-[#F5F4F0] rounded-[1.25rem] sm:rounded-[2rem] mb-4 sm:mb-6 ${variant === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110 grayscale group-hover:grayscale-0"
        />

        {/* Subtle dark overlay on hover */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />

        {/* Add-to-cart CTA — slides up from bottom */}
        <div className={`absolute inset-x-0 bottom-0 p-4 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-3 sm:py-4 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 shadow-2xl hover:bg-black hover:text-white transition-colors duration-300"
          >
            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
            Add to Collection
          </button>
        </div>

        {/* Quick-view arrow — top right */}
        <div className={`absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-400 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        {/* Index number */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
          <span className="text-[9px] sm:text-[10px] font-black text-white/60 tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className={`font-medium tracking-tighter text-gray-900 leading-tight transition-all duration-300 ${isHovered ? 'italic' : ''} text-base sm:text-xl md:text-2xl`}>
            {product.name}
          </h3>
          <span className="text-base sm:text-lg md:text-xl font-light text-gray-900 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          {product.categoryName}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
