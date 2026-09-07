import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function SiteDetails({ site, siteId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const showAdded = favouritesList?.includes(siteId) ?? false;

  if (!site) return null;

  async function favouritesClicked() {
    const newList = showAdded
      ? await removeFromFavourites(siteId)
      : await addToFavourites(siteId);

    setFavouritesList(newList);
  }

  return (
    <Container>
      <Row>
        <Col lg="5">
          {/* eslint-disable-next-line @next/next/no-img-element -- Remote image hosts are dynamic and come from API data. */}
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={site.image}
            alt={`${site.siteName || 'Historic site'} preview`}
          />
          <br />
          <br />
        </Col>

        <Col lg="7">
          <h3>{site.siteName}</h3>
          <p>{site.description}</p>
          <hr />

          <h5>Dates</h5>
          <ul>
            {(site.dates || []).map((date, index) => (
              <li key={`${date.year}-${date.type || index}`}>
                {date.year} {date.type ? `(${date.type})` : ''}
              </li>
            ))}
          </ul>

          <h5>Designated</h5>
          <p>{site.designated}</p>

          <h5>GPS Coordinates</h5>
          <p>
            {site.location?.latitude}, {site.location?.longitude}
          </p>

          <h5>Location</h5>
          <p>
            {site.location?.town}, {site.provinceOrTerritory?.name}
          </p>

          <h5>Region</h5>
          <p>{site.provinceOrTerritory?.region}</p>

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? 'Favourite added' : 'Add to favourites'}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
