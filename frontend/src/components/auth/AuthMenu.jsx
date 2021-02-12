import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {Nav} from 'react-bootstrap';

// determins what user sees if logged in/out
export default function AuthMenu() {
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.username) {
      history.push("/login");
    }
  });

  const register = () => { history.push("/register")};
  const login = () => { history.push("/login")};
  const logout = () => {
    // reset user context
    setUserData({
      token: undefined,
      username: undefined
    })
    // reset localStorage
    localStorage.setItem("auth-token", "");
  }


  return (
    // container-fluid
    <Nav className="container-fluid auth-nav">
      {
        userData.username ? (
          <>
            <Nav.Item>
              <Nav.Link>Hi {userData.username}!</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav.Item>
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
