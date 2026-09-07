import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const router = useRouter();
  const [warning, setWarning] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser({ userName: user, password, password2 });
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <h2>Register</h2>
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
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="pull-right">
          Register
        </Button>
      </Form>
    </>
  );
}
