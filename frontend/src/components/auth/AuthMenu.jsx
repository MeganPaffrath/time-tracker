import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {Nav, NavDropdown} from 'react-bootstrap';

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
      username: undefined,
      id: undefined,
      activities: undefined
    })
    // reset localStorage
    localStorage.setItem("auth-token", "");
  }


  return (
    // container-fluid
    <Nav className="auth-nav container-fluid">
      {
        userData.username ? (
          <>
          <Nav.Link></Nav.Link>
          <NavDropdown title={userData.username} id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={logout}>
              Logout
            </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Nav.Link></Nav.Link>
            <Nav.Link onClick={login}>Login</Nav.Link>
          </>
        )
      }
    </Nav>
  )
}
