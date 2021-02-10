import React, {useState, useEffect} from 'react';
// import Home from './pages/Home';
// import UserContext from "../../context/UserContext";
import Axios from "axios";
import AllLogs from './log-views/AllLogs';
import MonthLogs from './log-views/MonthLogs';

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
    <section className="logs">
      <div>
        <center>
          <button onClick={() => viewSetter('all')}>All Logs</button>
          <button onClick={() => viewSetter('month')}>Month View</button>
        </center>
        <br />
        <br />
        <AllLogs logs={logs} update={update} setUpdate={setUpdate}/>
        <br />
        <MonthLogs logs={logs} update={update} setUpdate={setUpdate}/>
      </div>
    </section>
  )
}
