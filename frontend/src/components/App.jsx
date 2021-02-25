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

  useEffect(() => console.log("app load"))

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
