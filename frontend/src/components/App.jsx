import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Pages/content:
import Header from './layout/Header';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from './pages/Register';
import Footer from './layout/Footer';
// to keep track of user:
import UserContext from '../context/UserContext';


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    username: undefined,
    id: undefined,
    activities: undefined
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
        (process.env.REACT_APP_API_URL + "/users/validateToken"),
        null,
        {headers: {"x-auth-token": token}}
      );

      if (tokenRes.data) {
        const userRes = await Axios.get(
          (process.env.REACT_APP_API_URL + "/users/"),
          {headers: {"x-auth-token": token}}
        );
        setUserData({
          token,
          username: userRes.data.username,
          activities: userRes.data.activities
        });
      }
    }
    verifyUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <div className="hdr-and-content">
            <Header />
            <div className="contents">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </div>
            </div>
            <Footer />
        </UserContext.Provider>
          
      </BrowserRouter>
    </>
  )
}
