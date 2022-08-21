import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import NavBar from '../components/Navbar';
import { questionsSelector } from '../features/questionsSlice';
import { authedUserSelector } from '../features/authedUserSlice';

function MyPolls() {
  const { questions } = useSelector(questionsSelector);
  const { authedUser } = useSelector(authedUserSelector);
  const authedUserQuestions = Object.keys(questions)
    .filter((q) => questions[q].author === authedUser.id)
    .map((id) => questions[id]);

  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2">Polls you have posted!</h2>
        {authedUserQuestions.length === 0 ? (
          <p>
            You have not submitted any polls yet. Click <Link to="/add-poll">here</Link> to add one!
          </p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Question No</th>
                <th>Option 1</th>
                <th>Option 2</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(authedUserQuestions).map((poll, index) => (
                <tr key={poll.id}>
                  <td>{index + 1}</td>
                  <td>{poll.optionOne.text}</td>
                  <td>{poll.optionTwo.text}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default MyPolls;
