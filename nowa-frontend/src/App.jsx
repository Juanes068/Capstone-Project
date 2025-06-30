import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import LogoutButton from './components/LogoutButton';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile';



//function Home() {
  //return <h2>Welcome NOWA BARBER-SHOP</h2>;
//}

//function Register() {
  //return <h2>Página de Registro</h2>;
//}

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/Home">NOWA BARBER-SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home">HOME</Nav.Link>
            <Nav.Link as={Link} to="/login">LOG-IN</Nav.Link>
            <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
            <Nav.Link as={Link} to="/profile">PROFILE</Nav.Link>
          </Nav>
          <Nav>
            <LogoutButton />
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Container>
      <Footer />




    </Router>
    
  );
}


export default App;

