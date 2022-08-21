import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import NavBar from '../components/Navbar';
import { authedUserSelector } from '../features/authedUserSlice';

function Error404() {
  const { authedUser } = useSelector(authedUserSelector);

  return (
    <>
      {Object.keys(authedUser).length !== 0 ? <NavBar /> : null}
      <Container className="mt-5 mb-2">
        <div className="mt-5">
          <h2 className="mt-3"> 4 0 4 !</h2>
        </div>
        <Button variant="light" className="mt-5">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            {' '}
            ⬅️ Return{' '}
          </Link>
        </Button>
      </Container>
    </>
  );
}

export default Error404;
