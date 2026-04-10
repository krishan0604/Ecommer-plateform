import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, User as UserIcon, MoveRight } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth({ id: Date.now(), name, email }, 'dummy-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center px-4 pt-20 pb-12">
      <div className="max-w-lg w-full reveal">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-5xl sm:text-6xl font-medium tracking-tighter mb-3 sm:mb-4 italic">Create ID.</h1>
          <p className="text-gray-500 font-light text-base sm:text-lg">Join our community of modern creators.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white px-8 py-10 sm:p-12 md:p-16 rounded-[36px] sm:rounded-[48px] shadow-sm border border-gray-100 space-y-7 sm:space-y-10 group"
        >
          <div className="space-y-3 sm:space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                required
                id="register-name"
                className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-lg sm:text-xl font-light"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                required
                id="register-email"
                className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-lg sm:text-xl font-light"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                type="password"
                required
                id="register-password"
                className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-lg sm:text-xl font-light"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            id="register-submit"
            className="w-full bg-black text-white py-6 sm:py-8 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:scale-[1.03] transition-all shadow-2xl shadow-black/10 mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4"
          >
            Create Account <MoveRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </form>

        <p className="text-center mt-8 sm:mt-12 text-sm text-gray-400 font-light">
          Already have an ID?{' '}
          <Link to="/login" className="text-black font-bold hover:underline ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
