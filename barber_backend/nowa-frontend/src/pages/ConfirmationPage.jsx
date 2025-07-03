import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/my-appointments/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appointments = response.data;
        const latestAppointment = appointments[appointments.length - 1];
        setAppointment(latestAppointment);
      } catch (err) {
        setError('Error loading your appointment.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, []);

  const handleStripePayment = async () => {
    if (!appointment) return;
    setPaying(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/checkout/`,
        { appointment_id: appointment.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const checkoutUrl = response.data.checkout_url;
      window.location.href = checkoutUrl;
    } catch (err) {
      setError('Error redirecting to Stripe. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" variant="dark" /></Container>;
  if (error) return <Container className="text-center mt-5"><Alert variant="danger">{error}</Alert></Container>;
  const totalAmount = appointment?.services
    ? appointment.services.reduce((sum, service) => sum + parseFloat(service.price), 0)
    : 0;
  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Appointment Confirmed</h2>
      {appointment && (
        <Card>
          <Card.Body className="text-center">
            <Card.Title>Appointment #{appointment.id}</Card.Title>
            <Card.Text><strong>Date:</strong> {appointment.date}</Card.Text>
            <Card.Text><strong>Time:</strong> {appointment.time}</Card.Text>

            {appointment.barber && (
              <Card.Text>
                <strong>Barber:</strong> {appointment.barber.name} - {appointment.barber.specialty}
              </Card.Text>
            )}

            {appointment.services && (
              <>
                <Card.Text><strong>Services:</strong></Card.Text>
               <strong></strong> <ul  className="list-unstyled">
                  {appointment.services.map(service => (
                    <li key={service.id}>{service.name} - ${parseFloat(service.price).toFixed(2)}</li>
                  ))}
                </ul>
              </>
            )}
<Card.Text>
  <strong>Total to Pay:</strong> ${totalAmount.toFixed(2)}
</Card.Text>

            <Button 
              onClick={handleStripePayment}
              disabled={paying}
              style={{
                backgroundColor: "#6772e5",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: paying ? "not-allowed" : "pointer"
              }}
            >
              {paying ? 'Redirecting...' : 'Pay with Stripe'}
            </Button>
            
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ConfirmationPage;
