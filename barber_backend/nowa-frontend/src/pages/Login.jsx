import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
            console.log(import.meta.env.VITE_REACT_APP_API_URL); // verifica URL

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/login/`, {
                username,
                password
            });

            localStorage.setItem('token', response.data.access);
            navigate('/Home'); // Redirige tras login
        } catch (err) {
            setError('Incorrect username or password. Please try again.');
        }
    };

    return (
        <Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
            <h2>LOG-IN</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                    <Form.Label>NICK-NAME</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100"
                >
                    LOG-IN
                </Button>

                <Button variant="dark" className="w-100 mt-3"
                onClick={() => navigate('/register')}
                >
                Don't have an account? Register
                </Button>
            </Form>
        </Container>
    );
}

export default Login; 
