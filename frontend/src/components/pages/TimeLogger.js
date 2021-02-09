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

      let loginRes = null;

      if (newActivity == null) {
        // make a new log
        let logInput = {date, minutes, activity};
        let token = localStorage.getItem("auth-token");
        loginRes = await Axios.post(
          "http://localhost:5000/log/new",
          logInput,
          {headers: {"x-auth-token": token}}
        )
      } else {
        let token = localStorage.getItem("auth-token");
        // // make new activity type
        let newActInput = {date, minutes, activity: newActivity};
        // let newAct = await Axios.post(
        //   "http://localhost:5000/users/addactivity",
        //   {activity: newActivity},
        //   {headers: {"x-auth-token": token}}
        // )

        // make a new activity log
        // let token = localStorage.getItem("auth-token");
        loginRes = await Axios.post(
          "http://localhost:5000/log/new",
          newActInput,
          {headers: {"x-auth-token": token}}
        )
      }
      
      console.log(loginRes);
      return loginRes;
    } catch (err) {
      console.log(err.message);
    }
  }

  function selectActivity(item) {
    setActivity(item);
  }


  return (
    <section className="time-logger form">
      <div>
        <h1>Start Logging!</h1>
        <form onSubmit={logTime}>
          {/* <form> */}
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date"
            onChange={e => setDate(e.target.value)}
          />
          <label htmlFor="activity">Activity:</label><br></br>
          { (activity == "new") ? (
            <div>
              {/* <h1>Add Activity: </h1> */}
              <input 
                type="string" 
                id="activity"
                onChange={e => setNewActivity(e.target.value)}
              />
              <center><button onClick={newAct}>+ Create</button></center>
              
            </div>
            
            
          ) : (
            <div>
            <h1>not new</h1>
              <select value={activity} id="activity" name="activity" onChange={e => selectActivity(e.target.value)}>
                {activities.map(
                  i =>
                  <option key={i.activity} value={i.activity}>{i.activity}</option>
                )}
              <option key="new" value="new" >new</option>
              </select><br></br>
            </div>
            
          )}
          
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
        </form>
      </div>
    </section>
  )
}
