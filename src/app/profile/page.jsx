'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSession, authClient } from '@/lib/auth-client';
import { Camera, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', image: '' });

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
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });

      if (error) {
        toast.error(error.message || 'Update failed');
        return;
      }

      toast.success('Profile updated successfully');
      window.location.reload();
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = formData.image || '/avatar.png';

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white">
            Edit <span className="text-emerald-400">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">Update your personal information</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 space-y-6"
        >
          {/* AVATAR PREVIEW */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={avatarSrc}
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-400/40"
                onError={e => {
                  e.currentTarget.src = '/avatar.png';
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Paste image URL below to change photo
            </p>
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 transition"
              placeholder="https://example.com/photo.jpg"
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
              className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 transition"
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <input
              value={session.user.email}
              disabled
              className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:scale-[1.02] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
