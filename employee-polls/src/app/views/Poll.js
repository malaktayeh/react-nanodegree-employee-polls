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
  const [votedForOptionOne] = useState(state.q.optionOne.votes.includes(state.authedUserId));
  const [votedForOptionTwo] = useState(state.q.optionTwo.votes.includes(state.authedUserId));

  // console.log(state.authedUserId);
  // console.log(state.q.optionOne.votes);
  // console.log(state.q.optionTwo.votes);
  // console.log(votedForOptionOne);
  // console.log(votedForOptionTwo);

  const handleClick = (selection) => {
    // DO NOTHING IF THE USER SELECTED SAME OPTION
    if (votedForOptionOne === true && selection === 'optionOne') return;
    if (votedForOptionTwo === true && selection === 'optionTwo') return;

    const submission = {
      authedUser: state.authedUserId,
      qid: state.q.id,
      answer: selection
    };
    dispatch(vote(submission));
  };

  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2 justify-content-center">Poll page</h2>
        <Row className="my-5">
          <Col xs>
            <h4 className="justify-content-center">Would you rather...?</h4>
          </Col>
        </Row>
        <Row>
          <Col xs>
            {votedForOptionOne ? (
              <Button onClick={() => handleClick('optionOne')}>{state.q.optionOne.text}</Button>
            ) : (
              <Button variant="outline-primary" onClick={() => handleClick('optionOne')}>
                {state.q.optionOne.text}
              </Button>
            )}
          </Col>
          <Col xs>
            {votedForOptionTwo ? (
              <Button onClick={() => handleClick('optionTwo')}>{state.q.optionTwo.text}</Button>
            ) : (
              <Button variant="outline-primary" onClick={() => handleClick('optionTwo')}>
                {state.q.optionTwo.text}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Poll;
