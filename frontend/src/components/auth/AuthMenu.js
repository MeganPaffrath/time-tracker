import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

// determins what user sees if logged in/out
export default function AuthMenu() {
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  if (userData.user) {
    history.push("/");
  }

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
    <nav>
      {
        userData.user ? (
          <>
            <button>Hi {userData.user.username}!</button>
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
