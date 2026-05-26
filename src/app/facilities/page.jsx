'use client'; 

import FacilitySearch from '@/components/FacilitySearch';

export default function AllFacilities() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-5xl font-black mb-10">
          All <span className="text-green-400">Facilities</span>
        </h1>
        <FacilitySearch />
      </div>
    </main>
  );
}
