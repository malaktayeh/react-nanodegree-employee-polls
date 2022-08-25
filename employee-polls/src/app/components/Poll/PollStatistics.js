import React from 'react';
import PropTypes from 'prop-types';

function PollStatistics({ question, selected, totalVotes }) {
  return (
    <>
      <p>Poll answered!</p>
      <p>
        You voted for the following: <b>{question[selected].text}</b>.
      </p>

      {totalVotes !== null ? (
        <p>
          <b>{totalVotes}</b> colleagues selected the same option. Percentage of people who voted
          like you:{' '}
          <b>
            {Math.round(100 * (question[selected].votes.length / totalVotes) * 100) / 100}
            %.
          </b>
        </p>
      ) : (
        <p>You were the first to vote. Come back later for more statistics!</p>
      )}
    </>
  );
}

PollStatistics.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  totalVotes: PropTypes.number.isRequired
};

export default PollStatistics;
