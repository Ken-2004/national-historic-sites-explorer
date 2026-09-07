import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { isAuthenticated, readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);

  function logout() {
    setFavouritesList(undefined);
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand as={Link} href="/" className="text-wrap">
            National Historic Sites Explorer
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {isAuthenticated() ? (
              <NavDropdown title={readToken()?.userName} id="main-nav-dropdown">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
