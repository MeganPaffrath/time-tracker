import React from 'react';
import axios from 'axios';

export default function LogList( {logs, update, setUpdate }) {

  const removeLog = async (id) => {
    console.log(id + " id");
    try {
      let token = localStorage.getItem("auth-token");
      let removed =  await axios({
        method: 'DELETE',
        url: "http://localhost:5000/log/delete",
        data: {
          id: id
        },
        headers: {
          "x-auth-token": token
        }
      })
    } catch (err) {
      console.log(err.message);
    }

    setUpdate(update + 1);
    // this.setDeleted(deleted + 1);
    
  }

  return (
    <div>
      { (logs && logs.length != 0) ? (
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Minutes</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <th>{log.activity}</th>
                <th>{new Date(log.date).getUTCMonth() + 1}/{new Date(log.date).getUTCDate()}/{new Date(log.date).getUTCFullYear()}</th>
                <th>{log.minutes}</th>
                <th><button onClick={() => removeLog(log._id)}>delete</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no logs</p>
      )}
    </div>
  )
}
