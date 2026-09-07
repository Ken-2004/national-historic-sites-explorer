import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-primary text-white mb-4">
        <Card.Body>
          <h2 className="mb-0">{text}</h2>
          {subtext && <p className="mb-0 mt-2 opacity-75">{subtext}</p>}
        </Card.Body>
      </Card>
    </>
  );
}