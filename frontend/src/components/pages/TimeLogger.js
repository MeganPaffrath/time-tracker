import React, {useState, useEffect, useContext} from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";
// import { useHistory } from 'react-router-dom';

export default function TimeLogger() {
  const {userData} = useContext(UserContext);
  let [date, setDate] = useState();
  const [minutes, setMinutes] = useState();
  const [activity, setActivity] = useState();
  const [activities, setActivities] = useState( {hits: []} );
  // const {setUserData} = useContext(UserContext);
  // const history = useHistory();


  //https://www.robinwieruch.de/react-hooks-fetch-data
  useEffect(() => {
    // const result = await Axios.get(
    //     "http://localhost:5000/users/activities",
    //     {headers: {"x-auth-token": userData.token}}
    //   )

    // setActivities(result.data);
  }, []);

  const logTime = async (e) => {
    try {
      // make sure all logs were filled
      if (!date || !minutes || !activity) {
        throw new Error("missing field");
      }

      let logInput = {date, minutes, activity};
      // make a new log
      let token = localStorage.getItem("auth-token");
      const loginRes = await Axios.post(
        "http://localhost:5000/log/new",
        logInput,
        {headers: {"x-auth-token": token}}
      )
      console.log(loginRes);
      return loginRes;
    } catch (err) {
      console.log(err.message);
    }
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
          {/* {activities.map(a => <h1>{a}</h1>)} */}
          <label htmlFor="activity">Activity:</label><br></br>
          <select value={activity} id="activity" name="activity" onChange={e => setActivity(e.target.value)}>
            {activities.hits.map(
              i =>
              <option value={i}>{i}</option>
            )}
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
