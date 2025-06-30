import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/login');
    };

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#000' }}>
                    Welcome to NOWA BARBER-SHOP
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#333', marginTop: '1rem' }}>
                    Book your haircut easily
                </p>
                <Button 
                    variant="dark" 
                    size="lg" 
                    style={{ marginTop: '1.5rem' }}
                    onClick={handleBookNow}
                >
                   BOOK NOW
                </Button>
            </Container>
        </div>
    );
}

export default Home;
