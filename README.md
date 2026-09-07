# National Historic Sites Explorer

A web application for discovering Canadian national historic sites, exploring their history and location, and saving a personal collection of favourites. This repository contains the Next.js frontend, which connects to a separate custom Sites REST API for historic-site data and user accounts.

## Full-stack project

National Historic Sites Explorer is one full-stack portfolio project maintained in two repositories:

- **Frontend:** Next.js / React — this repository.
- **Backend/API:** Node.js / Express / MongoDB — [Sites API](https://github.com/Ken-2004/sites-api).

## Key features

- Search by site name with optional description, year, town or city, and province or territory filters.
- Browse paginated results and open individual site details.
- View descriptions, historic dates, designation information, images, and geographic coordinates.
- Register an account, sign in, and manage saved favourites.
- View an About page with a live site preview fetched on the server.

## Technology stack

- **Next.js 16 and React 19:** Pages Router, client-side navigation, and server-side rendering.
- **SWR:** Client-side data fetching and caching with a shared fetcher.
- **Jotai:** Shared favourites state.
- **React Hook Form:** Search form state and validation.
- **React Bootstrap and Bootstrap 5:** Layout and interface components.
- **jsonwebtoken:** Client-side token decoding.
- **ESLint with eslint-config-next:** Code quality and React/Next.js checks.

## Frontend architecture

`pages/_app.js` configures the shared SWR fetcher and wraps pages in `RouteGuard` and `Layout`. The layout provides navigation; reusable components render page headers, site cards, and site details.

The search form writes non-empty filters to the `/sites` URL query. The results page sends those filters to the API with `page` and `perPage=10`, and SWR retrieves the results. Site details and favourite cards also use SWR. The About page uses `getServerSideProps` for its featured site and displays a fallback when the API is unavailable or unconfigured.

`lib/authenticate.js` handles registration, login, and token access. `lib/userData.js` handles authenticated favourites requests. `store.js` holds the shared favourites atom, which is populated after login and by the route guard, updated when favourites change, and cleared on logout.

## Custom Sites REST API

The backend is a separate service in the [Sites API repository](https://github.com/Ken-2004/sites-api). `NEXT_PUBLIC_API_URL` includes the `/api` prefix (locally, `http://localhost:8080/api`). The frontend appends the endpoint paths below to that base URL; for example, `/sites` becomes `http://localhost:8080/api/sites`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/sites` | Return an array of sites using pagination and optional search filters. |
| GET | `/sites/:siteId` | Return one historic site. |
| POST | `/user/register` | Create an account with `userName`, `password`, and `password2`. |
| POST | `/user/login` | Authenticate with `userName` and `password`; return a `token`. |
| GET | `/user/favourites` | Return the signed-in user's array of favourite site IDs. |
| PUT | `/user/favourites/:siteId` | Add a favourite and return the updated ID array. |
| DELETE | `/user/favourites/:siteId` | Remove a favourite and return the updated ID array. |

Site records use fields such as `_id`, `siteName`, `description`, `image`, `dates`, `designated`, `location`, and `provinceOrTerritory`. The API owns data persistence, filtering, credential validation, and authorization. Configure the API's CORS policy to allow the frontend's origin for browser requests.

### Authentication and favourites

The frontend stores the login token in browser `localStorage` under `access_token`. The route guard checks the decoded token and its expiration when present, redirects unauthenticated visitors to `/login`, and hides protected content during navigation. `/login`, `/register`, and `/about` are public; search, site details, and favourites require sign-in in the frontend.

Favourites requests include the token in an `Authorization: Bearer <token>` header. Users can add or remove a site from its details page and revisit saved sites on `/favourites`.

### Search and filtering

The search form requires a name and supports these API query parameters:

| Parameter | Filter |
| --- | --- |
| `name` | Site name contains the supplied text. |
| `description` | Description contains the supplied text. |
| `year` | Historic date year, such as an opening or completion year. |
| `town` | Town or city contains the supplied text. |
| `provinceOrTerritoryCode` | Province or territory code, such as `ON`. |

Filter matching is implemented by the Sites API. The frontend omits empty fields and displays the active filters above the results.

## Local development

Prerequisites: Node.js meeting the installed Next.js requirement (`>=20.9.0`), npm, and a running instance of the custom Sites API with site data and user endpoints configured.

1. Install the locked dependencies from the repository root:

   ```bash
   npm ci
   ```

2. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   In PowerShell, use `Copy-Item .env.example .env.local`.

3. Set the API base URL in `.env.local`:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

   This is a local example. Use the actual base URL of your Sites API, including the `/api` prefix and without a trailing slash. It must be reachable by both the browser and the Next.js server because requests run in both environments.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open [localhost:3000](http://localhost:3000), register an account through `/register`, and sign in to search and save favourites.

### Environment configuration

`NEXT_PUBLIC_API_URL` is the application's API base URL, including the `/api` prefix. It is public configuration included in the browser bundle, so it must not contain credentials or secrets. Restart the development server after changing it. Set it before a production build and rebuild when changing the browser-facing API URL.

Local environment files are ignored by Git; `.env.example` is tracked as the configuration template. Backend database credentials and token-signing secrets belong in the separate API service.

## npm scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create the production build. |
| `npm start` | Serve the production build. |

## Production build

Configure `NEXT_PUBLIC_API_URL` for the target environment, then run:

```bash
npm ci
npm run lint
npm run build
npm start
```

The application requires a Next.js server runtime for the About page's server-side data fetching. Run the separate Sites API alongside the frontend infrastructure and allow the frontend origin in the API's CORS configuration.

## Security and dependencies

The client-side route guard is a UI access check. Decoding a JWT in the browser does not verify its signature; the API must verify tokens and enforce user-specific authorization for favourites. Tokens in `localStorage` are accessible to scripts running on the same origin, so preventing script injection remains essential.

The committed lockfile records dependency versions for reproducible installation with `npm ci`. Check runtime dependency advisories with `npm audit --omit=dev`; use `npm audit` to include development dependencies. Review findings and validate dependency updates with lint and a production build. A successful build or audit is not a complete security assessment.

## Repository structure

```text
components/
  Layout.js          Shared page layout
  MainNav.js         Navigation and logout
  PageHeader.js      Reusable page heading
  RouteGuard.js      Client-side authentication and route events
  SiteCard.js        Favourite site preview
  SiteDetails.js     Site information and favourite controls
lib/
  authenticate.js    Account requests and browser token helpers
  userData.js        Authenticated favourites requests
pages/
  _app.js            Global providers, route guard, and layout
  _document.js       HTML document shell
  index.js           Search form
  about.js           Project overview and server-fetched site preview
  login.js           Sign-in form
  register.js        Account registration
  favourites.js      Saved sites
  sites.js           Paginated search results
  sites/[siteId].js  Individual site route
public/
  favicon.ico        Browser icon
styles/
  bootstrap.min.css  Bootstrap theme loaded by the application
  globals.css        Additional stylesheet, currently not imported
.env.example         API configuration template
.gitignore           Generated-file and local-environment exclusions
eslint.config.mjs    ESLint configuration
jsconfig.json        JavaScript import aliases
next.config.mjs      Next.js configuration
package.json         Package metadata, scripts, and dependencies
package-lock.json    Locked dependency tree
store.js             Shared favourites atom
```
