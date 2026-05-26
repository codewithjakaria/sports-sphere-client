'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function EditFacilityForm({ initialData, id }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        toast.success('Facility updated successfully');
        router.push('/manage-facilities');
      } else {
        const errorText = await res.text();
        console.error(errorText);
        toast.error('Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white">
            Edit <span className="text-emerald-400">Facility</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Update facility information and pricing details
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-black/40 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Facility Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition"
                placeholder="Enter facility name"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition"
                placeholder="Enter location"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Price (per hour)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Capacity
              </label>
              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition"
                placeholder="Enter capacity"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Image URL
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full h-12 bg-[#0B1120] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition"
              placeholder="Paste image URL"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition resize-none"
              placeholder="Write facility description..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Facility'}
          </button>
        </form>
      </div>
    </div>
  );
}
