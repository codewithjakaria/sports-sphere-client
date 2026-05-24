
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: 'google' });
    } catch (err) {
      toast.error('Google sign-in failed');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Login failed');
      }

      toast.success('Welcome back!');
      router.push('/');
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070b12] flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full bg-[#1a4a2e] opacity-30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-40px] w-[200px] h-[200px] rounded-full bg-[#0d3d24] opacity-25 blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-[420px] bg-[#0d1520] border border-[#1e2d3d] rounded-[20px] px-9 py-10 z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-black text-[22px] text-slate-100">
            Welcome Back
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">Sign in to continue</p>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#111827] border border-[#1e2d3d] rounded-xl text-slate-300 text-sm font-medium hover:bg-[#141f2e] transition-all"
        >
          {/* Google Icon (fixed size) */}
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C36.68 2.69 30.82 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.55c0-1.57-.14-3.09-.4-4.55H24v9.02h12.44c-.54 2.9-2.16 5.36-4.61 7.02l7.19 5.6C43.9 37.1 46.1 31.34 46.1 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.54 28.41c-1.02-3.05-1.02-6.31 0-9.36l-7.98-6.19C.82 16.09 0 19.96 0 24s.82 7.91 2.56 11.14l7.98-6.73z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.19-5.6c-2 1.34-4.59 2.14-8.72 2.14-6.26 0-11.57-4.22-13.46-9.93l-7.98 6.73C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#1e2d3d]" />
          <span className="text-[11px] text-slate-600 uppercase">or</span>
          <div className="flex-1 h-px bg-[#1e2d3d]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs text-slate-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#111827] border border-[#1e2d3d] text-slate-200 outline-none focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-slate-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#111827] border border-[#1e2d3d] text-slate-200 outline-none focus:border-green-500"
            />
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-green-400">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold disabled:opacity-60"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-green-400">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}