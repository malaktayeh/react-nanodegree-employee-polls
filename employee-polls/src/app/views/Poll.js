import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';

function Poll() {
  const { state } = useLocation();

  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2">Poll page</h2>
        <h4>Would you rather...?</h4>
        <p>{state.q.optionOne.text}</p>
        <p>{state.q.optionTwo.text}</p>
      </Container>
    </>
  );
}

export default Poll;
