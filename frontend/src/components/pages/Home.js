import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import Logs from './Logs';
import LogChart from './log-views/LogChart';
import TimeLogger from './TimeLogger';
import LogSelector from './LogSelector';
import Bargraph from './graphs/Bargraph';
import LogList from './log-views/LogList';
import axios from 'axios';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// HELPER
import filteredLogs from '../../helpers/log-filter.js';



export default function Home() {
  // DATA & HISTORY:
  const {userData} = useContext(UserContext);
  const history = useHistory();
  // BY VIEW:
  const [view, setView] = useState("all"); // or month
  const [activityView, setActivityView] = useState('all'); // or category
  // LOG GROUPS
  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  // CURRENT VIEW
  const [month, setMonth] = useState(new Date().getMonth());
  const [year,setYear] = useState(new Date().getUTCFullYear());
  // UPDATE
  const [update, setUpdate] = useState(0);

  if (logs && selectedLogs) {
    console.log("There are " + logs.length + " logs.\n"
    + selectedLogs.length + ' of which are in the ' + activityView + ' category\n'
    + "viewing the " + month + ' month of ' + year);
  }
  
  

  // get logs from DB
  useEffect(() => {
    console.log("use effect of home");
    let isMounted = true;
    let token = localStorage.getItem("auth-token");
    axios.get(
      "http://localhost:5000/log/getlogs",
      {headers: {"x-auth-token": token}}
    ).then(res => {
      if (isMounted) {
        setLogs(res.data.sort((a,b) => (a.date < b.date) ? 1 : -1));
        setSelectedLogs(res.data.sort((a,b) => (a.date < b.date) ? 1 : -1));
      }
    }).catch(err => {
      console.log(err);
    })
    return () => {
      isMounted = false;
    }
  }, [update]);

  useEffect(() => {
    setSelectedLogs(filteredLogs(logs, month, year, view, activityView));
  }, [month, year, view, activityView]);
  
  // useEffect(() => {
  //   setSelectedLogs(filteredLogs(logs, month, year, view, activityView));
  // }, [activityView]);

  // useEffect(() => {
  //   setSelectedLogs(filteredLogs(logs, month, year, view, activityView));
  // }, [view]);

  useEffect(() => { 
    console.log("selected logs chagned");
  }, [selectedLogs])

  console.log(selectedLogs);

  if (!userData.username) {
    history.push("/login");
  }

  console.log("logs size from HOME.js: " + logs.length);

  return (
    <div>
      <Container className="logs-component">
        <Row>
          <Col>
          <section>
            <TimeLogger 
              // userData={userData}
            />
            </section>
          </Col>
          <Col>
            <section>
              <LogSelector
                view={view} setView={setView}
                activityView={activityView} setActivityView={setActivityView}
                month={month} setMonth={setMonth}
                year={year} setYear={setYear}
              />
              <Bargraph
                selectedLogs={selectedLogs}
                month={month}
                year={year}
                view={view}
                activityView={activityView}
              />
            </section>
          </Col>
          <Col>
            <section>
              <LogChart 
                logs={selectedLogs}
                month={month}
                year={year}
                update={update}
                setUpdate={setUpdate}
                view={view}
                category={activityView}
              />
            </section>
          </Col>
          {/* <Col>
            <Logs 
              logs={logs} setLogs={setLogs}
              view={view} setView={setView}
              activityView={activityView} setActivityView={setActivityView}
            />
          </Col> */}
        </Row>
      </Container>
    </div>
  )

  
}

