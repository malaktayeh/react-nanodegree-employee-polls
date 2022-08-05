import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import NavBar from '../components/Navbar';
import LeaderboardTable from '../components/Table';

function Leaderboard() {
  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2">Poll leaderboard</h2>
        <LeaderboardTable />
      </Container>
    </>
  );
}

export default Leaderboard;
