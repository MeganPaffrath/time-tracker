import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from "axios";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [error, setError] = useState();
  // const {setUserData} = useContext(UserContext);
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    console.log("USER DATA from LOGIN: " + userData.username);
    if (userData.username) {
      history.push("/")
    }
  });
  

  // called when user clicks login
  const submit = async (e) => {
    e.preventDefault();

    try {
      const userLogin = {username, password};

      // try to log user in & get login result
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        userLogin
      );

      // if valid user, set token...
      setUserData({
        token: loginRes.data.token,
        username: loginRes.data.user.username
      });
      // update local storage
      localStorage.setItem("auth-token", loginRes.data.token);

      // change to home page
      history.push("/");
      
    } catch (err) {
      // set error
      // setError(err.message);
      console.log(err.message);
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Login:</h1>
        <form onSubmit={submit}>
          <label htmlFor="username">Username:</label>
          <input 
            type="username" 
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <input 
            type="submit" 
            value="Submit" 
          />
        </form>
      </div>
    </div>
  )
}
