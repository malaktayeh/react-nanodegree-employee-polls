import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function PollCard({ question, voteStatus, authedUserId }) {
  return (
    <Card
      style={{ minHeight: '175px' }}
      border={voteStatus === 'unanswered' ? 'primary' : 'secondary'}>
      <Card.Img variant="top" />
      <Card.Body className="bg-light">
        <Container>
          <Row>
            <Card.Title>
              {question.optionOne.text} <span style={{ textDecorationLine: 'underline' }}>or</span>{' '}
              {question.optionTwo.text.toLowerCase()}
            </Card.Title>
          </Row>
          <Row className="my-4" style={{ textAlign: 'center' }}>
            <Col>
              <Link to={`/poll/${question.id}`} state={{ q: question, authedUserId, voteStatus }}>
                {voteStatus === 'unanswered' ? (
                  <Button variant="primary" style={{ alignSelf: 'center' }}>
                    Vote!
                  </Button>
                ) : (
                  <Button variant="secondary">See details</Button>
                )}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ textAlign: 'end' }}>Poll created by {question.author}</Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

PollCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  authedUserId: PropTypes.string.isRequired,
  voteStatus: PropTypes.string.isRequired
};

export default PollCard;
