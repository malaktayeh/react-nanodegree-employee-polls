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
  const [votedForOptionOne, setVotedForOptionOne] = useState(
    state.q.optionOne.votes.includes(state.authedUserId)
  );
  const [votedForOptionTwo, setVotedForOptionTwo] = useState(
    state.q.optionTwo.votes.includes(state.authedUserId)
  );

  const handleClick = (selection) => {
    console.log(state.authedUserId);
    console.log(state.q.optionOne.votes);
    console.log(state.q.optionTwo.votes);
    console.log(selection);

    // DO NOTHING IF THE USER SELECTED SAME OPTION
    // if (votedForOptionOne === true && selection === 'optionOne') {
    //   console.log('option one already selected');
    //   return;
    // }
    // if (votedForOptionTwo === true && selection === 'optionTwo') {
    //   console.log('option two already selected');
    //   return;
    // }

    if (votedForOptionOne === false || votedForOptionTwo === false) {
      console.log('inside handle click');
      setVotedForOptionOne((prevAnswer) => !prevAnswer);
      setVotedForOptionTwo((prevAnswer) => !prevAnswer);

      const submission = {
        authedUser: state.authedUserId,
        qid: state.q.id,
        answer: selection
      };
      dispatch(vote(submission));
    }
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
        {state.voteStatus === 'unanswered' ? (
          <div className="d-grid gap-2">
            {votedForOptionOne ? (
              <Button className="btn-d-sm-block" onClick={() => handleClick('optionOne')}>
                {state.q.optionOne.text}
              </Button>
            ) : (
              <Button
                className="btn-d-sm-block"
                variant="outline-primary"
                onClick={() => handleClick('optionOne')}>
                {state.q.optionOne.text}
              </Button>
            )}
            {votedForOptionTwo ? (
              <Button className="btn-d-sm-block" onClick={() => handleClick('optionTwo')}>
                {state.q.optionTwo.text}
              </Button>
            ) : (
              <Button
                className="btn-d-sm-block"
                variant="outline-primary"
                onClick={() => handleClick('optionTwo')}>
                {state.q.optionTwo.text}
              </Button>
            )}
          </div>
        ) : (
          <div className="d-grid gap-2">
            {votedForOptionOne ? (
              <>
                <Button
                  variant="outline-primary"
                  style={{ 'pointer-events': 'none', cursor: 'not-allowed' }}
                  className="btn-d-sm-block">
                  {state.q.optionOne.text}
                </Button>
                <Button disabled className="btn-d-sm-block">
                  {state.q.optionTwo.text}
                </Button>
              </>
            ) : (
              <>
                <Button disabled className="btn-d-sm-block">
                  {state.q.optionTwo.text}
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ 'pointer-events': 'none', cursor: 'not-allowed' }}
                  className="btn-d-sm-block">
                  {state.q.optionOne.text}
                </Button>
              </>
            )}
          </div>
        )}
        <p className="mt-5">
          {state.voteStatus === 'unanswered'
            ? 'Please note: you can only vote once and are not allowed to change your answer.'
            : 'Poll answered.'}
        </p>
      </Container>
    </>
  );
}

export default Poll;
