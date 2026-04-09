import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-gray-500 text-lg mb-2">Thank you for your purchase.</p>
      <div className="inline-block bg-gray-100 px-6 py-2 rounded-full font-mono text-primary-600 font-bold mb-12">
        #ORD-{orderId || 'SUCCESS'}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/products"
          className="w-full sm:w-auto px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/25 flex items-center justify-center"
        >
          Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link
          to="/profile"
          className="w-full sm:w-auto px-10 py-4 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl transition-all flex items-center justify-center"
        >
          View Order History <ShoppingBag className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
