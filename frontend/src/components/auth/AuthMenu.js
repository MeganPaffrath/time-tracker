import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

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
    <nav>
      {
        userData.username ? (
          <>
            <button>Hi {userData.username}!</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </>
        )
      }
    </nav>
  )
}
