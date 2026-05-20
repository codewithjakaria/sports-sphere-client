'use client';

import { useState } from 'react';
import Link from 'next/link';
import { featuredFacilities } from '@/data/facilities';
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export default function AllFacilities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // ইউনিক ক্যাটাগরি লিস্ট বের করা ফিল্টার বাটনের জন্য
  const categories = [
    'ALL',
    ...new Set(featuredFacilities.map(f => f.category)),
  ];

  // সার্চ এবং ক্যাটাগরি অনুযায়ী ডাটা ফিল্টার করার লজিক
  const filteredFacilities = featuredFacilities.filter(facility => {
    const matchesSearch = facility.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || facility.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            All Available{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Facilities
            </span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Browse and book the best sports zones in town instantly.
          </p>
        </div>

        {/* Search & Filter Controls Section */}
        <div className="bg-white/5 border border-white/5 p-4 md:p-6 rounded-3xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search facility by name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Category Tabs / Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid View */}
        {filteredFacilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map(facility => (
              <div
                key={facility.id}
                className="group bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-green-500/30 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden shrink-0">
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

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <h4 className="font-bold text-lg text-gray-100 group-hover:text-green-400 transition duration-200 line-clamp-2 mb-4">
                    {facility.name}
                  </h4>
                  <div className="mt-auto">
                    <Link
                      href={`/facility/${facility.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-200 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:text-white hover:border-transparent transition-all duration-300 group/btn"
                    >
                      Book Now
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Data State */
          <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl">
            <SlidersHorizontal className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-300">
              No Facilities Found
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Try resetting your filters or search queries.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
