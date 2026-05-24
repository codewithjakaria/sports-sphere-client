
import FacilityDetailsPage from '@/components/FacilityDetailsPage';

export default async function Page({ params }) {
  const { id } = await params;
  console.log('ID from URL:', id); 
  return <FacilityDetailsPage id={id} />;
}