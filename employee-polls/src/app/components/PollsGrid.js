import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Poll from './Poll';

function PollsGrid({ voteStatus, questions, authedUserId }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {questions.length === 0 && voteStatus === 'unanswered' ? (
        <div>You answered all polls. Come back some other time! 👍</div>
      ) : (
        <>
          {Object.entries(questions).map((key) => (
            <Col xs={12} sm={12} md={4} xl={3} key={key[1].id} className="mt-3">
              <Poll question={key[1]} voteStatus={voteStatus} authedUserId={authedUserId} />
            </Col>
          ))}
        </>
      )}
    </>
  );
}

PollsGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  questions: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  authedUserId: PropTypes.string.isRequired,
  voteStatus: PropTypes.string.isRequired
};

export default PollsGrid;
