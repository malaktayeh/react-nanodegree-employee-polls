import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { fetchQuestions, questionsSelector } from '../features/questionsSlice';
import NavBar from '../components/Navbar';
import PollsGrid from '../components/PollsGrid';
import { authedUserSelector } from '../features/authedUserSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(questionsSelector);
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
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Container className="mt-5 mb-2">
        <h2 className="mb-3">Newly posted polls</h2>
        {loading || error ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            <PollsGrid
              voteStatus="unanswered"
              questions={unanswered.map((v) => v[1])}
              authedUserId={authedUser.id}
            />
          </Row>
        )}
      </Container>

      <Container className="mt-5 mb-2">
        <h2 className="mb-3">Completed polls</h2>
        {loading || error ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            <PollsGrid
              voteStatus="answered"
              questions={answered.map((v) => v[1])}
              authedUserId={authedUser.id}
            />
          </Row>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
