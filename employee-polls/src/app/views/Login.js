/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { authedUserSelector, setAuthedUser } from '../features/authedUserSlice';
import { fetchUsers, selectUserById } from '../features/usersSlice';
import Sidebar from '../components/Sidebar';

function Login() {
  const [username, setUsername] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appUser = useSelector((state) => selectUserById(state, username));
  const [validated, setValidated] = useState(false);

  const { status } = useSelector(authedUserSelector);

  // REDIRECT TO DASHBOARD IF USER IS SIGNED IN
  useEffect(() => {
    if (appUser !== undefined) navigate('/');
  }, []);

  // GET APP USER DATA AFTER FORM SUBMISSION
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const validateUser = () => {
    // check if username exists
    if (appUser === undefined) {
      // eslint-disable-next-line no-console
      console.log('username does not exist!');
      setUserNameError(true);
      return;
    }
    setUserNameError(false);

    if (appUser.password !== password) {
      // eslint-disable-next-line no-console
      console.log('incorrect user password!');
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    dispatch(setAuthedUser(appUser));
    navigate('/');
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
    <Container fluid style={{ height: '100%', minHeight: '100%' }}>
      <Row style={{ height: '100%', minHeight: '100%' }}>
        {/* Sidebar */}
        <Col
          xs={0}
          sm={0}
          md={3}
          lg={4}
          xl={5}
          className="bg-light d-none d-sm-block d-sm-none d-md-block">
          <div className="text-center pt-5">
            <Sidebar />
          </div>
        </Col>
        {status === 'loading' ? (
          <Spinner animation="border" />
        ) : (
          <>
            {/* Login Form */}
            <Row
              className="bg-light d-block d-md-none display-5 font-weight-bold"
              style={{
                margin: '0',
                paddingTop: '10px',
                maxHeight: '60px',
                textAlign: 'center',
                borderBottom: '1px solid #e9ecef'
              }}>
              <Col>
                <div>Employee Polls</div>
              </Col>
            </Row>
            <Col xs={12} sm={12} md={9} lg={8} xl={7} style={{ justifyContent: 'center' }}>
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="px-5 py-5">
                <Form.Group className="mb-5" controlId="formBasicUsername">
                  <Form.Label className="mt-5">Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend" className="text-secondary">
                      @
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {userNameError ? 'An error occured.' : null}
                    </Form.Control.Feedback>
                    {userNameError ? (
                      <Form.Control.Feedback>This username is not valid.</Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">An error occured.</Form.Control.Feedback>
                    {passwordError ? (
                      <Form.Control.Feedback type="invalid" className="text-secondary">
                        Wrong password. Please re-enter.
                      </Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>

                <Button type="submit">Submit</Button>
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Login;
