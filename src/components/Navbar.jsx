import React from 'react';
import { Navbar } from 'react-bootstrap';

const MyNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Cine Demo</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;