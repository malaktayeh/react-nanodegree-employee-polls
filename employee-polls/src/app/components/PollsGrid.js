import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Poll from './Poll';

function PollsGrid({ questions }) {
  return (
    <Row>
      {Object.entries(questions).map((key) => (
        <Col key={key[1].id}>
          <Poll question={key[1]} />
        </Col>
      ))}
      ;
    </Row>
  );
}

PollsGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  questions: PropTypes.object.isRequired
};

export default PollsGrid;
