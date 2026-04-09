import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-white border border-gray-100 mb-8 transition-all duration-700 hover:shadow-xl">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />
        
        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-black/20"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Case
          </button>
        </div>

        <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2 px-2">
        <h3 className="text-2xl font-medium tracking-tight text-gray-900 group-hover:italic transition-all">
          {product.name}
        </h3>
        <div className="flex justify-between items-end">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            {product.categoryName}
          </p>
          <p className="text-xl font-light text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
