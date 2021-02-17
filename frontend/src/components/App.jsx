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
import { useHistory } from 'react-router-dom';


export default function App() {
  const history = useHistory();
  const [userData, setUserData] = useState({
    id: undefined,
    username: undefined
  });

  useEffect(() => {
    const verifyUser = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      if (token) {
        try {
          // check with db if token is valid
          let ts = new Date(Date.now());
          const tokenRes = await Axios.post(
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
            const userRes = await Axios.get(
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
        }
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
