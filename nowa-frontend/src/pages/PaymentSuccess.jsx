import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '400px', textAlign: 'center', borderRadius: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          <h2>✅ Payment Successful</h2>
          <p className="mt-3">Thank you for your payment! Your appointment is now confirmed.</p>
          <Button variant="dark" className="mt-3" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaymentSuccess;
