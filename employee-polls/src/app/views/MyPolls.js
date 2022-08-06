import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import NavBar from '../components/Navbar';
import Poll from '../components/Poll';

function MyPolls() {
  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2">Poll page</h2>
        <Poll />
        <Poll />
        <Poll />
      </Container>
    </>
  );
}

export default MyPolls;
