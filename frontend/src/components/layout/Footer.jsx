import React from 'react'

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h5>&copy; Megan Paffrath {year}</h5>
      <p>meganpaffrath.com</p>
    </footer>
  )
}
