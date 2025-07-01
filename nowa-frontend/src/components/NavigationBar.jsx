import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function NavigationBar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/Home">NOWA BARBER-SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home">HOME</Nav.Link>
            <Nav.Link as={Link} to="/Services">SERVICES</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/profile">PROFILE</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">LOG-IN</Nav.Link>
                <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
              </>
            ) : (
              <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <LogoutButton />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
