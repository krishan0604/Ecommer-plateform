import React from 'react';

interface ProductSkeletonProps {
  variant?: 'default' | 'featured' | 'wide';
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] bg-gray-100 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skeleton-shimmer" />
        <div className="absolute bottom-10 left-10 space-y-4 w-1/3">
          <div className="h-3 bg-gray-200/50 rounded-full w-1/2" />
          <div className="h-12 bg-gray-200/50 rounded-2xl w-full" />
          <div className="h-6 bg-gray-200/50 rounded-full w-1/3" />
        </div>
      </div>
    );
  }

  if (variant === 'wide') {
    return (
      <div className="flex flex-col sm:flex-row rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-gray-100 animate-pulse h-48 sm:h-64">
        <div className="w-full sm:w-1/2 bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
        </div>
        <div className="flex-1 p-6 sm:p-8 space-y-4">
          <div className="h-3 bg-gray-200 rounded-full w-1/3" />
          <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-2/3" />
          <div className="flex justify-between items-center pt-4">
            <div className="h-8 bg-gray-200 rounded-full w-1/4" />
            <div className="h-10 bg-gray-200 rounded-full w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      {/* Image */}
      <div className="aspect-[4/5] rounded-[1.25rem] sm:rounded-[2rem] bg-gray-100 mb-4 sm:mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skeleton-shimmer" />
      </div>
      {/* Info */}
      <div className="space-y-2 px-1">
        <div className="flex justify-between gap-4">
          <div className="h-5 bg-gray-100 rounded-full flex-1" />
          <div className="h-5 bg-gray-100 rounded-full w-16" />
        </div>
        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
