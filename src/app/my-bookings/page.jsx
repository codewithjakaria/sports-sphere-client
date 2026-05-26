'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';

import {
  Trash2,
  Loader2,
  Calendar,
  Clock,
  LayoutGrid,
  PlusCircle,
  Settings,
  Home,
  Filter,
  MapPin,
  Users,
  CreditCard,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';

import { featuredFacilities } from '@/data/facilities';

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (isPending) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?email=${session?.user?.email}`,
        );

        const data = await res.json();

        const mapped = data.map(b => {
          const matchedFacility = featuredFacilities.find(f =>
            f.name?.toLowerCase().includes(b.facility_name?.toLowerCase()),
          );

          return {
            ...b,
            image_url:
              b.facility_image ||
              matchedFacility?.image ||
              'https://placehold.co/600x400',

            location: matchedFacility?.location || 'Dhaka, Bangladesh',

            players: b.players || 2,

            note: b.note || '',
          };
        });

        setBookings(mapped);
      } catch (err) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, isPending]);

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to cancel?')) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (res.ok) {
      setBookings(prev => prev.filter(b => b._id !== id));

      toast.success('Booking cancelled!');
    }
  };

  const filteredBookings = useMemo(() => {
    return filter === 'All'
      ? bookings
      : bookings.filter(b => b.status === filter);
  }, [bookings, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-black/40 backdrop-blur-2xl border-r border-white/10 flex-col p-8">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            SportNest
          </h1>

          <p className="text-gray-500 text-sm mt-2">Premium Sports Booking</p>
        </div>

        <nav className="flex flex-col gap-3 mt-12">
          <Link
            href="/"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-green-400 transition"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            href="/my-bookings"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/20 text-green-400 font-semibold"
          >
            <LayoutGrid size={20} />
            My Bookings
          </Link>

          <Link
            href="/add-facility"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-green-400 transition"
          >
            <PlusCircle size={20} />
            Add Facility
          </Link>

          <Link
            href="/manage-facilities"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-green-400 transition"
          >
            <Settings size={20} />
            Manage Facilities
          </Link>
        </nav>

        <div className="mt-auto bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/10 rounded-3xl p-6">
          <Sparkles className="text-green-400 mb-4" />

          <h3 className="font-bold text-lg mb-2">Premium Experience</h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            Book premium sports facilities with seamless experience.
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 p-6 md:p-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-4xl font-black mb-2">My Bookings</h2>

              <p className="text-gray-400">
                Manage and track all your facility bookings
              </p>
            </div>

            {/* FILTER */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-xl">
              <Filter size={18} className="text-green-400" />

              <select
                onChange={e => setFilter(e.target.value)}
                className="bg-transparent text-white outline-none"
              >
                <option value="All" className="bg-slate-900">
                  All Status
                </option>

                <option value="pending" className="bg-slate-900">
                  Pending
                </option>

                <option value="confirmed" className="bg-slate-900">
                  Confirmed
                </option>
              </select>
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-[30px] p-16 text-center backdrop-blur-xl">
              <LayoutGrid className="w-14 h-14 text-green-400 mx-auto mb-6" />

              <h3 className="text-3xl font-bold mb-3">No Bookings Found</h3>

              <p className="text-gray-400 mb-8">
                You haven’t booked any facilities yet.
              </p>

              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 rounded-2xl font-semibold"
              >
                Explore Facilities
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredBookings.map(b => (
                <div
                  key={b._id}
                  className="group bg-white/5 border border-white/10 hover:border-green-500/30 rounded-[32px] overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-4">
                    {/* IMAGE */}
                    <div className="relative h-full min-h-[280px] overflow-hidden">
                      <img
                        src={b.image_url}
                        alt={b.facility_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-5 left-5">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md ${
                            b.status === 'confirmed'
                              ? 'bg-green-500/90 text-white'
                              : 'bg-yellow-500/90 text-black'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="xl:col-span-3 p-8 flex flex-col justify-between">
                      <div>
                        {/* TITLE */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                          <div>
                            <h3 className="text-3xl font-black mb-3">
                              {b.facility_name}
                            </h3>

                            <div className="flex flex-wrap gap-5 text-gray-400">
                              <span className="flex items-center gap-2">
                                <MapPin size={18} className="text-green-400" />
                                {b.location}
                              </span>

                              <span className="flex items-center gap-2">
                                <Users size={18} className="text-green-400" />
                                {b.players} Players
                              </span>

                              <span className="flex items-center gap-2">
                                <BadgeCheck
                                  size={18}
                                  className="text-green-400"
                                />
                                Verified Booking
                              </span>
                            </div>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-gray-400 text-sm">Total Price</p>

                            <h2 className="text-4xl font-black text-green-400">
                              ${b.total_price}
                            </h2>
                          </div>
                        </div>

                        {/* BOOKING DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <Calendar className="w-5 h-5 text-green-400" />

                              <p className="text-sm text-gray-400">
                                Booking Date
                              </p>
                            </div>

                            <h4 className="font-bold text-lg">
                              {b.booking_date}
                            </h4>
                          </div>

                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <Clock className="w-5 h-5 text-green-400" />

                              <p className="text-sm text-gray-400">Time Slot</p>
                            </div>

                            <h4 className="font-bold text-lg">{b.time_slot}</h4>
                          </div>

                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <CreditCard className="w-5 h-5 text-green-400" />

                              <p className="text-sm text-gray-400">Payment</p>
                            </div>

                            <h4 className="font-bold text-lg capitalize">
                              {b.status}
                            </h4>
                          </div>
                        </div>

                        {/* NOTE */}
                        {b.note && (
                          <div className="mt-6 bg-green-500/5 border border-green-500/10 rounded-2xl p-5">
                            <p className="text-sm text-green-400 mb-2">
                              Additional Note
                            </p>

                            <p className="text-gray-300 leading-relaxed">
                              {b.note}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link
                          href={`/facility/${b.facility_id}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 py-4 rounded-2xl text-center font-bold transition"
                        >
                          View Facility
                        </Link>

                        <button
                          onClick={() => handleDelete(b._id)}
                          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >
                          <Trash2 size={18} />
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
