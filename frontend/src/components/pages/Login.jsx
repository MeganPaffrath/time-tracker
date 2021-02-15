import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from "axios";
import ErrorMessage from "../other/ErrorMesage";
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Container, Row} from 'react-bootstrap';

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
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
        (process.env.REACT_APP_API_URL + "/users/login"),
        userLogin
      );

      // if valid user, set token...
      setUserData({
        id: loginRes.data.id,
        username: loginRes.data.user.username
      });
      // update local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      // change to home page
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <div className="form-box login-form">
          <h1>Login</h1>
          <Form onSubmit={submit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <ErrorMessage message={error} />
            <center>
            <Button variant="dark" type="submit">
              Submit
            </Button>
            <Button variant="dark" onClick={() => { history.push("/register")}}>
              Register
            </Button>
            </center>
          </Form>
        </div>
      </Row>
    </Container>
  )
}