import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import LeaderboardTable from '../components/Table';
import { selectAllQuestions } from '../features/questionsSlice';
import { selectAllUsers } from '../features/usersSlice';

function Leaderboard() {
  const allQuestions = useSelector(selectAllQuestions);
  let answered = [];

  for (let i = 0, l = allQuestions.length; i < l; i += 1) {
    // through each iteration, create a new array
    // the result is ONE array of the userIDs of app users who votes
    const newArr = allQuestions[i].optionOne.votes.concat(allQuestions[i].optionTwo.votes);
    answered = answered.concat(newArr);
  }

  // Fantastic usage of reducer function, see source:
  // https://stackoverflow.com/a/57028486
  // This will count the number of occurences of the userID int the answered array
  // and save it in a Map
  const occurrences =
    allQuestions.length === 0
      ? 0
      : answered.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

  const leaderboard = useSelector(selectAllUsers).map((user) => {
    return Object({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      pollsAnswered: allQuestions.length === 0 ? 0 : occurrences.get(user.id),
      pollsCreated: allQuestions.filter((q) => q.author === user.id).length
    });
  });

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <h2 className="mb-5">Leaderboard</h2>
        <LeaderboardTable data={leaderboard} />
      </Container>
    </>
  );
}

export default Leaderboard;
