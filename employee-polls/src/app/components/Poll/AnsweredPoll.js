/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';

function AnsweredPoll({ votedForOptionOne, question, pollData }) {
  return (
    <div className="d-grid gap-2">
      {votedForOptionOne !== undefined ? (
        <>
          <Button disabled className="btn-d-sm-block">
            {question.optionOne ? question.optionOne.text : 'ERROR'}
          </Button>
          <Button
            variant="outline-primary"
            style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
            className="btn-d-sm-block">
            {question.optionTwo ? question.optionTwo.text : 'ERROR'}
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline-primary"
            style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
            className="btn-d-sm-block">
            {Object.keys(pollData).length !== 0 ? question.optionOne.text : 'ERROR'}
          </Button>
          <Button disabled className="btn-d-sm-block">
            {Object.keys(pollData).length !== 0 ? question.optionTwo.text : 'ERROR'}
          </Button>
        </>
      )}
    </div>
  );
}

export default AnsweredPoll;
