import React, {useState, useEffect} from 'react';
import Axios from "axios";
import AllLogs from './log-views/AllLogs';
import MonthLogs from './log-views/MonthLogs';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Logs( { logs, setLogs, update, setUpdate, view, setView, activityView, setActivityView }) {

  // get logs from DB
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
      console.log(err.message);
    })
    return () => {
      isMounted = false;
    }
  }, [update]);


  return (
    <section className="logs-component">
      <Col>
        <div>
          <center><h1>Logs</h1></center>
          <p>All/Month: {view}</p>
          <p>Activity: {activityView}</p>
          <center>
            <Button variant="dark" onClick={() => setView('all')}>View All</Button>
            <Button variant="dark" onClick={() => setView('month')}>View By Month</Button>
          </center>
        </div>
      </Col>
      <Col>
        <div className="log-list">
          { (view === 'all') ? (
            <AllLogs logs={logs} update={update} setUpdate={setUpdate}/>
          ) : ''}
          { (view === 'month') ? (
            <MonthLogs 
              logs={logs} update={update} 
              activityView={activityView} setActivityView={setActivityView}
              setUpdate={setUpdate}
            />
          ) : ''}
        </div>
      </Col>
    </section>
  )
}
