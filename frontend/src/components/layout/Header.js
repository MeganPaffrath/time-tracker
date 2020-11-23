import React from 'react';
import {Link} from "react-router-dom";
import AuthMenu from '../auth/AuthMenu';

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1>Time Tracker</h1>
      </Link>
      <AuthMenu />
    </header>
  )
}
