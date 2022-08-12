import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/esm/Spinner';
import NavBar from '../components/Navbar';
import { addQuestion, questionsSelector } from '../features/questionsSlice';
import { authedUserSelector } from '../features/authedUserSlice';

function AddPoll() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [posted, setPosted] = useState(false);
  const { loading } = useSelector(questionsSelector);
  const { authedUser } = useSelector(authedUserSelector);

  const [poll, setPoll] = useState({
    question: '',
    optionOneText: '',
    optionTwoText: '',
    author: authedUser.id
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      dispatch(addQuestion(poll));
      setPosted(true);
      setPoll({
        question: '',
        optionOneText: '',
        optionTwoText: '',
        author: authedUser.id
      });
      setValidated(false);
    }
  };

  return (
    <>
      <NavBar />
      <Container fluid className="mt-5 mx-2">
        <h2 className="mt-5 mx-2">Add a new poll question!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formAnswerA" className="mt-4">
            <Form.Label>Option A</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                value={poll.optionOneText}
                required
                type="text"
                placeholder="Option A"
                onChange={(e) => setPoll((prev) => ({ ...prev, optionOneText: e.target.value }))}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formAnswerB" className="mt-4">
            <Form.Label>Option B</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                value={poll.optionTwoText}
                required
                type="text"
                placeholder="Option B"
                onChange={(e) => setPoll((prev) => ({ ...prev, optionTwoText: e.target.value }))}
              />
              <Form.Control.Feedback>Perfect!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="mt-5">
            {loading ? <Spinner animation="border" /> : 'Submit'}
          </Button>
        </Form>
        {posted && !loading ? 'Successfully submited your poll!' : ''}
      </Container>
    </>
  );
}

export default AddPoll;
