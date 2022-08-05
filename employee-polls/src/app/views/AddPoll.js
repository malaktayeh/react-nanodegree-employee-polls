import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavBar from '../components/Navbar';

function AddPoll() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <NavBar />
      <Container fluid className="mt-5 mx-2">
        <h2 className="mt-5 mx-2">Add a new poll question!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formPollQuestion" className="mt-4">
            <Form.Label>Poll Question</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Enter your the new poll question here"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the poll question.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formAnswerA" className="mt-4">
            <Form.Label>Option A</Form.Label>
            <Form.Control required type="text" placeholder="Option A" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAnswerB" className="mt-4">
            <Form.Label>Option B</Form.Label>
            <Form.Control required type="text" placeholder="Option B" />
            <Form.Control.Feedback>Perfect!</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddPoll;
