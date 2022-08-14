/* eslint-disable no-console */
import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import NavBar from '../components/Navbar';
import { vote } from '../features/questionsSlice';

function Poll() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [voted, setVoted] = useState(state.voteStatus);
  const [votedForOptionOne, setVotedForOptionOne] = useState(
    state.q.optionOne.votes.includes(state.authedUserId)
  );
  const [votedForOptionTwo, setVotedForOptionTwo] = useState(
    state.q.optionTwo.votes.includes(state.authedUserId)
  );

  console.log(votedForOptionOne);
  console.log(votedForOptionTwo);

  const handleClick = (selection, e) => {
    console.log(e.preventDefault());
    console.log('inside handle click');

    if (selection === 'optionOne') {
      setVotedForOptionOne((prevAnswer) => !prevAnswer);
    }
    if (selection === 'optionTwo') {
      setVotedForOptionTwo((prevAnswer) => !prevAnswer);
    }

    console.log(votedForOptionOne);
    console.log(votedForOptionTwo);

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
      <Container>
        <h2 className="my-5 mx-2">Poll page</h2>
        <Row className="my-5">
          <Col xs>
            <h4>Would you rather...?</h4>
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
          {voted === 'unanswered'
            ? 'Please note: you can only vote once and are not allowed to change your answer.'
            : 'Poll answered.'}
        </p>
      </Container>
    </>
  );
}

export default Poll;
