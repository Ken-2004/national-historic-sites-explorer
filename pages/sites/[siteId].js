import { useRouter } from 'next/router';
import useSWR from 'swr';
import SiteDetails from '@/components/SiteDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

export default function Site() {
  const router = useRouter();
  const { siteId } = router.query;

  const { data, error, isLoading } = useSWR(
    siteId ? `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}` : null
  );

  if (isLoading) return null;

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.siteName} />
      <SiteDetails site={data} siteId={siteId} />
    </>
  );
}