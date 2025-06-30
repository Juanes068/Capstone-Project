import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#000', color: '#aaa', padding: '1rem 0', textAlign: 'center' }}>
            <Container>
                <small>&copy; {new Date().getFullYear()} NOWA BARBER-SHOP. All rights reserved.</small>
                <div></div>
                <small>JUAN TRIANA</small>
            </Container>
        </footer>
    );
}

export default Footer;
