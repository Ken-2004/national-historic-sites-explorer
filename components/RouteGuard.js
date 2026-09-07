import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { isAuthenticated } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/about'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);

  const updateAtom = useCallback(async () => {
    if (!isAuthenticated()) return;

    try {
      const favs = await getFavourites();
      setFavouritesList(favs);
    } catch {
      setFavouritesList([]);
    }
  }, [setFavouritesList]);

  const authCheck = useCallback(
    (url) => {
      const path = url.split('?')[0];

      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    },
    [router]
  );

  useEffect(() => {
    updateAtom();
    const initialAuthCheck = setTimeout(() => authCheck(router.pathname), 0);

    const hideContent = () => setAuthorized(false);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      clearTimeout(initialAuthCheck);
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [authCheck, router.events, router.pathname, updateAtom]);

  return authorized ? children : null;
}
