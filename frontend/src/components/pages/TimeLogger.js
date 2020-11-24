import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import Axios from "axios";
import { useHistory } from 'react-router-dom';

export default function TimeLogger() {
  const [date, setDate] = useState();
  const [minutes, setMinutes] = useState();
  const [activity, setActivity] = useState();
  const [updated, setUpdated] = useState(false);
  const {setUserData} = useContext(UserContext);
  const history = useHistory();

  const logTime = async (e) => {
    e.preventDefault();
    try {
      const logInput = {date, minutes, activity};
      console.log(date, " ", minutes, " ", activity);
      
      // make sure all logs were filled
      if (!date || !minutes || !activity) {
        throw("Missing field");
      }

      // convert date to utc time
      var dateUTC = new Date(date);
      console.log(dateUTC);

      // make a new log
      let token = localStorage.getItem("auth-token");
      const loginRes = await Axios.post(
        "http://localhost:5000/log/new",
        logInput,
        {headers: {"x-auth-token": token}}
      );

      console.log(loginRes);
      setUpdated(true);

    } catch (err) {
      console.log(err.message);
    }
  }


  return (
    <section className="time-logger form">
      <div>
        <h1>Start Logging!</h1>
        <form onSubmit={logTime}>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date"
            onChange={e => setDate(e.target.value)}
          />
          <label htmlFor="activity">Activity:</label><br></br>
          <select value={activity} id="activity" name="activity" onChange={e => setActivity(e.target.value)}>
            <option value="Cow tipping">Cow Tipping</option>
            <option value="Bingo">Bingo</option>
            <option value="Igloo Building">Igloo Building</option>
          </select><br></br>
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
