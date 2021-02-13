import React, { useContext } from 'react';
// CONTEXT
import UserContext from "../../context/UserContext";
// HELPERS
import monthFromDate from "../../helpers/month-number-to-string.js";
import incrementMonth from "../../helpers/increment-month.js";
// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button, Form, ButtonGroup } from 'react-bootstrap';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

export default function LogsSelector( { view, setView, setActivityView, month, setMonth, 
                                        year, setYear }) {

  const {userData} = useContext(UserContext);

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
        <div className="log-selector-hdr">
          { (view === 'all') ? <h1>All Logs</h1> : ''}
          { (view === 'month' ? ( 
            <div>
              <Button className="month-selector" variant="dark" size="sm" onClick={() => changeTimeView(month, year, -1)}>
                <ArrowLeft className="button-icon"/>
              </Button >
              <h1 className="month-text">{monthFromDate(month)} {year}</h1>
              <Button className="month-selector" variant="dark" size="sm" onClick={() => changeTimeView(month, year, 1)}>
                <ArrowRight className="button-icon"/>
              </Button> 
            </div>
          ) : '')}
          </div>
        { (view === 'month') ? (
          <div className="view-buttons">
            <ButtonGroup size="md">
              <Button variant="dark" onClick={() => viewSetter('month')}>Month View</Button>
              <Button variant="secondary" onClick={() => viewSetter('all')}>View All</Button>
            </ButtonGroup>
          </div>
        ) : (view === 'all') ? ( 
          <div className="view-buttons">
            <ButtonGroup size="md">
              <Button variant="secondary" onClick={() => viewSetter('month')}>Month View</Button>
              <Button variant="dark" onClick={() => viewSetter('all')}>View All</Button>
            </ButtonGroup>
          </div>
        ) : ( 
          <div className="view-buttons">
            <ButtonGroup size="md">
              <Button variant="secondary" onClick={() => viewSetter('month')}>Month View</Button>
              <Button variant="secondary" onClick={() => viewSetter('all')}>View All</Button>
            </ButtonGroup>
            {console.log("UNEXPECTED VIEW TYPE")}
          </div>
        )}
        { (userData && userData.activities && userData.activities.length !== 0) ? (
          <div className="activity-view-selector">
              <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label>
                    Activity:
                  </Form.Label>
                    <Form.Control as="select" onChange={e => setActivityView(e.target.value)}>
                      <option key="all" value="all">all</option>
                      {userData.activities.map(
                        i =>
                        <option key={i.activity} value={i.activity}>{i.activity}</option>
                      )}
                    </Form.Control>
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
