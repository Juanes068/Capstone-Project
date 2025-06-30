import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (err) {
                setError('Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const token = localStorage.getItem('token');
        try {
            await axios.patch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/profile/`,
                { username, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Profile updated successfully.');
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
            <h2>Edit Profile</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default EditProfile;
