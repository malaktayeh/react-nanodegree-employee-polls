import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

function PollHeader({ pollAuthor, formattedDate }) {
  return (
    <Row className="my-5">
      <Col>
        <h4>Would you rather...?</h4>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
          <p className="mb-0">
            Posted by {pollAuthor.name} on {formattedDate}
          </p>
          <img
            src={`${pollAuthor.avatarURL}`}
            alt="User Icon"
            style={{ height: '100px', paddingLeft: '25px' }}
          />
        </div>
      </Col>
    </Row>
  );
}

PollHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pollAuthor: PropTypes.object.isRequired,
  formattedDate: PropTypes.string.isRequired
};

export default PollHeader;
