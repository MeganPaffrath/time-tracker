import React from 'react';
// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Row, Button, Form, ButtonGroup } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './footer.css';

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h5>&copy; Megan Paffrath {year}</h5>
      <p>
        <a href="https://www.meganpaffrath.com/" target="_blank">meganpaffrath.com</a>
        <a href="https://github.com/MeganPaffrath" target="_blank"><Github /></a>
        <a href="https://www.linkedin.com/in/meganpaffrath/" target="_blank"><Linkedin /></a>
      </p>
    </footer>
  )
}
