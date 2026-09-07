import useSWR from 'swr';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

export default function SiteCard({ siteId }) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            'https://placehold.co/400x600?text=Cover+Not+Available';
        }}
        className="img-fluid w-100"
        src={data.image}
        alt="Site Image"
      />
      <Card.Body>
        <Card.Title>{data.siteName || ''}</Card.Title>
        <Card.Text>
          {data.location?.town || 'N/A'}, {data.provinceOrTerritory?.code || 'N/A'}
        </Card.Text>
        <Link href={`/sites/${siteId}`} className="btn btn-primary">
          View Site
        </Link>
      </Card.Body>
    </Card>
  );
}