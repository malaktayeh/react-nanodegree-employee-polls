import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import Poll from './Poll';

function PollWrapper() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (state === null) navigate('/404');
  }, []);

  return (
    <>
      <NavBar />
      <Container className="mt-5 mb-2" style={{ maxWidth: '750px' }}>
        <div className="mt-5 mb-2">
          <h2 className="mb-3">Poll page</h2>
        </div>
        {state === null ? null : <Poll question={state} />}
      </Container>
    </>
  );
}

export default PollWrapper;
