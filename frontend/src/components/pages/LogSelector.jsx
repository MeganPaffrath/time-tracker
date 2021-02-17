import React from 'react';
// HELPERS
import monthFromDate from "../../helpers/month-number-to-string.js";
import incrementMonth from "../../helpers/increment-month.js";
// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button, Form, ButtonGroup } from 'react-bootstrap';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

export default function LogsSelector( { view, setView, setActivityView, month, setMonth, 
                                        year, setYear, activities }) {
  
  // useEffect(() => {

  // }, [month, year])

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
        <div className="">
          { (view === 'all') ? <h1 class="log-selector-text">All Logs</h1> : ''}
          { (view === 'month' ? ( 
            <div class="log-selector-hdr">
              <Button className="month-selector-left" variant="dark" size="sm" onClick={() => changeTimeView(month, year, -1)}>
                <ArrowLeft className="button-icon"/>
              </Button >
              <div>
                <h1 className="log-selector-text">{monthFromDate(month)}</h1> <h2>{year}</h2>
              </div>
              <Button className="month-selector-right" variant="dark" size="sm" onClick={() => changeTimeView(month, year, 1)}>
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
        { (activities && activities.length !== 0) ? (
          <div className="activity-view-selector">
              <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label>
                    Activity:
                  </Form.Label>
                    <Form.Control as="select" onChange={e => setActivityView(e.target.value)}>
                      <option key="all" value="all">all</option>
                      {activities.map(
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
