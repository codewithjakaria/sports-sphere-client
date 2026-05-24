'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddFacility() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/facilities`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      },
    );

    if (res.ok) {
      toast.success('Facility added successfully!');
      router.push('/');
    } else {
      toast.error('Failed to add facility');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white/5 p-8 rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Facility</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-black/40 p-3 mb-4 rounded-xl border border-white/10"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full bg-black/40 p-3 mb-4 rounded-xl border border-white/10"
          onChange={e =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full bg-black/40 p-3 mb-4 rounded-xl border border-white/10"
          onChange={e => setFormData({ ...formData, image: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full bg-black/40 p-3 mb-4 rounded-xl border border-white/10"
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full bg-green-500 py-3 rounded-xl font-bold"
        >
          Add Facility
        </button>
      </form>
    </div>
  );
}
