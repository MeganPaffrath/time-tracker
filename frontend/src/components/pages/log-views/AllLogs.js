import React, { useState } from 'react';
import axios from 'axios';
import LogList from "./LogList";

export default function AllLogs( {logs, update, setUpdate} ) {
  // const [deleted, setDeleted] = useState(0);

  // console.log(logs);

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
      <h3>All Logs</h3>
      <LogList logs={logs} update={update} setUpdate={setUpdate} />
    </div>
  )
}
