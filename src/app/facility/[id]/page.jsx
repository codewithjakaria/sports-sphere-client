import Link from 'next/link';
import { featuredFacilities } from '@/data/facilities';
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  Users,
} from 'lucide-react';

export default async function FacilityDetails({ params }) {

  const { id } = await params;

  const facility = featuredFacilities.find(f => f.id === parseInt(id));


  if (!facility) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-black mb-4 text-red-400">
          Facility Not Found!
        </h2>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-green-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-green-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Explore
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Large Image Banner */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-6 left-6 bg-green-500 text-white text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                {facility.category}
              </span>
            </div>

            {/* Title & Description */}
            <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-3xl space-y-4">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-gray-100">
                {facility.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span>Premium Sports Complex, Kushtia, Bangladesh</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed pt-2">
                Experience world-class sporting infrastructure with our
                top-rated venue. This facility comes equipped with
                professional-grade flooring/turf, advanced floodlighting for
                night matches, and comfortable dugouts. Perfect for friendly
                matches, competitive tournaments, or regular practice sessions.
              </p>
            </div>

            {/* Amenities / Features */}
            <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-4 text-gray-200">
                Venue Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-medium text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Free
                  Parking
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-medium text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Changing
                  Rooms
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-medium text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Night
                  Lights
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-medium text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Drinking
                  Water
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-medium text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> First Aid
                  Box
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-medium text-gray-300">
                  <Users className="w-4 h-4 text-green-400" /> Rest Area
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl sticky top-24">
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-white/5">
                <span className="text-sm font-semibold text-gray-400">
                  Price per hour
                </span>
                <div className="flex items-center text-2xl font-black text-green-400">
                  <DollarSign className="w-6 h-6 -mr-1" />
                  {facility.price}
                </div>
              </div>

              {/* Pseudo Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type="date"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Select Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 focus:outline-none focus:border-green-500 transition-colors appearance-none">
                      <option value="">Choose a slot</option>
                      <option value="06:00 AM">06:00 AM - 08:00 AM</option>
                      <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                      <option value="06:00 PM">06:00 PM - 08:00 PM</option>
                      <option value="08:00 PM">08:00 PM - 10:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Total Summary Example */}
              <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-xs text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>1 Hour Booking</span>
                  <span>${facility.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>$2.00</span>
                </div>
                <div className="flex justify-between font-bold text-gray-200 pt-2 border-t border-white/5 text-sm">
                  <span>Total Payable</span>
                  <span className="text-green-400">
                    ${facility.price + 2}.00
                  </span>
                </div>
              </div>

              {/* Instant Book Button */}
              <button className="w-full text-center py-3.5 mt-6 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] transition-all duration-200">
                Book Venue Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
