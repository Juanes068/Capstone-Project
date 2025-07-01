import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/services/view/`);
        setServices(response.data);
      } catch (err) {
        setError('Could not load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddToCart = (serviceId) => {
    // Aquí podrías usar localStorage o contexto para guardar ID
    console.log(`Service ${serviceId} added to cart`);
  };

  return (
<Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
          <h2 className="mb-4 text-center">OUR SERVICES</h2>

      {loading && <Spinner animation="border" variant="dark" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
  {services.map((service) => (
    <Col key={service.id} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
      <Card style={{ width: '18rem', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Card.Img
          variant="top"
          src={`/images/services/${service.name.toLowerCase().replace(/ /g, "_")}.jpg`}
          alt={service.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <Card.Body className="text-center">
          <Card.Title>{service.name}</Card.Title>
          <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
            {service.description}
          </Card.Text>
          <Card.Text style={{ fontWeight: 'bold' }}>
          ${parseFloat(service.price).toFixed(2)}
          </Card.Text>
          <Button variant="dark" onClick={() => handleAddToCart(service.id)}className="w-100 mt-3">
            Add to Cart
          </Button>
          <Button variant="dark" as={Link} to={`/services/${service.id}`}className="w-100 mt-3">
             View Details
                </Button>

        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

    </Container>
  );
}

export default ServicesPage;
