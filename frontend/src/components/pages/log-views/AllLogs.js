import React from 'react'

function removeLog(id) {
  console.log(id);
}

export default function AllLogs(logs) {
  return (
    <div>
      <h1>All logs</h1>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Minutes</th>
            </tr>
          </thead>
            <tbody>
              {logs.logs.map(log => (
                <tr key={log._id}>
                  <th>{log.activity}</th>
                  <th>{new Date(log.date).getUTCMonth() + 1}/{new Date(log.date).getUTCDate()}/{new Date(log.date).getUTCFullYear()}</th>
                  <th>{log.minutes}</th>
                  <th><button onClick={() => removeLog(log._id)}>delete</button></th>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}
