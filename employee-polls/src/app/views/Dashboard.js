import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import { fetchQuestions, questionsSelector } from '../features/questionsSlice';
import NavBar from '../components/Navbar';
import PollsGrid from '../components/PollsGrid';

function Dashboard() {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(questionsSelector);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Container fluid className="mt-5 mb-2">
        <h2 className="mb-3">Newly posted polls</h2>
        {loading || error ? <Spinner animation="border" /> : <PollsGrid questions={questions} />}
      </Container>

      <Container fluid className="mt-5 mb-2">
        <h2 className="mb-3">Completed polls</h2>
        {loading || error ? <Spinner animation="border" /> : <PollsGrid questions={questions} />}
      </Container>
    </>
  );
}

export default Dashboard;
