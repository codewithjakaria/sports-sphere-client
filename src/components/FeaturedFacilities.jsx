import Link from 'next/link';
import { featuredFacilities } from '@/data/facilities';

const FeaturedFacilities = () => {
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className="text-2xl md:text-4xl font-black tracking-tight">
            Featured{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Facilities
            </span>
          </h3>
          <p className="text-gray-400 mt-2 text-xs md:text-sm">
            Top-rated venues available for your next game
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredFacilities && featuredFacilities.length > 0 ? (
            featuredFacilities.map(facility => (
              <div
                key={facility.id}
                className="group bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-green-500/30"
              >
                {/* Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={facility.image}
                    alt={facility.name}
                  />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-green-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {facility.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-md">
                    ${facility.price}/
                    <span className="text-[10px] font-medium opacity-80">
                      hr
                    </span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between h-32">
                  <h4 className="font-bold text-lg text-gray-100 group-hover:text-green-400 transition duration-200 line-clamp-1">
                    {facility.name}
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href={`/facility/${facility.id}`}
                      className="w-full text-center py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-200 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:text-white hover:border-transparent transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-full text-center">
              No facilities found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
