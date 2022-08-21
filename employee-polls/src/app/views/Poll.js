/* eslint-disable no-console */
import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import { vote } from '../features/questionsSlice';
import { selectById } from '../features/usersSlice';

function Poll() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const author = useSelector((s) => selectById(s, state.q.author));
  const date = new Date(state.q.timestamp);

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const [voted, setVoted] = useState(state.voteStatus);
  const [selected, setSelected] = useState();

  const [votedForOptionOne, setVotedForOptionOne] = useState(
    state.q.optionOne.votes.includes(state.authedUserId)
  );
  const [votedForOptionTwo, setVotedForOptionTwo] = useState(
    state.q.optionTwo.votes.includes(state.authedUserId)
  );

  const optionOneVote = state.q.optionOne.votes;
  const optionTwoVote = state.q.optionTwo.votes;
  const totalVotes = optionOneVote.length + optionTwoVote.length;
  // eslint-disable-next-line no-console
  console.log(totalVotes);

  const handleClick = (selection) => {
    if (selection === 'optionOne') {
      setVotedForOptionOne((prevAnswer) => !prevAnswer);
      setSelected(selection);
    }
    if (selection === 'optionTwo') {
      setVotedForOptionTwo((prevAnswer) => !prevAnswer);
      setSelected(selection);
    }

    const submission = {
      authedUser: state.authedUserId,
      qid: state.q.id,
      answer: selection
    };
    dispatch(vote(submission));
    setVoted('answered');
  };

  return (
    <>
      <NavBar />
      <Container style={{ maxWidth: '750px' }}>
        <h2 className="my-5 mx-2">Poll page</h2>
        <Row className="my-5">
          <Col>
            <h4>Would you rather...?</h4>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
              <p className="mb-0">
                Posted by {author.name} on {formattedDate}
              </p>
              <img
                src={`${author.avatarURL}`}
                alt="User Icon"
                style={{ height: '100px', paddingLeft: '25px' }}
              />
            </div>
          </Col>
        </Row>
        {/* Unanswered Poll question UI */}
        {voted === 'unanswered' ? (
          <div className="d-grid gap-2">
            {votedForOptionOne ? (
              <Button className="btn-d-sm-block" onClick={(e) => handleClick('optionOne', e)}>
                {state.q.optionOne.text}
              </Button>
            ) : (
              <Button
                className="btn-d-sm-block"
                variant="outline-primary"
                onClick={(e) => handleClick('optionOne', e)}>
                {state.q.optionOne.text}
              </Button>
            )}
            {votedForOptionTwo ? (
              <Button className="btn-d-sm-block" onClick={(e) => handleClick('optionTwo', e)}>
                {state.q.optionTwo.text}
              </Button>
            ) : (
              <Button
                className="btn-d-sm-block"
                variant="outline-primary"
                onClick={(e) => handleClick('optionTwo', e)}>
                {state.q.optionTwo.text}
              </Button>
            )}
          </div>
        ) : (
          <div className="d-grid gap-2">
            {votedForOptionOne ? (
              <>
                <Button disabled className="btn-d-sm-block">
                  {state.q.optionOne.text}
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
                  className="btn-d-sm-block">
                  {state.q.optionTwo.text}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
                  className="btn-d-sm-block">
                  {state.q.optionOne.text}
                </Button>
                <Button disabled className="btn-d-sm-block">
                  {state.q.optionTwo.text}
                </Button>
              </>
            )}
          </div>
        )}
        <p className="mt-5">
          {voted === 'unanswered' ? (
            <p>Please note: you can only vote once and are not allowed to change your answer.</p>
          ) : (
            <>
              <p>Poll answered!</p>
              <p>
                You voted for the following: <b>{state.q[selected].text}</b>
              </p>
              <p>
                <b>{totalVotes}</b> colleagues selected the same option. Percentage of people who
                voted like you:{' '}
                <b>
                  {Math.round(100 * (state.q[selected].votes.length / totalVotes) * 100) / 100}%.
                </b>
              </p>
              <Button variant="light" className="mt-5">
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                  {' '}
                  ⬅️ Return to dashboard{' '}
                </Link>
              </Button>
            </>
          )}
        </p>
      </Container>
    </>
  );
}

export default Poll;
