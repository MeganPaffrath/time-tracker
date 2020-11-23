import React from 'react';
import { useHistory } from 'react-router-dom';

// determins what user sees if logged in/out
export default function AuthMenu() {

  const history = useHistory();

  const register = () => { history.push("/register")};
  const login = () => { history.push("/login")};

  return (
    <nav>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </nav>
  )
}
