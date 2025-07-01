import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

function PaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/payments/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPayments(response.data);
            } catch (err) {
                setError('Failed to fetch payments.');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
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
            <h2 className="mb-4 text-center">My Payments</h2>
            {payments.length === 0 ? (
                <p className="text-center">You have no payments yet.</p>
            ) : (
                payments.map((payment) => (
                    <Card key={payment.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment ID: {payment.id}</Card.Title>
                            <Card.Text><strong>Amount:</strong> ${parseFloat(payment.amount).toFixed(2)}</Card.Text>
                            <Card.Text><strong>Date:</strong> {new Date(payment.payment_date).toLocaleDateString()}</Card.Text>
                            <Card.Text><strong>Service:</strong> Appointment #{payment.appointment}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
}

export default PaymentsPage;
