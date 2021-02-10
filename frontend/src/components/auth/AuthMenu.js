import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {Nav} from 'react-bootstrap';

// determins what user sees if logged in/out
export default function AuthMenu() {
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    console.log("USER DATA from AUTH: " + userData.username);
    if (!userData.username) {
      history.push("/login");
    }
  });

  const register = () => { history.push("/register")};
  const login = () => { history.push("/login")};
  const logout = () => {
    console.log("attempt to log out")
    // reset user context
    setUserData({
      token: undefined,
      username: undefined
    })
    // reset localStorage
    localStorage.setItem("auth-token", "");
  }


  return (
    <Nav className="mr-auto">
      {
        userData.username ? (
          <>
            <Nav.Link>Hi {userData.username}!</Nav.Link>
            <Nav.Link onClick={logout}>LOGOUT</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link onClick={register}>Register</Nav.Link>
            <Nav.Link onClick={login}>Login</Nav.Link>
          </>
        )
      }
    </Nav>
  )
}
