import React, { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import Register from './components/pages/Register';
// to keep track of user:
import UserContext from './context/UserContext';



export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    username: undefined
  });

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
