import React from 'react';
import Card from 'react-bootstrap/Card';

function Poll() {
  return (
    <Card>
      <Card.Img variant="top" />
      <Card.Body className="bg-light">
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a longer card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Poll;
