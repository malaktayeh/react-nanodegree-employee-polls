import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import { fetchQuestions, questionsSelector } from '../features/questionsSlice';
import NavBar from '../components/Navbar';
import PollsGrid from '../components/PollsGrid';

function Dashboard() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { questions, loading, error } = useSelector(questionsSelector);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Container fluid style={{ marginTop: '5%', marginBottom: '5%' }}>
        <h2>Newly posted polls</h2>
        <PollsGrid />
      </Container>

      <Container fluid style={{ marginTop: '5%', marginBottom: '5%' }}>
        <h2>Completed polls</h2>
        <PollsGrid />
      </Container>
    </>
  );
}

export default Dashboard;
