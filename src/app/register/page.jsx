'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({ provider: 'google' });
    } catch (err) {
      toast.error('Google sign-up failed');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, photoUrl, password, confirmPassword } = formData;

    if (!name || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
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
      if (error) throw new Error(error.message || 'Registration failed');
      toast.success('Account created! Redirecting...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070b12] flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full bg-[#1a4a2e] opacity-30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-40px] w-[200px] h-[200px] rounded-full bg-[#0d3d24] opacity-25 blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-[420px] bg-[#0d1520] border border-[#1e2d3d] rounded-[20px] px-9 py-10 z-10">
        {/* Gradient border shimmer */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, #22c55e22, transparent 50%, #10b98122)',
            padding: '1px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Brand */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 mb-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="font-black text-[22px] text-slate-100 tracking-tight">
            Create Account
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            Join us — it only takes a minute
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-2.5 py-[11px] px-4 bg-[#111827] border border-[#1e2d3d] rounded-xl text-slate-300 text-sm font-medium hover:border-[#2d4a6b] hover:bg-[#141f2e] transition-all mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#1e2d3d]" />
          <span className="text-[11px] uppercase tracking-wider text-slate-600">
            or register with email
          </span>
          <div className="flex-1 h-px bg-[#1e2d3d]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-[14px]">
          {/* Name + Email row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.8px] text-slate-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3.5 w-[15px] h-[15px] stroke-slate-500 fill-none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#111827] border border-[#1e2d3d] rounded-xl py-[11px] pl-9 pr-3 text-[13.5px] text-slate-200 placeholder-slate-600 outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.8px] text-slate-500 mb-2">
                Email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3.5 w-[15px] h-[15px] stroke-slate-500 fill-none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="you@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#111827] border border-[#1e2d3d] rounded-xl py-[11px] pl-9 pr-3 text-[13.5px] text-slate-200 placeholder-slate-600 outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.8px] text-slate-500 mb-2">
              Photo URL{' '}
              <span className="normal-case text-slate-600 font-normal">
                (optional)
              </span>
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-3.5 w-[15px] h-[15px] stroke-slate-500 fill-none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-full bg-[#111827] border border-[#1e2d3d] rounded-xl py-[11px] pl-10 pr-4 text-[13.5px] text-slate-200 placeholder-slate-600 outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5">
              Paste a direct image link for your avatar
            </p>
          </div>

          {/* Password + Confirm row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.8px] text-slate-500 mb-2">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3.5 w-[15px] h-[15px] stroke-slate-500 fill-none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#111827] border border-[#1e2d3d] rounded-xl py-[11px] pl-9 pr-3 text-[13.5px] text-slate-200 placeholder-slate-600 outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.8px] text-slate-500 mb-2">
                Confirm
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3.5 w-[15px] h-[15px] stroke-slate-500 fill-none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <polyline points="9 16 11 18 15 14" />
                </svg>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#111827] border border-[#1e2d3d] rounded-xl py-[11px] pl-9 pr-3 text-[13.5px] text-slate-200 placeholder-slate-600 outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 mt-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold tracking-wide hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
            {!loading && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </form>

        <p className="text-center text-[13px] text-slate-500 mt-5">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-green-400 font-medium hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  );
}
