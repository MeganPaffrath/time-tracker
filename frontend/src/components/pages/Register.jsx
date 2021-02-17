import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from "axios";
// COMPONENTS
import ErrorMessage from "../other/ErrorMesage";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Container, Row} from 'react-bootstrap';

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [error, setError] = useState();

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
        (process.env.REACT_APP_API_URL + "/users/register"),
        userRegister
      );

      // try to log user in & get login result
      const loginRes = await Axios.post(
        (process.env.REACT_APP_API_URL + "/users/login"),
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
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  console.log(error);


  return (
    <Container>
    <Row className="justify-content-md-center">
      <div className="form-box login-form">
        <h1>Register</h1>
        <Form onSubmit={submitRegister}>
          <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control type="password" placeholder="Verify Password" onChange={e => setVerifyPassword(e.target.value)}/>
          </Form.Group>
          <center>
          <ErrorMessage message={error} />
          <Button variant="dark" type="submit">
            Submit
          </Button>
          </center>
        </Form>
      </div>
    </Row>
  </Container>
  )
}

/*

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
    */