import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import LogoutButton from './components/LogoutButton';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ServicesPage from './pages/ServicesPage';
import BookAppointment from './pages/BookAppointment';
import ConfirmationPage from './pages/ConfirmationPage';
import PaymentSuccess from './pages/PaymentSuccess';
import ServiceDetail from './pages/ServiceDetail';
import PaymentsPage from './pages/PaymentsPage';
import AppointmentsPage from './pages/AppointmentsPage';


function App() {
  return (
    <Router>
      <NavigationBar />

      <Container 
        className="mt-4 mb-5 d-flex flex-column align-items-center" 
        style={{ minHeight: '80vh' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
