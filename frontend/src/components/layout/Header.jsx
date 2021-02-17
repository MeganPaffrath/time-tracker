import React from 'react';
import AuthMenu from '../auth/AuthMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <div className="header bg-dark ">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Growth By Day</Navbar.Brand>
        <AuthMenu />
      </Navbar>
    </div>
  )
}
