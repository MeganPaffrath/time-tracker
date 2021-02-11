import React, {useState, useEffect, useContext} from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button } from 'react-bootstrap';

export default function TimeLogger() {
  const {userData} = useContext(UserContext);
  let [date, setDate] = useState();
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [activity, setActivity] = useState();
  const [newActivity, setNewActivity] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (userData != null && userData.activities != null && userData.activities.length > 0) {
      setActivity(userData.activities[0].activity);
      setActivities(userData.activities);
    }
  }, []);

  const newAct = async (e) => {
    try {
      if (!newActivity) {
        throw new Error("missing new activity");
      } else {
        let token = localStorage.getItem("auth-token");
        // make new activity type
        return await Axios.put(
          "http://localhost:5000/users/addactivity",
          {activity: newActivity},
          {headers: {"x-auth-token": token}}
        )
        
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const logTime = async (e) => {
    try {
      // make sure all logs were filled
      if (!date || !totalMinutes || !activity) {
        throw new Error("missing field");
      }

      // make a new log
      let logInput = {date, minutes: totalMinutes, activity};
      let token = localStorage.getItem("auth-token");
      return await Axios.post(
        "http://localhost:5000/log/new",
        logInput,
        {headers: {"x-auth-token": token}}
      )

      // return loginRes;
    } catch (err) {
      console.log(err.message);
    }
  }

  function selectActivity(item) {
    setActivity(item);
  }

  function reset() {
    setNewActivity(null);
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
        <h1>Start Logging!</h1>
        { (activity === "new") ? (
          <div>
            <Form onSubmit={newAct}>
              <Form.Group controlId="activity">
                <Form.Label>New Activity Type:</Form.Label>
                <Form.Control type="string" placeholder="Enter activity" onChange={e => setNewActivity(e.target.value)}/>
              </Form.Group>
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
        ) : (activities.length === 0) ? (
          <div>
            <p>Nothing exists yet, let's make a new activity category!</p>
            <Form onSubmit={newAct}>
              <Form.Group controlId="username">
                <Form.Label>New Activity Type:</Form.Label>
                <Form.Control type="activity" placeholder="Enter activity" onChange={e => setNewActivity(e.target.value)}/>
              </Form.Group>
              <center>
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
              {activities.map(
                  i =>
                  <option key={i.activity} value={i.activity}>{i.activity}</option>
                )}
                <option key="new" value="new">New</option>
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
