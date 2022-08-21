import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Poll from './Poll';

function PollsGrid({ voteStatus, questions, authedUserId }) {
  const sortedQuestionsArray = questions.sort((q1, q2) => q2.timestamp - q1.timestamp);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {questions.length === 0 && voteStatus === 'unanswered' ? (
        <div>You answered all polls. Come back some other time! 👍</div>
      ) : (
        <>
          {sortedQuestionsArray.map((q) => (
            <Col xs={12} sm={12} md={4} xl={3} key={q.id} className="mt-3">
              <Poll question={q} voteStatus={voteStatus} authedUserId={authedUserId} />
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
