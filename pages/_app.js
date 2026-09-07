import '@/styles/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard';
import Head from 'next/head';

const fetcher = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Head>
        <title>National Historic Sites Explorer</title>
        <meta
          name="description"
          content="Explore Canadian national historic sites, search their history and location, and save your favourites."
        />
      </Head>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}
