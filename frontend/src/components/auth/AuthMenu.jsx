import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {Nav, NavDropdown} from 'react-bootstrap';
import axios from 'axios';

// determins what user sees if logged in/out
export default function AuthMenu() {
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const verifyUser = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
        // redirect user
        history.push("/login");
      }

      if (token) {
        try {
          // check with db if token is valid
          let ts = new Date(Date.now());
          const tokenRes = await axios.post(
            (process.env.REACT_APP_API_URL + "/users/validateToken"),
            {},
            {headers: {
              "x-auth-token": token,
              'Content-Type': 'application/json',
              'Cache-Control' : 'no-cache',
              time: ts
            }}
          );

          if (tokenRes) {
            const userRes = await axios.get(
              (process.env.REACT_APP_API_URL + "/users/"),
              {headers: {
                "x-auth-token": token,
                'Content-Type': 'application/json',
                'Cache-Control' : 'no-cache',
                time: ts
              }}
            );
            setUserData({
              id: userRes.data.id,
              username: userRes.data.username
            });
          }   
        } catch (err) {
          localStorage.setItem("auth-token", "");
          token = "";
          // redirect user
          history.push("/login");
        }
      }
    }
    
    verifyUser();
    
  }, []);

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
    history.push("/login");
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
