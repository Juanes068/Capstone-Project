import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchServiceAndReviews = async () => {
    try {
      const serviceRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/services/view/`);
      const serviceFound = serviceRes.data.find(s => s.id === parseInt(id));
      setService(serviceFound);

      const reviewsRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/reviews/${id}/`);
      setReviews(reviewsRes.data);
    } catch (err) {
      setMessage('Error loading service or reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceAndReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/reviews/`,
        { service: id, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(5);
      setComment('');
      setMessage('Review submitted successfully!');
      fetchServiceAndReviews(); // Refresh reviews
    } catch (err) {
      setMessage('Error submitting review.');
    }
  };

  if (loading) return <Spinner animation="border" variant="dark" />;
  if (!service) return <Alert variant="danger">Service not found</Alert>;

  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        {/* Image Left */}
        <Col md={6} className="mb-3">
          <Card style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <Card.Img
              src={`/images/services/${service.name.toLowerCase().replace(/ /g, "_")}.jpg`}
              alt={service.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Card>
        </Col>

        {/* Details and Form Right */}
        <Col md={6}>
          <h2>{service.name}</h2>
          <p className="text-muted">{service.description}</p>
          <h4>${parseFloat(service.price).toFixed(2)}</h4>

          <hr />

          <h5>Leave a Review</h5>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
  <Form.Label>Rating</Form.Label>
  <div className="d-flex flex-column gap-2">
    {[5, 4, 3, 2, 1].map((star) => (
      <Form.Check
        key={star}
        inline
        label={"⭐️".repeat(star)}
        name="rating"
        type="radio"
        id={`star-${star}`}
        value={star}
        checked={parseInt(rating) === star}
        onChange={(e) => setRating(e.target.value)}
        required
      />
    ))}
  </div>
</Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="dark" className="mt-2 w-100">
              Submit Review
            </Button>
          </Form>

          <hr />

          <h5>Reviews</h5>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="mb-2">
                <Card.Body>
                  <Card.Text>
                    <strong>Rating:</strong> {"⭐".repeat(review.rating)}
                  </Card.Text>
                  <Card.Text>{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceDetail;
