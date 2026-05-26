import EditFacilityForm from '@/components/EditFacilityForm';

async function getFacility(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/facilities/${id}`,
    { cache: 'no-store' },
  );
  return res.json();
}

export default async function EditPage({ params }) {
  const { id } = await params;
  const data = await getFacility(id);

  return (
    <div className="min-h-screen bg-black p-10">
      <EditFacilityForm initialData={data} id={id} />
    </div>
  );
}
