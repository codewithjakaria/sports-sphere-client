'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const MyBookingsPage = () => {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?email=${session.user.email}`,
        { credentials: 'include' },
      );
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      fetchBookings();
    }
  }, [session, isPending]);

  const handleCancel = async id => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        },
      );

      if (!res.ok) throw new Error('Failed');

      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-slate-900">
        <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-black text-white mb-8">
          My <span className="text-green-400">Bookings</span>
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm text-gray-300">
              <thead className="bg-white/5 text-green-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Facility</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Time Slot</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map(booking => (
                  <tr
                    key={booking._id}
                    className="hover:bg-white/5 transition-all"
                  >
                    <td className="px-6 py-4 font-semibold text-white">
                      {booking.facility_name}
                    </td>
                    <td className="px-6 py-4">{booking.booking_date}</td>
                    <td className="px-6 py-4">{booking.time_slot}</td>
                    <td className="px-6 py-4 text-green-400 font-bold">
                      ${booking.total_price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'cancelled'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="px-4 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 font-bold text-xs transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
