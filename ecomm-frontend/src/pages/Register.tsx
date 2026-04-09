import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, User as UserIcon, MoveRight } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: Date.now(), name, email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-lg w-full reveal">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-medium tracking-tighter mb-4 italic">Create ID.</h1>
          <p className="text-gray-500 font-light text-lg">Join our community of modern creators.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-12 md:p-16 rounded-[48px] shadow-sm border border-gray-100 space-y-10 group">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-xl font-light"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-xl font-light"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-xl font-light"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-8 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:scale-[1.03] transition-all shadow-2xl shadow-black/10 mt-6 flex items-center justify-center gap-4"
          >
            Create Account <MoveRight className="w-6 h-6" />
          </button>
        </form>

        <p className="text-center mt-12 text-sm text-gray-400 font-light">
          Already have an ID? <Link to="/login" className="text-black font-bold hover:underline ml-2">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
