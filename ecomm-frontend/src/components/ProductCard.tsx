import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block w-full">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 mb-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick Add Button overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 px-4 bg-white/95 backdrop-blur-sm shadow-sm text-black font-medium text-sm border border-gray-100 hover:bg-black hover:text-white transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-500 uppercase tracking-widest">{product.categoryName}</p>
        <h3 className="text-base font-medium text-gray-900 group-hover:underline underline-offset-4 decoration-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
