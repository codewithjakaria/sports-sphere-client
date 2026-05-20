import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 uppercase mb-6 animate-pulse">
          Premium Sports Facility Booking
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
          Book Your Perfect <br />
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Sports Arena
          </span>{' '}
          Easily
        </h1>

        <p className="mt-6 text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Discover, book, and play at the finest sports turfs, courts, and
          complexes in your area. Seamless scheduling and secure bookings start
          here.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/all-facility"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 hover:opacity-95 transition duration-200 text-center"
          >
            Explore Facilities
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide text-gray-300 hover:text-white border border-white/10 hover:bg-white/5 transition duration-200 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};

export default Hero;
