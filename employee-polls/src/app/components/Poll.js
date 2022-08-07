import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function Poll({ question }) {
  return (
    <Card>
      <Card.Img variant="top" />
      <Card.Body className="bg-light">
        <Card.Title>{question.optionOne.text}</Card.Title>
        <Card.Text> Created by {question.author}</Card.Text>
      </Card.Body>
    </Card>
  );
}

Poll.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired
};

export default Poll;
