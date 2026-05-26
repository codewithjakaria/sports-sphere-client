'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { featuredFacilities } from '@/data/facilities';
import { ArrowUpRight, Loader2, Search, CalendarDays } from 'lucide-react';

export default function FacilitySearch() {
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
        if (!res.ok) throw new Error('API Error');

        const dbData = await res.json();
        const combined = [
          ...(Array.isArray(dbData) ? dbData : []),
          ...featuredFacilities,
        ];
        const unique = Array.from(
          new Map(combined.map(item => [item._id || item.id, item])).values(),
        );

        setFacilities(unique);
      } catch (err) {
        setFacilities(featuredFacilities);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const filtered = useMemo(() => {
    return facilities.filter(f => {
      const name = f?.name?.toLowerCase() || '';
      const matchesSearch = name.includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'ALL' || f?.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [facilities, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(facilities.map(f => f.category).filter(Boolean));
    return ['ALL', ...Array.from(cats)];
  }, [facilities]);

  return (
    <section className="relative py-10">
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/20 blur-3xl rounded-full -z-10" />

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search facilities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/30 border border-white/10 focus:border-green-500/60 text-white rounded-2xl py-3 pl-12 pr-4 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
                  selectedCategory === cat
                    ? 'bg-green-500 text-white'
                    : 'bg-white/5 text-gray-300 border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-green-500" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map(f => (
            <div
              key={f._id || f.id}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    f.image &&
                    (f.image.startsWith('http') ||
                      f.image.startsWith('data:image'))
                      ? f.image
                      : f.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/${f.image.replace(/^\/+/, '')}`
                        : 'https://placehold.co/600x400/png?text=No+Image'
                  }
                  alt={f.name}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://placehold.co/600x400/png?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    {f.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-xl">{f.name}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Premium sports facility with modern environment.
                </p>
                <Link
                  href={`/facility/${f._id || f.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-white bg-green-500 px-4 py-2 rounded-xl"
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-20">
          No Facilities Found
        </div>
      )}
    </section>
  );
}
