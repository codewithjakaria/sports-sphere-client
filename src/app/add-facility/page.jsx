'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

import {
  Building2,
  DollarSign,
  ImageIcon,
  FileText,
  MapPin,
  Users,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Upload,
  Clock3,
} from 'lucide-react';

import Link from 'next/link';

export default function AddFacility() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    price: '',
    image: '',
    description: '',
    category: '',
    opening_hours: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error('Please login first');
      return;
    }

    setLoading(true);

    const facilityData = {
      ...formData,
      owner_email: session.user.email,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/facilities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(facilityData),
        },
      );

      if (res.ok) {
        toast.success('Facility Added Successfully!');
        router.push('/manage-facilities');
      } else {
        toast.error('Failed to Add Facility');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white relative overflow-hidden pt-24 pb-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        {/* BACK BUTTON */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-all mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-sm font-semibold mb-6">
                  <Sparkles size={16} />
                  Professional Facility Panel
                </div>

                <h1 className="text-5xl font-black leading-tight mb-6">
                  Add Your
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {' '}
                    Sports Facility
                  </span>
                </h1>

                <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                  Create a premium facility listing with detailed information,
                  pricing, images, and booking availability.
                </p>

                {/* FEATURES */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-2xl">
                      <ShieldCheck className="text-emerald-400 w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Verified Listing
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Professional sports facility management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-cyan-500/10 p-3 rounded-2xl">
                      <Upload className="text-cyan-400 w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Instant Publishing
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Your facility becomes available immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-violet-500/10 p-3 rounded-2xl">
                      <Clock3 className="text-violet-400 w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-1">Smart Booking</h3>

                      <p className="text-gray-400 text-sm">
                        Manage schedules and reservations easily.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PREVIEW CARD */}
                <div className="mt-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[28px] overflow-hidden">
                  <div className="h-44 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white/70" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-black text-xl">Premium Turf Arena</h3>

                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                        VERIFIED
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      Modern football turf with floodlights, changing room and
                      premium environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="border-b border-white/10 p-8 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
                <h2 className="text-4xl font-black mb-3">
                  Facility Information
                </h2>

                <p className="text-gray-400">
                  Fill all required details to create your facility listing.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-7">
                {/* NAME */}
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <Building2 size={17} className="text-emerald-400" />
                    Facility Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter facility name"
                    className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                    onChange={e =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* LOCATION + CATEGORY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <MapPin size={17} className="text-emerald-400" />
                      Location
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Dhaka, Bangladesh"
                      className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                      onChange={e =>
                        setFormData({
                          ...formData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-3">
                      Facility Category
                    </label>

                    <select
                      required
                      className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                      onChange={e =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose Category</option>
                      <option value="Football">Football Turf</option>
                      <option value="Cricket">Cricket Ground</option>
                      <option value="Badminton">Badminton Court</option>
                      <option value="Swimming">Swimming Pool</option>
                      <option value="Tennis">Tennis Court</option>
                    </select>
                  </div>
                </div>

                {/* PRICE + CAPACITY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <DollarSign size={17} className="text-emerald-400" />
                      Price Per Hour
                    </label>

                    <input
                      type="number"
                      required
                      placeholder="$50"
                      className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                      onChange={e =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Users size={17} className="text-emerald-400" />
                      Capacity
                    </label>

                    <input
                      type="number"
                      required
                      placeholder="Maximum players"
                      className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                      onChange={e =>
                        setFormData({
                          ...formData,
                          capacity: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* HOURS */}
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-3">
                    Opening Hours
                  </label>

                  <input
                    type="text"
                    placeholder="06:00 AM - 11:00 PM"
                    className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                    onChange={e =>
                      setFormData({
                        ...formData,
                        opening_hours: e.target.value,
                      })
                    }
                  />
                </div>

                {/* IMAGE */}
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <ImageIcon size={17} className="text-emerald-400" />
                    Facility Image URL
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all"
                    onChange={e =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      })
                    }
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <FileText size={17} className="text-emerald-400" />
                    Description
                  </label>

                  <textarea
                    rows={6}
                    required
                    placeholder="Describe your facility..."
                    className="w-full bg-black/30 border border-white/10 focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none transition-all resize-none"
                    onChange={e =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 transition-all py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20 disabled:opacity-50"
                >
                  {loading ? 'Publishing Facility...' : 'Publish Facility'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
