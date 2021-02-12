import React, { useContext } from 'react';
import UserContext from "../../context/UserContext";
// Helpers
import monthFromDate from "../../helpers/next-or-prev-month.js";
import incrementMonth from "../../helpers/increment-month.js";
// import Home from './pages/Home';
import Axios from "axios";
import AllLogs from './log-views/AllLogs';
import MonthLogs from './log-views/MonthLogs';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LogsSelector( { view, setView, activityView, 
                                        setActivityView, month, setMonth, 
                                        year, setYear }) {

  const {userData} = useContext(UserContext);
  console.log(userData.activities);

  function viewSetter(newView) {
    setView(newView);
  }

  function changeTimeView(monthIn, yearIn, incrementBy) {
    let monthYear = incrementMonth(monthIn, yearIn, incrementBy);
    setMonth(monthYear.month);
    setYear(monthYear.year);
  }

  // useEffect(() => {
  //   let isMounted = true;
  //   let token = localStorage.getItem("auth-token");
  //   Axios.get(
  //     "http://localhost:5000/log/getlogs",
  //     {headers: {"x-auth-token": token}}
  //   ).then(res => {
  //     if (isMounted) {
  //       setLogs(res.data.sort((a,b) => (a.date < b.date) ? 1 : -1));
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   })
  //   return () => {
  //     isMounted = false;
  //   }
  // }, [update]);


  return (
    <section className="logs-component">
      <center>
        { (view === 'all') ? <h1>All Logs</h1> : ''}
        { (view === 'month' ? ( 
          <div>
            <h1>{monthFromDate(month)} {year}</h1>
            <Button variant="dark" size="sm" onClick={() => changeTimeView(month, year, -1)}>Previous Month</Button> 
            <Button variant="dark" size="sm" onClick={() => changeTimeView(month, year, 1)}>Next Month</Button> 
          </div>
        ) : '')}
        { (view !== 'month') ? <Button variant="dark" size="sm" onClick={() => viewSetter('month')}>View By Month</Button> : ''}
        { (view !== 'all') ? <Button variant="dark" size="sm" onClick={() => viewSetter('all')}>View All</Button> : '' }
        {/* Category View */}
        { (userData && userData.activities && userData.activities.length !== 0) ? (
          <div>
            <h2>Category: {activityView}</h2>
            {/* <p>Change category:</p> */}
            { (activityView !== 'all') ? <Button variant="light" size="sm" onClick={() => setActivityView("all")}>all</Button> : ''}
            {userData.activities.map( (i) => {
              if (i.activity !== activityView ) {
                return <Button variant="light" key={i.activity} size="sm" onClick={() => setActivityView(i.activity)}>{i.activity}</Button>
              }
            })}
          </div>
        ) : (
          ''
        )}
      </center>
    </section>
  )
}
