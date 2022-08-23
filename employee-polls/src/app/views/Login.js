/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { authedUserSelector, setAuthedUser } from '../features/authedUserSlice';
import { fetchUsers, selectUserById, selectUserEntities } from '../features/usersSlice';
import { fetchQuestions } from '../features/questionsSlice';
import Sidebar from '../components/Sidebar';

function Login() {
  const [username, setUsername] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const appUser = useSelector((state) => selectUserById(state, username));
  const users = useSelector(selectUserEntities);
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

  // check whether to route to dashboard because a user tried to access a page
  // without signing in first. redirect to dashboard if false.
  const routeToCorrectPath = (event) => {
    event.preventDefault();
    const correctRedirectURL = location.state?.from || '/';
    navigate(correctRedirectURL, { replace: true });
  };

  const validateUser = () => {
    // check if username exists
    if (appUser === undefined) {
      setUserNameError(true);
      return;
    }
    setUserNameError(false);

    if (appUser.password !== password) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    dispatch(setAuthedUser(appUser));
    routeToCorrectPath();
  };

  const handleLazySignIn = (name, event) => {
    const user = users[name];
    setValidated(true);
    dispatch(setAuthedUser(user));
    dispatch(fetchQuestions());
    routeToCorrectPath(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    validateUser(event);
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
                <div data-testid="appHeader">Employee Polls</div>
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
                      data-testid="userNameInput"
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {userNameError ? 'Wrong or non-existing user name.' : null}
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Dropdown style={{ width: '20%', minWidth: '100px', alignSelf: 'flex-end' }}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Sign in as...
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={(e) => {
                          handleLazySignIn('sarahedo', e);
                        }}>
                        Sarah Edo
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          handleLazySignIn('tylermcginnis', e);
                        }}>
                        Tyler McGinnis
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          handleLazySignIn('mtsamis', e);
                        }}>
                        Mike Tsamis
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          handleLazySignIn('zoshikanlu', e);
                        }}>
                        Zenobia Oshikanlu
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    style={{ width: '20%', minWidth: '150px', alignSelf: 'flex-start' }}
                    type="submit"
                    data-testid="submit-button">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Login;
