import React, {useState, useEffect} from 'react';
// import Home from './pages/Home';
// import UserContext from "../../context/UserContext";
import Axios from "axios";
import AllLogs from './log-views/AllLogs';
import MonthLogs from './log-views/MonthLogs';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [update, setUpdate] = useState(0);
  const [view, setView] = useState("all");
  const [activities, setActivities] = useState([]);

  function showLogs() {
    logs.forEach(log => {
      console.log(log);
    })
  }

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
      <div>
        <center><h1>Logs</h1></center>
        <center>
          <Button variant="dark" onClick={() => viewSetter('all')}>All Logs</Button>
          <Button variant="dark" onClick={() => viewSetter('month')}>Month Logs</Button>
        </center>
        <div className="log-list">
        { (view === 'all') ? (
          <AllLogs logs={logs} update={update} setUpdate={setUpdate}/>
        ) : ''}
        { (view === 'month') ? (
          <MonthLogs logs={logs} update={update} setUpdate={setUpdate}/>
        ) : ''}
        </div>
      </div>
    </section>
  )
}
