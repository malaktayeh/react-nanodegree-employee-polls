import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import LeaderboardTable from '../components/Table';
import { selectEntities } from '../features/usersSlice';

function Leaderboard() {
  const users = useSelector(selectEntities);

  const leaderboard = Object.entries(users).map((key) =>
    Object({
      user: key[1].id,
      pollsAnswers: Object.keys(key[1].answers).length,
      pollsCreated: Object.keys(key[1].questions).length
    })
  );

  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2">Poll leaderboard</h2>
        <LeaderboardTable data={leaderboard} />
      </Container>
    </>
  );
}

export default Leaderboard;
