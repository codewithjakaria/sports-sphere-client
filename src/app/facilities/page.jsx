// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Search, SlidersHorizontal, ArrowUpRight, Loader2 } from 'lucide-react';

// export default function AllFacilities() {
//   const [facilities, setFacilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('ALL');

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/facilities`,
//         );
//         if (!res.ok) throw new Error('Failed to fetch');
//         const data = await res.json();
//         setFacilities(data);
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFacilities();
//   }, []);

//   const categories = [
//     'ALL',
//     ...new Set(facilities.map(f => f.category).filter(Boolean)),
//   ];

//   const filteredFacilities = facilities.filter(facility => {
//     const matchesSearch = facility.name
//       ?.toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === 'ALL' || facility.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <main className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
//       <div className="container mx-auto px-6 max-w-6xl">
//         <div className="mb-10 text-center md:text-left">
//           <h1 className="text-3xl md:text-5xl font-black tracking-tight">
//             All Available{' '}
//             <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
//               Facilities
//             </span>
//           </h1>
//         </div>

//         <div className="bg-white/5 border border-white/5 p-4 md:p-6 rounded-3xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md">
//           <input
//             type="text"
//             placeholder="Search facility by name..."
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//             className="w-full md:max-w-md bg-black/40 border border-white/10 rounded-xl py-3 pl-4 text-sm focus:outline-none focus:border-green-500"
//           />
//           <div className="flex flex-wrap gap-2 justify-center">
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
//                   selectedCategory === cat
//                     ? 'bg-green-500'
//                     : 'bg-white/5 border border-white/10'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <Loader2 className="w-10 h-10 animate-spin text-green-500" />
//           </div>
//         ) : filteredFacilities.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredFacilities.map(f => (
//               <div
//                 key={f._id}
//                 className="group bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all hover:border-green-500/30"
//               >
//                 <img
//                   src={f.image}
//                   alt={f.name}
//                   className="h-56 w-full object-cover"
//                 />
//                 <div className="p-5">
//                   <h4 className="font-bold text-lg mb-4">{f.name}</h4>
//                   <Link
//                     href={`/facility/${f._id}`}
//                     className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-green-600 font-bold text-xs transition-all"
//                   >
//                     Book Now <ArrowUpRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl">
//             <SlidersHorizontal className="w-12 h-12 mx-auto text-gray-600 mb-4" />
//             <h3 className="text-xl font-bold">No Facilities Found</h3>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { featuredFacilities } from '@/data/facilities';
import { Search, SlidersHorizontal, ArrowUpRight, Loader2 } from 'lucide-react';

export default function AllFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/facilities`,
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const dbData = await res.json();

        // ১. ডাটাবেসের ত্রুটিপূর্ণ বা খালি ডাটা ফিল্টার করা
        const validDbData = dbData.filter(
          f => f && f.name && f.name.trim() !== '',
        );

        // ২. ডাটাবেস এবং স্ট্যাটিক ডাটা মিক্স করা
        const combinedData = [...validDbData, ...featuredFacilities];

        // ৩. ডুপ্লিকেট এন্ট্রি রিমুভ করা
        const uniqueData = Array.from(
          new Map(
            combinedData.map(item => [item._id || item.id, item]),
          ).values(),
        );

        setFacilities(uniqueData);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        setFacilities(featuredFacilities);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const categories = [
    'ALL',
    ...new Set(facilities.map(f => f.category).filter(Boolean)),
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || facility.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            All Available{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Facilities
            </span>
          </h1>
        </div>

        {/* সার্চ এবং ফিল্টার */}
        <div className="bg-white/5 border border-white/5 p-4 md:p-6 rounded-3xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md">
          <input
            type="text"
            placeholder="Search facility by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:max-w-md bg-black/40 border border-white/10 rounded-xl py-3 pl-4 text-sm focus:outline-none focus:border-green-500"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${selectedCategory === cat ? 'bg-green-500' : 'bg-white/5 border border-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* লোডিং ও ডাটা রেন্ডারিং */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
          </div>
        ) : filteredFacilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map(f => (
              <div
                key={f._id || f.id}
                className="group bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all hover:border-green-500/30"
              >
                <img
                  src={
                    f.image && f.image.trim() !== ''
                      ? f.image
                      : 'https://via.placeholder.com/400'
                  }
                  alt={f.name || 'Facility'}
                  className="h-56 w-full object-cover"
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                <div className="p-5">
                  <h4 className="font-bold text-lg mb-4">{f.name}</h4>
                  <Link
                    href={`/facility/${f._id || f.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-green-600 font-bold text-xs transition-all"
                  >
                    Book Now <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl">
            <SlidersHorizontal className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold">No Facilities Found</h3>
          </div>
        )}
      </div>
    </main>
  );
}