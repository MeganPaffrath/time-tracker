import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from "axios";

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [verifyPassword, setVerifyPassword] = useState();

  // const [error, setError] = useState();
  const {setUserData} = useContext(UserContext);
  const history = useHistory();
  

  // called when user clicks register
  const submitRegister = async (e) => {
    e.preventDefault();

    try {
      const userRegister = {username, password, verifyPassword, email};
      // try to create user
      await Axios.post(
        "http://localhost:5000/users/register",
        userRegister
      );

      // try to log user in & get login result
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        userRegister
      );

      // if valid user, set token...
      await setUserData({
        token: loginRes.data.token,
        username: loginRes.data.user.username
        // userID: loginRes.data.user.id
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
        <h1>Register:</h1>
        <form onSubmit={submitRegister}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            placeholder="email@email.com"
            onChange={e => setEmail(e.target.value)}
          />
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
          <label htmlFor="verify">Verify Password:</label>
          <input 
            type="password" 
            placeholder="password"
            onChange={e => setVerifyPassword(e.target.value)}
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
