import React, { useState, useEffect } from 'react';
import LogChart from './log-views/LogChart';
import TimeLogger from './TimeLogger';
import LogSelector from './LogSelector';
import Bargraph from './graphs/Bargraph';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// HELPER
import filteredLogs from '../../helpers/log-filter.js';

export default function LogsAndTracker() {

  // const Activity 


  // ACTIVITIES
  const [activities, setActivities] = useState([]);
  // BY VIEW:
  const [view, setView] = useState("month"); // or all
  const [activityView, setActivityView] = useState('all'); // or category
  // LOG GROUPS
  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  // CURRENT VIEW
  const [month, setMonth] = useState(new Date().getMonth());
  const [year,setYear] = useState(new Date().getUTCFullYear());
  // UPDATE
  const [update, setUpdate] = useState(0);

  useEffect(() => {
  }, [activities]);
  
  // get logs & activities list from DB
  useEffect(() => {
    let isMounted = true;
    let token = localStorage.getItem("auth-token");

    try {
      const getLogs = async (e) => {
        let ts = new Date(Date.now());
        let logs = await axios.get(
          (process.env.REACT_APP_API_URL + "/log/getlogs"),
          {headers: {
            "x-auth-token": token,
            'Content-Type': 'application/json',
            'Cache-Control' : 'no-cache',
            time: ts
          }}
        )
        setLogs(logs.data.sort((a,b) => (a.startTime < b.startTime) ? 1 : -1));
        setSelectedLogs(logs.data.sort((a,b) => (a.startTime < b.startTime) ? 1 : -1));
      }

      const getActivities = async (e) => {
        let ts = new Date(Date.now());
        let activities = await axios.get(
          (process.env.REACT_APP_API_URL + "/users"),
          {headers: {
            "x-auth-token": token,
            'Content-Type': 'application/json',
            'Cache-Control' : 'no-cache',
            time: ts
          }}
        )
        setActivities(activities.data.activities);
      }
      getLogs();
      getActivities();
    } catch (err) {
      console.log(err);
    }
  }, [update]);

  // console.log(logs);

  useEffect(() => {
    setSelectedLogs(filteredLogs(logs, month, year, view, activityView));
  }, [month, year, view, activityView, logs]);

  useEffect(() => { 
    // console.log("selected logs chagned");
    // console.log(selectedLogs);
  }, [selectedLogs])


  return (
    <div>
      <Container className="logs-component">
        <Row>
          <Col md>
          <section>
            <TimeLogger 
              update={update}
              setUpdate={setUpdate}
              activities={activities}
            />
            </section>
          </Col>
          <Col md> 
            <section>
              <LogSelector
                view={view} setView={setView}
                activityView={activityView} setActivityView={setActivityView}
                month={month} setMonth={setMonth}
                year={year} setYear={setYear}
                activities={activities}
              />
              <LogChart 
                logs={selectedLogs}
                month={month}
                year={year}
                update={update}
                setUpdate={setUpdate}
                view={view}
                category={activityView}
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
        </Row>
      </Container>
    </div>
  )

  
}

