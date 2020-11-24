import React from 'react';

export default function TimeLogger() {
  return (
    <section class="time-logger form">
      <div>
        <h1>Start Logging!</h1>
        <form>
          <label for="date">Date:</label>
          <input type="date" id="date"/>
          <label for="activity">Activity:</label><br></br>
          <select id="activity" name="activity">
            <option value="1">...1</option>
            <option value="2">...2</option>
            <option value="3">...3</option>
            <option value="4">...4</option>
          </select><br></br>
          <label for="minutes">Minutes:</label>
          <input type="number" id="minutes" min="0" />
          <input 
            type="submit" 
            value="Log It!" 
          />
        </form>
      </div>
    </section>
  )
}
