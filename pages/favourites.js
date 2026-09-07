import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import SiteCard from '@/components/SiteCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <>
        <PageHeader
          text="No favourites yet"
          subtext="Add a site to your favourites to see it here."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Sites" />
      <Row className="gy-4">
        {favouritesList.map((siteId) => (
          <Col key={siteId} lg={3} md={6}>
            <SiteCard siteId={siteId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
