import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { Form, Button, Alert } from 'react-bootstrap';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';

export default function Login() {
  const router = useRouter();
  const [warning, setWarning] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser({ userName: user, password });
      const favs = await getFavourites();
      setFavouritesList(favs);
      router.push('/');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <h2>Login</h2>
      <hr />
      {warning && (
        <Alert variant="danger">
          <strong>Error:</strong> {warning}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="pull-right">
          Login
        </Button>
      </Form>
    </>
  );
}
