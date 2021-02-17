import React, {useState, useEffect, useContext} from 'react';
import Axios from "axios";
// COMPONENTS
import ErrorMessage from "../other/ErrorMesage";
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button } from 'react-bootstrap';

export default function TimeLogger({ update, setUpdate, activities }) {
  let [date, setDate] = useState();
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  let [activity, setActivity] = useState("a");
  const [newActivity, setNewActivity] = useState(null);
  let [error, setError] = useState();


  useEffect(() => {
    if (activities != undefined && activities != null && activities.length > 0) {
      setActivity(activities[0].activity);
    }
  }, [update, activities])

  const newAct = async (e) => {
    e.preventDefault();
    try {
      if (!newActivity) {
        setError("missing field");
      } else {
        console.log("adding " + newActivity);
        let token = localStorage.getItem("auth-token");
        // make new activity type
        let ts = new Date(Date.now());
        let newAct = await Axios.put(
          (process.env.REACT_APP_API_URL + "/users/addactivity"),
          {activity: newActivity},
          {headers: {
            "x-auth-token": token,
            'Content-Type': 'application/json',
            'Cache-Control' : 'no-cache',
            time: ts
          }}
        )
        
        if (newAct) {
          reset();
        }
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  const logTime = async (e) => {
    e.preventDefault();
    
    try {
      // make sure all logs were filled
      if (!date || totalMinutes === 0 || !activity) {
        setError("missing information");
      } else {
        // make a new log
        let logInput = {date, minutes: totalMinutes, activity};
        let token = localStorage.getItem("auth-token");
        let ts = new Date(Date.now());
        const newLog =  await Axios.post(
          (process.env.REACT_APP_API_URL + "/log/new"),
          logInput,
          {headers: {
            "x-auth-token": token,
            'Content-Type': 'application/json',
            'Cache-Control' : 'no-cache',
            time: ts
          }}
        )

        // if new log, update
        if (newLog) {
          reset();
        }
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  }

  function selectActivity(item) {
    if (item === 'new') {
      setError(undefined);
    }
    setActivity(item);
  }

  function reset() {
    setError(undefined);
    setNewActivity(null);
    setUpdate(update + 1);
    window.location.reload(true);
  }

  function updateMinutes(min) {
    setMinutes(Number(min));
    updateTotalMinutes(hours, Number(min) );
  }

  function updateHours(hrs) {
    setHours(Number(hrs));
    updateTotalMinutes(Number(hrs), minutes);
  }

  function updateTotalMinutes(hrs, min) {
    setTotalMinutes( (hrs*60 + min) );
  }


  return (
    <section className="time-logger-component">
      <div className="form-box">
        <center>
          <h1>Start Logging!</h1>
        </center>
        { (activity === "new") ? (
          <div>
            <Form onSubmit={newAct}>
              <Form.Group controlId="activity">
                <Form.Label>New Activity Type:</Form.Label>
                <Form.Control type="string" placeholder="Enter activity" onChange={e => setNewActivity(e.target.value)}/>
              </Form.Group>
              <ErrorMessage message={error} />
              <center>
              <Button variant="dark" type="submit">
                Submit
              </Button>
              <Button variant="dark" type="cancel" onClick={reset}>
                Cancel
              </Button>
              </center>
            </Form>
          </div>
        ) : (activities && activities != null && activities.length === 0) ? (
          <div>
            <Form onSubmit={newAct}>
              <Form.Group controlId="username">
                <Form.Label>New Activity Type:</Form.Label>
                <Form.Control type="activity" placeholder="Enter activity" onChange={e => setNewActivity(e.target.value)}/>
              </Form.Group>
              <center>
              <ErrorMessage message={error} />
              <Button variant="dark" type="submit">
                Submit
              </Button>
              </center>
            </Form>
          </div>
        ): (
          <div>
            <Form onSubmit={logTime}>
            <Form.Group controlId="activity-select">
              <Form.Label>Select Activity</Form.Label>
              <Form.Control as="select" onChange={e => selectActivity(e.target.value)}>
              {(activities && activities !== null) ? (
                activities.map(
                  i =>
                  <option key={i.activity} value={i.activity}>{i.activity}</option>
                )
              ) : (
                <p>hi</p>
              )}
              
                <option key="new" value="new">new</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" onChange={e => setDate(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="hours">
              <Form.Label>Hours</Form.Label>
              <Form.Control type="number" min="0" max="24" onChange={e => updateHours(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="minutes">
              <Form.Label>Minutes</Form.Label>
              <Form.Control type="number" min="0" max="60" onChange={e => updateMinutes(e.target.value)}/>
            </Form.Group>
            <ErrorMessage message={error} />
            <center>
              <Button variant="dark" type="submit">
                Submit
              </Button>
            </center>
            </Form>
          </div>
        )}
      </div>
    </section>
  )
}
