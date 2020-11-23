import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Pages/content:
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import UserHome from './components/pages/UserHome';
import Login from "./components/pages/Login";
import Register from './components/pages/Register';
// to keep track of user:
import UserContext from './context/UserContext';



export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    username: undefined,
    id: undefined
  });

  useEffect(() => {
    const verifyUser = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      // check with db if token is valid
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/validateToken",
        null,
        {headers: {"x-auth-token": token}}
      );

      if (tokenRes.data) {
        const userRes = await Axios.get(
          "http://localhost:5000/users/",
          {headers: {"x-auth-token": token}}
        );
        setUserData({
          token,
          user: userRes.data
        });
      }
    }
    verifyUser();
  }, []);

  return (
    <>
      <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}
