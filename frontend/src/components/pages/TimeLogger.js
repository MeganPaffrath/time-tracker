import React, { useContext, useState } from 'react';

export default function TimeLogger() {
  const [date, setDate] = useState();
  const [minutes, setMinutes] = useState();
  const [activity, setActivity] = useState("");

  const logTime = async (e) => {
    e.preventDefault();
    try {
      const logInput = {date, minutes, activity};
      console.log(date, " ", minutes, " ", activity);
      // const userLogin = {username, password};

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <section class="time-logger form">
      <div>
        <h1>Start Logging!</h1>
        <form onSubmit={logTime}>
          <label for="date">Date:</label>
          <input 
            type="date" 
            id="date"
            onChange={e => setDate(e.target.value)}
          />
          <label for="activity">Activity:</label><br></br>
          <select value={activity} id="activity" name="activity" onChange={e => setActivity(e.target.value)}>
            <option value="Cow tipping">Cow Tipping</option>
            <option value="Bingo">Bingo</option>
            <option value="Igloo Building">Igloo Building</option>
          </select><br></br>
          <label for="minutes">Minutes:</label>
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
