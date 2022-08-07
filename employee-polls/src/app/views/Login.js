import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropType from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { setAuthedUser, authedUserSelector } from '../features/authedUserSlice';
import { fetchUsers, usersSelector } from '../features/usersSlice';
import Sidebar from '../components/Sidebar';

function Login({ user = {} }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { users } = useSelector(usersSelector);
  const { loading } = useSelector(authedUserSelector);

  // REDIRECT TO DASHBOARD IF USER IS SIGNED IN
  useEffect(() => {
    if (Object.keys(user).length > 0) navigate('/');
  }, []);

  // GET APP USER DATA AFTER FORM SUBMISSION
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const validateUser = () => {
    // eslint-disable-next-line no-prototype-builtins
    if (users.hasOwnProperty(username)) {
      if (users[username].password === password) {
        dispatch(setAuthedUser(users[username]));
        navigate('/');
      }
      // eslint-disable-next-line no-console
      else console.log('incorrect user password!');
    }
    // eslint-disable-next-line no-console
    else console.log('no user with that username found!');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    validateUser();
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        {/* Sidebar */}
        <Col sm={0} lg={2} className="bg-light">
          <div className="d-none d-lg-block">
            <Sidebar />
          </div>
        </Col>

        {/* Login Form */}
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Col sm={12} lg={10}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback>
                  {password.length > 5 ? 'Looks good!' : null}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
}

Login.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropType.object.isRequired
};

export default Login;
