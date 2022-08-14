import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Poll from './Poll';

function PollsGrid({ questions, authedUserId }) {
  return (
    <Row>
      {Object.entries(questions).map((key) => (
        <div key={key[1].id}>
          <Link to={`/poll/${key[1].id}`} state={{ q: key[1], authedUserId }}>
            <Col>
              <Poll question={key[1]} />
            </Col>
          </Link>
        </div>
      ))}
    </Row>
  );
}

PollsGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  questions: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  authedUserId: PropTypes.string.isRequired
};

export default PollsGrid;
