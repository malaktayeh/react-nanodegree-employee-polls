import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavBar from '../components/Navbar';

function Error404() {
  return (
    <>
      <NavBar />
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
