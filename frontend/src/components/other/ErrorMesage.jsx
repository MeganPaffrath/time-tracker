import React from 'react'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { XCircleFill, ArrowLeft, XSquareFill, X } from 'react-bootstrap-icons';

const errorStyle = {
  boxSizing: 'border-box',
  width: '100%',
  backgroundColor: '#C16E70',
  border: '2px solid #8F3D3F',
  borderRadius: '3px',
  textAlign: 'center',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
  padding: '5px 0'
}

const blankStyle = {
  boxSizing: 'border-box',
  width: '100%',
  border: '2px solid transparent',
  textAlign: 'center',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
  padding: '5px 0'
}

export default function ErrorMsg({message, resetError}) {
  return (
    (message) ? (
      <p style={errorStyle}>Error: {message}</p>
    ) : ( <p style={blankStyle}>&nbsp;</p>)
    
   
  )
}
