import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    router.push({
      pathname: '/sites',
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '')
      ),
    });
  }

  return (
    <>
      <div className="text-center py-5 mb-4" style={{ backgroundColor: '#f0f4f8' }}>
        <h1 style={{ color: '#2aa3d5', fontWeight: '300', fontSize: '3rem' }}>
          National Historic Sites Explorer
        </h1>
        <p className="text-muted">
          Discover Canadian historic sites by name, location, and history.
        </p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-4">
          <Form.Label>Name (contains)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name (e.g. 'can' or 'Canadian')"
            className={errors.name ? 'is-invalid' : ''}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </Form.Group>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Description (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description (e.g. 'min' or 'terminal')"
                {...register('description')}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Year (of opened, completed, ...)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter year (e.g. 1908)"
                {...register('year')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Town / City (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter town (e.g. 'tt' or 'Ottawa')"
                {...register('town')}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Province or Territory Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter province or territory code (e.g. ON)"
                {...register('provinceOrTerritoryCode')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="w-100 py-3">
          Search
        </Button>
      </Form>
    </>
  );
}
