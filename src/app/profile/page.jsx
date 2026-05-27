'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  // ✅ session load হলে form fill হবে
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        image: session.user.image || '',
      });
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
        Not authorized
      </div>
    );
  }

  // ✅ input change handler (JS ONLY)
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session.user.email,
            name: formData.name,
            image: formData.image,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success('Profile updated successfully');
        // সেশন রিফ্রেশ করার জন্য এটি ব্যবহার করুন
        window.location.reload();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white">
            Edit <span className="text-emerald-400">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">Update your personal information</p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 space-y-6"
        >
          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400"
              placeholder="Enter image URL"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400"
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <input
              value={session.user.email}
              disabled
              className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
