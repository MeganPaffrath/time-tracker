import React from 'react';
import axios from 'axios';

// helpers
import monthFromDate from '../../../helpers/month-number-to-string';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

export default function LogList( {logs, update, setUpdate, category, view, month, year }) {
  console.log(logs);

  const removeLog = async (id) => {
    let ts = new Date(Date.now());
    try {
      let token = localStorage.getItem("auth-token");
      await axios({
        method: 'DELETE',
        url: (process.env.REACT_APP_API_URL + "/log/delete"),
        data: {
          id: id
        },
        headers: {
          "x-auth-token": token,
          'Content-Type': 'application/json',
          'Cache-Control' : 'no-cache',
          time: ts
        }
      })
    } catch (err) {
      console.log(err.message);
    }

    setUpdate(update + 1);
  }

  let timeString = (startTime, endTime) => {
    let hours = Math.floor( (new Date(endTime) - new Date(startTime)) / (1000*60*60) )
    let minutes = Math.floor(((new Date(endTime) - new Date(startTime)) / (1000 * 60) ) % 60);
    return (hours + "h " +  minutes + "m");
  }

  return (
    <section className="log-chart-component">
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
                  <th>{new Date(log.startTime).getUTCMonth() + 1}/{new Date(log.startTime).getUTCDate()}/{new Date(log.startTime).getUTCFullYear()}</th>
                  <th>{
                    timeString(log.startTime, log.endTime)
                  }</th>
                  <th><Trash onClick={() => removeLog(log._id)}/></th>
                  {/* <th><Button variant="light" size="sm" onClick={() => removeLog(log._id)}> <Trash /></Button></th> */}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (view === 'all') ? (
          <p>No logs found in the {category} activity category</p>
        ) : (
          <p>No logs found in the {category} activity category for {monthFromDate(month)} {year}</p>
        ) }
    </section>
  )
}
