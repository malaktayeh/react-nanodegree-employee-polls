/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { fetchQuestions, selectAllQuestions } from '../features/questionsSlice';
import NavBar from '../components/Navbar';
import PollsGrid from '../components/PollsGrid';
import { authedUserSelector } from '../features/authedUserSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const status = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);
  const { authedUser } = useSelector(authedUserSelector);

  // GET QUESTIONS THAT THE USER DID NOT ANSWER
  const unanswered = Object.entries(questions).filter(
    (k) =>
      (k[1].optionOne.votes.includes(authedUser.id) ||
        k[1].optionTwo.votes.includes(authedUser.id)) === false
  );

  // GET QUESTIONS THAT THE USER ANSWERED
  const answered = Object.entries(questions).filter(
    (k) =>
      (k[1].optionOne.votes.includes(authedUser.id) ||
        k[1].optionTwo.votes.includes(authedUser.id)) !== false
  );

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  return (
    <>
      <NavBar />
      <Container className="mt-5 mb-2">
        <h2 className="mb-3">Unanwered polls</h2>
        {status === 'loading' ? (
          <Spinner animation="border" />
        ) : error ? (
          <div>An error occured.</div>
        ) : (
          null(
            <Row>
              <PollsGrid
                voteStatus="unanswered"
                questions={unanswered.map((v) => v[1])}
                authedUserId={authedUser.id}
              />
            </Row>
          )
        )}
      </Container>

      <Container className="mt-5 mb-2">
        <h2 className="mb-3">Answered polls</h2>
        {status === 'loading' ? (
          <Spinner animation="border" />
        ) : error ? (
          <div>An error occured.</div>
        ) : (
          null(
            <Row>
              <PollsGrid
                voteStatus="answered"
                questions={answered.map((v) => v[1])}
                authedUserId={authedUser.id}
              />
            </Row>
          )
        )}
      </Container>
    </>
  );
}

export default Dashboard;
