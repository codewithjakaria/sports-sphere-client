'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import {
  ArrowLeft,
  MapPin,
  Users,
  Clock3,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Star,
  Wifi,
  Car,
  Trophy,
  ChevronRight,
} from 'lucide-react';

export default function FacilityDetailsPage({ id }) {
  const router = useRouter();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookingData, setBookingData] = useState({
    date: '',
    time_slot: '',
    duration: 1,
    players: 2,
    note: '',
  });

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!id) return;

    const fetchFacility = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
        );

        if (res.ok) {
          const data = await res.json();
          setFacility(data);
        } else {
          const { featuredFacilities } = await import('@/data/facilities');

          const found = featuredFacilities.find(
            f => f._id === id || f.id === parseInt(id),
          );

          setFacility(found || null);
        }
      } catch (error) {
        console.error(error);
        setFacility(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const handleBooking = async () => {
    if (!facility) return;

    if (!session) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    if (!bookingData.date || !bookingData.time_slot) {
      toast.error('Please complete all fields');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            facility_id: id,
            facility_name: facility.name,
            facility_image: facility.image,
            user_email: session.user.email,
            booking_date: bookingData.date,
            time_slot: bookingData.time_slot,
            players: bookingData.players,
            note: bookingData.note,
            total_price: facility.price * Number(bookingData.duration || 1),
            status: 'pending',
          }),
        },
      );

      if (res.ok) {
        toast.success('Booking Successful!');
        router.push('/my-bookings');
      } else {
        toast.error('Booking Failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin mx-auto mb-5" />
          <p className="text-gray-400">Loading Facility...</p>
        </div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white text-3xl font-black">
        Facility Not Found!
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* BACK */}
        <Link
          href="/facilities"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* IMAGE */}
            <div className="relative rounded-[30px] overflow-hidden border border-white/10">
              <img
                src={facility.image}
                className="w-full h-[500px] object-cover"
                alt={facility.name}
              />

              <div className="absolute top-5 left-5 flex gap-3">
                <span className="bg-emerald-500/90 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Premium
                </span>

                <span className="bg-black/40 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  4.9
                </span>
              </div>

              <div className="absolute bottom-6 left-6">
                <h1 className="text-4xl font-black">{facility.name}</h1>

                <div className="flex gap-5 text-gray-300 mt-2">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {facility.location || 'Dhaka'}
                  </span>

                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {facility.capacity || 10}
                  </span>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="bg-white/5 border border-white/10 rounded-[30px] p-8">
              <h2 className="text-2xl font-bold mb-3">About Facility</h2>
              <p className="text-gray-400">{facility.description}</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 sticky top-24">
            <h2 className="text-4xl font-black text-emerald-400 mb-6">
              ${facility.price}/hr
            </h2>

            {/* DATE PICKER (FIXED) */}
            <div className="mb-5">
              <label className="text-sm text-gray-400 mb-2 block">
                Booking Date
              </label>

              <DatePicker
                selected={bookingData.date ? new Date(bookingData.date) : null}
                onChange={date =>
                  setBookingData({
                    ...bookingData,
                    date: format(date, 'yyyy-MM-dd'),
                  })
                }
                minDate={new Date()}
                placeholderText="Select date"
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none"
              />
            </div>

            {/* TIME SLOT */}
            <div className="mb-5">
              <label className="text-sm text-gray-400 mb-2 block">
                Time Slot
              </label>

              <div className="relative">
                <Clock3 className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />

                <select
                  value={bookingData.time_slot}
                  onChange={e =>
                    setBookingData({
                      ...bookingData,
                      time_slot: e.target.value,
                    })
                  }
                  className="w-full bg-[#0B1120] border border-white/10 rounded-xl py-3 pl-10"
                >
                  <option value="">Select Slot</option>
                  <option>06:00 AM - 08:00 AM</option>
                  <option>08:00 AM - 10:00 AM</option>
                  <option>04:00 PM - 06:00 PM</option>
                  <option>07:00 PM - 09:00 PM</option>
                </select>
              </div>
            </div>

            {/* DURATION */}
            <div className="mb-5">
              <label className="text-sm text-gray-400 mb-2 block">
                Duration
              </label>

              <input
                type="number"
                min="1"
                value={bookingData.duration}
                onChange={e =>
                  setBookingData({
                    ...bookingData,
                    duration: e.target.value,
                  })
                }
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4"
              />
            </div>

            {/* PLAYERS */}
            <div className="mb-5">
              <label className="text-sm text-gray-400 mb-2 block">
                Players
              </label>

              <input
                type="number"
                min="1"
                value={bookingData.players}
                onChange={e =>
                  setBookingData({
                    ...bookingData,
                    players: e.target.value,
                  })
                }
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4"
              />
            </div>

            {/* NOTE */}
            <textarea
              rows={3}
              placeholder="Note..."
              value={bookingData.note}
              onChange={e =>
                setBookingData({
                  ...bookingData,
                  note: e.target.value,
                })
              }
              className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-3 mb-6"
            />

            {/* TOTAL */}
            <div className="mb-6">
              <p className="text-gray-400">Total</p>
              <h3 className="text-3xl font-bold text-emerald-400">
                ${facility.price * Number(bookingData.duration || 1)}
              </h3>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-4 rounded-xl font-bold hover:scale-[1.02] transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
