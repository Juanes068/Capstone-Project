import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }
    
    return (
        <Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
            <Card>
                <Card.Body>
                    <Card.Title>USER PROFILE</Card.Title>
                    <Card.Text><strong>ID:</strong> {profile.id}</Card.Text>
                    <Card.Text><strong>NICK-NAME:</strong> {profile.username}</Card.Text>
                    <Card.Text><strong>E-mail:</strong> {profile.email}</Card.Text>
                    <Button 
                     variant="dark" 
                    className="mt-3 w-100"
                    onClick={() => navigate('/edit-profile')}
                    >
                     Edit Profile
                    </Button>
                </Card.Body>
            </Card>
        </Container>
        
    );
}

export default Profile;
