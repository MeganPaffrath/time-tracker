import React, {useState, useEffect, useContext} from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";
// import { useHistory } from 'react-router-dom';

export default function TimeLogger() {
  const {userData} = useContext(UserContext);
  let [date, setDate] = useState();
  const [minutes, setMinutes] = useState();
  const [activity, setActivity] = useState();
  const [newActivity, setNewActivity] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (userData != null && userData.activities != null && userData.activities.length > 0) {
      setActivity(userData.activities[0].activity);
      setActivities(userData.activities);
      console.log(activity);
      console.log(activities);
    }
  }, []);

  console.log(newActivity);

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
      if (!date || !minutes || !activity) {
        throw new Error("missing field");
      }

      // make a new log
      let logInput = {date, minutes, activity};
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


  return (
    <section className="time-logger form">
      <div>
        <h1>Start Logging!</h1>
        <form onSubmit={logTime}>
          {/* <form> */}
          { (activity == "new") ? (
            <div>
              <label htmlFor="activity">Activity:</label><br></br>
              {/* <h1>Add Activity: </h1> */}
              <input 
                type="string" 
                id="activity"
                onChange={e => setNewActivity(e.target.value)}
              />
              <center>
                <button onClick={newAct}>+ Add</button>
                <button onClick={reset}>Cancel</button>
              </center>
              
            </div>
          ) : (activities.length == 0) ? (
            <div>
              <label htmlFor="activity">Activity:</label><br></br>
              <input 
                type="string" 
                id="activity"
                onChange={e => setNewActivity(e.target.value)}
              />
              <center>
                <button onClick={newAct}>+ Add</button>
              </center>
              
            </div>
          ) : (
            <div>
              <label htmlFor="activity">Activity:</label><br></br>
              <select value={activity} id="activity" name="activity" onChange={e => selectActivity(e.target.value)}>
                {activities.map(
                  i =>
                  <option key={i.activity} value={i.activity}>{i.activity}</option>
                )}
                <option key="new" value="new" >new</option>
              </select><br></br><br></br>
              <label htmlFor="date">Date:</label>
              <input 
                type="date" 
                id="date"
                onChange={e => setDate(e.target.value)}
              /><br></br>
              <label htmlFor="minutes">Minutes:</label>
              <input 
                type="number" 
                id="minutes" 
                min="0" 
                onChange={e => setMinutes(e.target.value)}
              />
              <input 
                type="submit" 
                value="Log It!" 
              />
            </div>
            
          )}
          
          
        </form>
      </div>
    </section>
  )
}
