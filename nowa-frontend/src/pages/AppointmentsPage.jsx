import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/my-appointments/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointments(response.data);
            } catch (err) {
                setError('Failed to fetch appointments.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" variant="dark" />
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
        <Container className="mt-4">
            <h2 className="mb-4 text-center">My Appointments</h2>
            {appointments.length === 0 ? (
                <p className="text-center">You have no appointments yet.</p>
            ) : (
                appointments.map((appointment) => (
                    <Card key={appointment.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>Appointment #{appointment.id}</Card.Title>
                            <Card.Text><strong>Date:</strong> {appointment.date}</Card.Text>
                            <Card.Text><strong>Time:</strong> {appointment.time}</Card.Text>
                            <Card.Text><strong>Status:</strong> {appointment.status}</Card.Text>
                            <Card.Text><strong>Services:</strong> {appointment.services.map(s => s.name).join(", ")}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
}

export default AppointmentsPage;
