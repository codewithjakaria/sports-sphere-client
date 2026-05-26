'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function EditFacilityForm({ initialData, id }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);

 const handleSubmit = async e => {
   e.preventDefault();

   // কনসোল লগ দিয়ে দেখুন ঠিক কোন ইউআরএল এ রিকোয়েস্ট যাচ্ছে
   console.log(
     'Request URL:',
     `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
   );

   const res = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
     {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     },
   );

   // এখানে চেক করুন রেসপন্স ঠিক আছে কি না
   if (res.ok) {
     toast.success('Updated!');
     router.push('/manage-facilities');
   } else {
     // যদি এরর হয়, তাহলে এরর টেক্সট দেখান, JSON পার্স করার আগে
     const errorText = await res.text();
     console.error('Server Error:', errorText);
     toast.error('Failed to update. Check console.');
   }
 };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-[#111111] p-8 rounded-2xl border border-green-900/30"
    >
      <div className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-black p-3 border border-gray-700 text-white rounded-lg"
          placeholder="Name"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full bg-black p-3 border border-gray-700 text-white rounded-lg"
          placeholder="Location"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-black p-3 border border-gray-700 text-white rounded-lg"
            placeholder="Price"
            required
          />
          <input
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full bg-black p-3 border border-gray-700 text-white rounded-lg"
            placeholder="Capacity"
            required
          />
        </div>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full bg-black p-3 border border-gray-700 text-white rounded-lg"
          placeholder="Image URL"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-black p-3 border border-gray-700 text-white rounded-lg h-32"
          placeholder="Description"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 mt-6 p-3 text-white font-bold rounded-lg"
      >
        Update Facility
      </button>
    </form>
  );
}
