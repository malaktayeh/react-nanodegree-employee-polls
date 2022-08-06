import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import NavBar from '../components/Navbar';

function Poll() {
  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2">Poll page</h2>
      </Container>
    </>
  );
}

export default Poll;
