import React from 'react';
import axios from 'axios';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

export default function LogList( {logs, update, setUpdate }) {

  const removeLog = async (id) => {
    try {
      let token = localStorage.getItem("auth-token");
      await axios({
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
  }

  let timeString = (minutes) => {
    let hrs = Math.floor(minutes/60);
    let min = minutes%60;
    return (hrs + "h " + min + "m");
  }

  return (
    <div>
      { (logs && logs.length !== 0) ? (
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Timespan</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <th>{log.activity}</th>
                <th>{new Date(log.date).getUTCMonth() + 1}/{new Date(log.date).getUTCDate()}/{new Date(log.date).getUTCFullYear()}</th>
                <th>{timeString(log.minutes)}</th>
                <th><Trash onClick={() => removeLog(log._id)}/></th>
                {/* <th><Button variant="light" size="sm" onClick={() => removeLog(log._id)}> <Trash /></Button></th> */}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (<p>No logs were found for this month.</p>) }
    </div>
  )
}
