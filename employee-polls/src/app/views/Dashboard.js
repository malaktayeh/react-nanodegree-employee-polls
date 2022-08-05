import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import NavBar from '../components/Navbar';
import PollsGrid from '../components/PollsGrid';

function Dashboard() {
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
