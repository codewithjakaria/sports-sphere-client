'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ManageFacilitiesPage() {
  const { data: session } = useSession();
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-facilities?email=${session.user.email}`,
        { credentials: 'include' },
      )
        .then(res => res.json())
        .then(data => setFacilities(data))
        .catch(() => toast.error('Failed to load facilities'));
    }
  }, [session]);

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this facility?')) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (res.ok) {
      toast.success('Deleted!');
      setFacilities(prev => prev.filter(f => f._id !== id));
    } else {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="pt-32 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Manage My Facilities
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.map(f => (
          <div
            key={f._id}
            className="border border-white/10 p-4 rounded-xl bg-slate-900"
          >
            <img
              src={f.image}
              className="w-full h-40 object-cover rounded"
              alt={f.name}
            />
            <h2 className="text-xl font-bold mt-2 text-white">{f.name}</h2>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/facilities/edit-facility/${f._id}`}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 text-center flex-1"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(f._id)}
                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
