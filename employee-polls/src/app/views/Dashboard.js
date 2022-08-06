import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import NavBar from '../components/Navbar';
import PollsGrid from '../components/PollsGrid';

function Dashboard({ questions = {} }) {
  // eslint-disable-next-line no-console
  console.log(questions);

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

Dashboard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  questions: PropTypes.object
};

const mapStateToProps = ({ questions }) => ({
  questionsIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )
});

export default connect(mapStateToProps)(Dashboard);
