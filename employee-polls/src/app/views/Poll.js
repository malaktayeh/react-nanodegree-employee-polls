import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import NavBar from '../components/Navbar';

function Poll() {
  const { state } = useLocation();

  return (
    <>
      <NavBar />
      <Container>
        <h2 className="my-5 mx-2 justify-content-center">Poll page</h2>
        <Row className="my-5">
          <Col xs>
            <h4 className="justify-content-center">Would you rather...?</h4>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Button>{state.q.optionOne.text}</Button>
          </Col>
          <Col xs>
            <Button>{state.q.optionTwo.text}</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Poll;
