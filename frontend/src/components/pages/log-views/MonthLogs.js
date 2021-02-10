import React, { useState, useEffect } from 'react';
import LogList from './LogList';


export default function MonthLogs({logs, update, setUpdate}) {
  const [month, setMonth] = useState(new Date().getUTCMonth());
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [monthLogs, setMonthLogs] = useState();

  useEffect(() => {
    setMonthLogs(logs.filter(log => (
      new Date(log.date).getUTCMonth() === month
      && new Date(log.date).getUTCFullYear() === year
    )));
  }, []);
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function incrementMonthAndYearBy(monthBy, yearBy) {
    setMonthLogs(logs.filter(log => (
      new Date(log.date).getUTCMonth() === (month + monthBy)
      && new Date(log.date).getUTCFullYear() === (year + yearBy)
    )));
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      incrementMonthAndYearBy(-11, 1);
    } else {
      setMonth(month + 1)
      incrementMonthAndYearBy(1, 0);
    }

    console.log(month + " " + year);
  }

  function prevMonth() {
    if (month === 0 ) {
      setMonth(11);
      setYear(year - 1);
      incrementMonthAndYearBy(11, -1);
    } else {
      setMonth(month - 1);
      incrementMonthAndYearBy(-1, 0);
    }

    console.log(month + " " + year);
  }



  return (
    <div>
      <h1>{monthNames[month]} {year} Logs</h1>
      <center>
        <button onClick={prevMonth}>last month</button>
        <button onClick={nextMonth}>next month</button>
      </center>
      <LogList logs={monthLogs} update={update} setUpdate={setUpdate} />
    </div>
  )
}
