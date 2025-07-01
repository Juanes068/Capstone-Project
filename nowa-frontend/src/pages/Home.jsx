import React, { useEffect, useState } from 'react';
import { Container, Carousel, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function Home() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/reviews/1/`);
                setReviews(response.data);
            } catch (err) {
                setError('Failed to load reviews.');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <Container fluid className="p-0">
            {/* Title and Description */}
            <Container className="text-center mt-5">
                <h1>NOWA Barbershop</h1>
                <p className="mt-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Welcome to NOWA Barbershop, your specialized grooming destination. We offer a wide variety of
                    professional barbers dedicated to providing you with exceptional haircuts, beard trims, and personalized services to help you look your best.
                </p>
            </Container>

            {/* Services Carousel */}
            <Container className="mt-5" style={{ maxWidth: '800px' }}>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/images/services/haircut.jpg"
                            alt="Haircut"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <h5>Haircuts</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/images/services/shave.jpg"
                            alt="Shave"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <h5>Shaving</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/images/services/eye_brown.jpg"
                            alt="Eyebrow Styling"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <h5>Eyebrow Styling</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            {/* Google Maps */}
            <Container className="mt-5 text-center">
                <h4>Find Us</h4>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.9836145249074!2d-123.11565259999999!3d49.276707699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548671a5ad707a81%3A0x402a0c35ec8a9561!2sCanadian%20College%20of%20Technology%20and%20Business!5e0!3m2!1ses-419!2sca!4v1751369127785!5m2!1ses-419!2sca"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </Container>

            {/* Reviews Section */}
            <Container className="mt-5 mb-5">
                <h4 className="text-center mb-4">What Our Clients Say</h4>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="dark" />
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">{error}</Alert>
                ) : reviews.length === 0 ? (
                    <p className="text-center">No reviews yet.</p>
                ) : (
                    <Row>
                        {reviews.map((review) => (
                            <Col key={review.id} md={4} className="mb-3 d-flex justify-content-center">
                                <Card style={{ width: '18rem', borderRadius: '10px' }}>
                                    <Card.Body>
                                        <Card.Title>{"⭐️".repeat(review.rating)}</Card.Title>
                                        <Card.Text>{review.comment}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </Container>
    );
}

export default Home;
