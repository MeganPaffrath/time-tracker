import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../../context/UserContext";
// import Home from './pages/Home';
import Axios from "axios";
import AllLogs from './log-views/AllLogs';
import MonthLogs from './log-views/MonthLogs';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LogsSelector( { logs, setLogs, update, setUpdate, view, setView }) {
  const {userData} = useContext(UserContext);

  console.log(userData.activities);

  function viewSetter(newView) {
    setView(newView);
  }

  useEffect(() => {
    let isMounted = true;
    let token = localStorage.getItem("auth-token");
    Axios.get(
      "http://localhost:5000/log/getlogs",
      {headers: {"x-auth-token": token}}
    ).then(res => {
      if (isMounted) {
        setLogs(res.data.sort((a,b) => (a.date < b.date) ? 1 : -1));
      }
    }).catch(err => {
      console.log(err);
    })
    return () => {
      isMounted = false;
    }
  }, [update]);


  return (
    <section className="logs-component">
      <Col>
        <center>
          <h1>View Logs By:</h1>
          <Button variant="dark" onClick={() => viewSetter('all')}>View All</Button>
          <Button variant="dark" onClick={() => viewSetter('month')}>View By Month</Button>
          {/* Category View */}
          { (userData.activities.length !== 0) ? (
            <div>
              <h3>View By Category:</h3>
              <Button variant="light" onClick={() => setView("all")}>all</Button>
              {userData.activities.map(
                i => <Button variant="light" onClick={() => setView(i.activity)}>{i.activity}</Button>
              )}
            </div>
            
          ) : (
            ''
          )}
          
          {/* {
            userData.activities.map((act) => {
              <p>act.activity</p>
            })
          } */}
        </center>
      </Col>
    </section>
  )
}
