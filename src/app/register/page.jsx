'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Image, ArrowRight } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, photoUrl, password } = formData;

    if (!name || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
   
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl,
      });

      if (error) {
        throw new Error(error.message || 'Registration failed');
      }

      toast.success('Registration successful! Redirecting...');

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-24 pb-12 px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Create an{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Account
            </span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 text-sm focus:border-green-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 text-sm focus:border-green-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 text-sm focus:border-green-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600"
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>
        </form>
      </div>
    </main>
  );
}
