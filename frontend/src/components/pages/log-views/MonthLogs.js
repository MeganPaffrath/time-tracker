import React, { useState, useEffect } from 'react';
import LogList from './LogList';
import Histogram from '../graphs/Histogram';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


export default function MonthLogs({logs, update, setUpdate}) {
  const [month, setMonth] = useState(new Date().getUTCMonth());
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [monthLogs, setMonthLogs] = useState(null);

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

  console.log(month);

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      incrementMonthAndYearBy(-11, 1);
    } else {
      setMonth(month + 1)
      incrementMonthAndYearBy(1, 0);
    }
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
  }



  return (
    <div className="month-logs-component">
      <h3>{monthNames[month]} {year} Logs</h3>
      <center>
        <Button variant="dark" onClick={prevMonth}>Previous</Button>
        <Button variant="dark" onClick={nextMonth}>Next</Button>
      </center>
      <LogList logs={monthLogs} update={update} setUpdate={setUpdate} />
      <div className="log-charts">
          <Histogram month={month} year={year} monthLogs={monthLogs}/>
        </div>
    </div>
  )
}
