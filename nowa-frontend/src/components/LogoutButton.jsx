import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Nav.Link onClick={handleLogout}>
            LOG-OUT 
        </Nav.Link>
    );
    
}

export default LogoutButton;
