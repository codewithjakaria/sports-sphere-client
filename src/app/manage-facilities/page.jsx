'use client';
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

import {
  Trash2,
  Edit2,
  Loader2,
  PlusCircle,
  Home,
  LayoutGrid,
  Settings,
  MapPin,
  DollarSign,
  Users,
  Sparkles,
  BadgeCheck,
  Search,
} from 'lucide-react';

import Link from 'next/link';

const FacilityImage = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-56 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[28px] flex items-center justify-center border border-white/10">
        <div className="text-center">
          <Sparkles className="mx-auto mb-3 text-emerald-400" />
          <p className="text-gray-500 font-semibold">No Preview Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px]">
      <img
        src={src}
        alt={alt}
        className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const ManageFacilitiesPage = () => {
  const { data: session, isPending } = useSession();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isPending) return;

    if (session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-facilities?email=${session.user.email}`,
        {
          credentials: 'include',
        },
      )
        .then(res => res.json())
        .then(data => {
          setFacilities(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error('Failed to load facilities');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session, isPending]);

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this facility?')) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );

      if (res.ok) {
        toast.success('Facility Deleted Successfully');

        setFacilities(prev => prev.filter(f => f._id !== id));
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('Error deleting facility');
    }
  };

  const filteredFacilities = useMemo(() => {
    return facilities.filter(f =>
      f.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [facilities, search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-400 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex-col p-8 relative z-10">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            SportNest
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Facility Management Dashboard
          </p>
        </div>

        <nav className="flex flex-col gap-3 mt-12">
          <Link
            href="/"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-emerald-400 transition-all"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            href="/my-bookings"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-emerald-400 transition-all"
          >
            <LayoutGrid size={20} />
            My Bookings
          </Link>

          <Link
            href="/add-facility"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-emerald-400 transition-all"
          >
            <PlusCircle size={20} />
            Add Facility
          </Link>

          <Link
            href="/manage-facilities"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 font-semibold"
          >
            <Settings size={20} />
            Manage Facilities
          </Link>
        </nav>

        {/* PREMIUM CARD */}
        <div className="mt-auto bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10 rounded-[28px] p-6">
          <Sparkles className="text-emerald-400 mb-4" />

          <h3 className="font-bold text-xl mb-2">Premium Dashboard</h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            Manage all your sports facilities with a modern and professional
            admin experience.
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative z-10 p-6 md:p-10">
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <BadgeCheck size={16} />
              Facility Control Center
            </div>

            <h1 className="text-5xl font-black mb-3">Manage Facilities</h1>

            <p className="text-gray-400 text-lg">
              Edit, update and manage your sports facility listings
            </p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Search facilities..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 focus:border-emerald-500 rounded-2xl pl-12 pr-5 py-4 outline-none w-full sm:w-72 backdrop-blur-xl"
              />
            </div>

            {/* ADD BUTTON */}
            <Link
              href="/add-facility"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 px-7 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-emerald-500/20"
            >
              <PlusCircle size={20} />
              Add Facility
            </Link>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredFacilities.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-20 text-center">
            <Sparkles className="mx-auto text-emerald-400 w-14 h-14 mb-6" />

            <h2 className="text-4xl font-black mb-4">No Facilities Found</h2>

            <p className="text-gray-400 mb-8 text-lg">
              Start by adding your first sports facility.
            </p>

            <Link
              href="/add-facility"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-4 rounded-2xl font-bold"
            >
              <PlusCircle size={20} />
              Add New Facility
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
            {filteredFacilities.map(f => (
              <div
                key={f._id}
                className="group bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-emerald-500/30 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <FacilityImage src={f.image} alt={f.name} />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-5 right-5 bg-emerald-500/90 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md">
                    ACTIVE
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  {/* TITLE */}
                  <div className="mb-5">
                    <h2 className="text-2xl font-black text-white line-clamp-1 mb-3">
                      {f.name}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <MapPin size={16} className="text-emerald-400" />

                      <span className="text-sm">
                        {f.location || 'Dhaka, Bangladesh'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Users size={16} className="text-cyan-400" />

                      <span className="text-sm">
                        Capacity: {f.capacity || 10} Players
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center justify-between bg-black/30 border border-white/10 rounded-2xl p-4 mb-7">
                    <div>
                      <p className="text-gray-400 text-sm">Price Per Hour</p>

                      <h3 className="text-3xl font-black text-emerald-400">
                        ${f.price}
                      </h3>
                    </div>

                    <div className="bg-emerald-500/10 p-4 rounded-2xl">
                      <DollarSign className="text-emerald-400" />
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-4">
                    <Link
                      href={`/facilities/edit-facility/${f._id}`}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-white py-4 rounded-2xl transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Edit2 size={18} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(f._id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-4 rounded-2xl transition-all font-bold flex items-center justify-center gap-2 border border-red-500/20"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageFacilitiesPage;
