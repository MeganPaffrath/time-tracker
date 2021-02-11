import React from 'react';
import {Link} from "react-router-dom";
import AuthMenu from '../auth/AuthMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from 'react-bootstrap';

export default function Header() {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">TimeTracker</Navbar.Brand>
        <AuthMenu />
      </Navbar>
    </div>
  )
}
