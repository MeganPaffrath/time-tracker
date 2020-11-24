import React, {useEffect, useContext, useState} from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Log() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    Axios.get(
      "http://localhost:5000/log/getlogs",
      {headers: {"x-auth-token": token}}
    ).then(res => {
      setLogs(res.data);
    }). catch(err => {
      console.log(err);
    })
  
  }, []);


  return (
    <section>
      <table>
      <tr>
        <th>Activity</th>
        <th>Date</th>
        <th>Minutes</th>
      </tr>
        {logs.map(log => (
          <tr key={log._id}>
            <th>{log.activity}</th>
            <th>{new Date(log.date).getMonth()}/{new Date(log.date).getDate()}/{new Date(log.date).getFullYear()}</th>
            <th>{log.minutes}</th>
          </tr>
        ))}
      </table>
    </section>
  )
}
