import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookAppointment() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const [servicesRes, barbersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/services/view/`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/barbers/`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);
        setServices(servicesRes.data);
        setBarbers(barbersRes.data);
      } catch (err) {
        setMessage('Error loading services or barbers.');
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/appointments/`,
        {
          services: selectedServices,
          barber: selectedBarber,
          date: date.toISOString().split('T')[0],
          time: time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/confirmation');
    } catch (err) {
      setMessage('Error booking appointment. Please try again.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Book Appointment</h2>
      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Services Selection as Checkboxes */}
        <Form.Group className="mb-3">
          <Form.Label>Select Services</Form.Label>
          {services.map((service) => (
            <Form.Check
              key={service.id}
              type="checkbox"
              id={`service-${service.id}`}
              label={`${service.name} - $${service.price}`}
              value={service.id}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                if (e.target.checked) {
                  setSelectedServices((prev) => [...prev, id]);
                } else {
                  setSelectedServices((prev) => prev.filter((sid) => sid !== id));
                }
              }}
            />
          ))}
        </Form.Group>

        {/* Barbers Selection as Cards with Images */}
        <Form.Group className="mb-3">
          <Form.Label>Select a Barber</Form.Label>
          <Row>
            {barbers.map((barber) => (
              <Col key={barber.id} md={4} className="mb-3">
                <Card
                  onClick={() => setSelectedBarber(barber.id)}
                  border={selectedBarber === barber.id ? 'dark' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Img
                    variant="top"
                    src={`/images/barbers/${barber.name.toLowerCase().replace(/ /g, "_")}.jpg`}
                    alt={barber.name}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{barber.name}</Card.Title>
                    <Card.Text>{barber.specialty}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Form.Group>

        {/* Date Picker */}
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            minDate={new Date()}
            required
          />
        </Form.Group>

        {/* Time Picker */}
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Book Appointment
        </Button>
      </Form>
    </Container>
  );
}

export default BookAppointment;
