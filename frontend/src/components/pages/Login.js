import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from "axios";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const {setUserData} = useContext(UserContext);
  const history = useHistory();
  

  // called when user clicks login
  const submit = async (e) => {
    e.preventDefault();

    try {
      const userLogin = {username, password};

      // try to log user in & get login result
      const loginRes = Axios.post(
        "http://localhost:5000/users/login",
        userLogin
      );

      // if valid user, set token...

      // change to home page
      
    } catch (err) {
      console.log(err.message);
      // set error
      // setError(err.)
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
