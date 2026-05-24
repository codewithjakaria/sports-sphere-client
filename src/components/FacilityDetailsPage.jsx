
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { ArrowLeft } from 'lucide-react';

export default function FacilityDetailsPage({ id }) {
  const router = useRouter();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({ date: '', time_slot: '' });
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
       
          const module = await import('@/data/facilities');
          const found = module.featuredFacilities.find(
            f => f.id === parseInt(id),
          );
          setFacility(found);
        }
      } catch (error) {
        console.error('Error fetching facility:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const handleBooking = async () => {
    if (!session) {
      toast.error('Please login to book a facility');
      router.push('/login');
      return;
    }

    if (!bookingData.date || !bookingData.time_slot) {
      toast.error('Please select date and time slot');
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
            user_email: session.user.email,
            booking_date: bookingData.date,
            time_slot: bookingData.time_slot,
            total_price: facility.price,
            status: 'pending',
          }),
        },
      );

      if (res.ok) {
        toast.success('Booking successful!');
        router.push('/my-bookings');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to book');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (!facility)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Facility Not Found!
      </div>
    );

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-green-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-white/5">
              <img
                src={facility.image || '/placeholder.jpg'}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white/5 p-8 rounded-3xl space-y-4">
              <h1 className="text-4xl font-black">{facility.name}</h1>
              <p className="text-gray-400">{facility.description}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 p-8 rounded-3xl sticky top-24">
              <div className="flex justify-between mb-6 pb-4 border-b border-white/5">
                <span className="text-sm">Price per hour</span>
                <span className="text-2xl font-black text-green-400">
                  ${facility.price}
                </span>
              </div>
              <div className="space-y-4">
                <input
                  type="date"
                  onChange={e =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4"
                />
                <select
                  onChange={e =>
                    setBookingData({
                      ...bookingData,
                      time_slot: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4"
                >
                  <option value="">Choose a slot</option>
                  <option value="06:00 AM">06:00 AM - 08:00 AM</option>
                  <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
              <button
                onClick={handleBooking}
                className="w-full py-3.5 mt-6 rounded-xl bg-green-500 font-bold hover:bg-green-600 transition"
              >
                Book Venue Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}