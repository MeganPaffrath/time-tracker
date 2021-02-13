import React from 'react'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const styles = { 
  width: '100%',
};  

export default function ErrorMsg({message, resetError}) {
  return (
    <div className="error-notice" style={styles}>
      <Button variant="dark" onClick={resetError}>x</Button> Error: {message}
    </div>
  )
}
