import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/register/`, {
                username,
                email,
                password
            });
            setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError('Try another nickname or email address.');
        }
    };

    return (
        <Container className="mt-4 mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
            <h2>REGISTER</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>NICK-NAME</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>E-MAIL</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                    Register
                </Button>

                <Button variant="dark" className="w-100 mt-3"
                onClick={() => navigate('/Login')}
                >
                Do Have an account? LOG-IN
                </Button >
            </Form>
        </Container>
    );
}

export default Register;
