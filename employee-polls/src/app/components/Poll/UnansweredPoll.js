import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function UnansweredPoll({ handleClick, votedForOptionOne, votedForOptionTwo, question }) {
  return (
    <div className="d-grid gap-2">
      {votedForOptionOne ? (
        <Button className="btn-d-sm-block" onClick={(e) => handleClick('optionOne', e)}>
          {question.optionOne.text ? question.optionOne.text : 'ERROR'}
        </Button>
      ) : (
        <Button
          className="btn-d-sm-block"
          variant="outline-primary"
          onClick={(e) => handleClick('optionOne', e)}>
          {question.optionOne.text ? question.optionOne.text : 'ERROR'}
        </Button>
      )}
      {votedForOptionTwo ? (
        <Button className="btn-d-sm-block" onClick={(e) => handleClick('optionTwo', e)}>
          {question.optionTwo.text ? question.optionTwo.text : 'ERROR'}
        </Button>
      ) : (
        <Button
          className="btn-d-sm-block"
          variant="outline-primary"
          onClick={(e) => handleClick('optionTwo', e)}>
          {question.optionTwo.text ? question.optionTwo.text : 'ERROR'}
        </Button>
      )}
    </div>
  );
}

UnansweredPoll.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  handleClick: PropTypes.func.isRequired,
  votedForOptionOne: PropTypes.bool.isRequired,
  votedForOptionTwo: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired
};

export default UnansweredPoll;
