import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Poll from './Poll';

function PollsGrid() {
  return (
    <Row>
      {/* {Array.from({ length: 4 }).map((x, idx) => ( */}
      <Col>
        <Poll />
        <Poll />
        <Poll />
        <Poll />
      </Col>
      {/* ))} */}
    </Row>
  );
}

export default PollsGrid;
