import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Log() {
  const [logs, setLogs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    let token = localStorage.getItem("auth-token");
    Axios.get(
      "http://localhost:5000/log/getlogs",
      {headers: {"x-auth-token": token}}
    ).then(res => {
      if (isMounted) {
        setLogs(res.data);
      }
    }). catch(err => {
      console.log(err);
    })
    return () => {
      isMounted = false;
    }
  
  }, []);


  return (
    <section>
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
              <th>{new Date(log.date).getMonth()}/{new Date(log.date).getDate()}/{new Date(log.date).getFullYear()}</th>
              <th>{log.minutes}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
