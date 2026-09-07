import useSWR from 'swr';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Sites() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const queryString = new URLSearchParams(router.query).toString();

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/sites?page=${page}&perPage=10&${queryString}`
  );

  const pageData = Array.isArray(data) ? data : [];

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    if (pageData.length > 0) setPage(page + 1);
  }

  const subtext =
    Object.keys(router.query).length > 0
      ? Object.keys(router.query)
          .map((key) => `${key}: ${router.query[key]}`)
          .join(' | ')
      : null;

  if (error) {
    return (
      <>
        <PageHeader text="Search Results" subtext={subtext} />
        <p>Failed to load data.</p>
      </>
    );
  }

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((site) => (
            <tr
              key={site._id}
              onClick={() => router.push(`/sites/${site._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>{site.siteName}</td>
              <td>
                {site.location?.town}, {site.provinceOrTerritory?.code}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev disabled={page === 1} onClick={previous} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          disabled={pageData.length === 0}
          onClick={next}
        />
      </Pagination>
    </>
  );
}
