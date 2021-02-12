import React, { useContext } from 'react';
import UserContext from "../../context/UserContext";
// Helpers
import monthFromDate from "../../helpers/month-number-to-string.js";
import incrementMonth from "../../helpers/increment-month.js";
// import Home from './pages/Home';
import Axios from "axios";
// import AllLogs from './log-views/AllLogs';
import MonthLogs from './log-views/MonthLogs';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form  } from 'react-bootstrap';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

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
            <Button className="month-selector" variant="dark" size="sm" onClick={() => changeTimeView(month, year, -1)}><ArrowLeft /></Button>
            <h1 class="month-text">{monthFromDate(month)} {year}</h1>
            <Button className="month-selector" variant="dark" size="sm" onClick={() => changeTimeView(month, year, 1)}><ArrowRight /></Button> 
          </div>
        ) : '')}
        { (view !== 'month') ? <Button variant="dark" size="md" onClick={() => viewSetter('month')}>View By Month</Button> : ''}
        { (view !== 'all') ? <Button variant="dark" size="md" onClick={() => viewSetter('all')}>View All</Button> : '' }
        {/* Category View */}
        { (userData && userData.activities && userData.activities.length !== 0) ? (
          <div>
              <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Activity:
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control as="select" onChange={e => setActivityView(e.target.value)}>
                      {userData.activities.map(
                        i =>
                        <option key={i.activity} value={i.activity}>{i.activity}</option>
                      )}
                      <option key="all" value="all">all</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>       
          </div>
        ) : (
          ''
        )}
      </center>
    </section>
  )
}
