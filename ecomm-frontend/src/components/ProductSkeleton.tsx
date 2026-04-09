import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-100 rounded-full w-1/4" />
          <div className="h-10 bg-gray-100 rounded-xl w-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
