import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import SiteDetails from '@/components/SiteDetails';
import PageHeader from '@/components/PageHeader';

const SITE_ID = '697d4bfef9d0cea87314ba5e';

export default function About({ site }) {
  return (
    <>
      <PageHeader text="About National Historic Sites Explorer" />

      <Card>
        <Card.Body>
          <p>
            National Historic Sites Explorer is a full-stack web application I
            built to search and explore Canadian historic-site data through a
            custom REST API.
          </p>
          <p>
            The frontend uses Next.js, React, SWR, Bootstrap, authentication,
            favourites, search filters, and server-side data fetching.
          </p>
        </Card.Body>
      </Card>

      <br />

      {site ? (
        <SiteDetails site={site} siteId={SITE_ID} showFavouriteBtn={false} />
      ) : (
        <p>
          Connect the Sites API to display a live historic-site preview.
        </p>
      )}

      <p>
        <Link href="/">Back to Sites</Link>
      </p>
    </>
  );
}

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return {
      props: { site: null },
    };
  }

  try {
    const response = await fetch(`${apiUrl}/sites/${SITE_ID}`);

    if (!response.ok) {
      return {
        props: { site: null },
      };
    }

    const site = await response.json();

    return {
      props: { site },
    };
  } catch {
    return {
      props: { site: null },
    };
  }
}
