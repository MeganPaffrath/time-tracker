import React, { useState, useEffect } from 'react';
import LogList from './LogList';
import Histogram from '../graphs/Histogram';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


export default function MonthLogs({logs, update, setUpdate, activityView, setActivityView}) {
  // activityView={activityView} setActivityView={setActivityView}
  const [month, setMonth] = useState(new Date().getUTCMonth());
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [monthLogs, setMonthLogs] = useState(null);
  const [viewType, setViewType] = useState("all"); /// THIS
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setMonthLogs(logs.filter(log => (
      new Date(log.date).getUTCMonth() === month
      && new Date(log.date).getUTCFullYear() === year
    )));
    console.log(logs);
    let activityList = [];
    logs.map(log => {
      if (!activityList.includes(log.activity)) {
        activityList.push(log.activity);
      }
    })
    setActivities(activityList);
  }, [month]);

  useEffect(() => {
    console.log(activities);
  }, [activities])
  
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
      <center>
        <h3>{monthNames[month]} {year} </h3>
        <Button variant="dark" onClick={prevMonth}>Previous</Button>
        <Button variant="dark" onClick={nextMonth}>Next</Button>
      </center>
      <center>
        <Button variant="light" onClick={() => setActivityView("all")}>all</Button>
        {/* get log types and have a button for each */}
        {activities.map( (act) => <Button variant="light" key={act} onClick={() => setActivityView(act)}>{act}</Button>)}
      </center>
      {activityView !== 'all' ? (
        <div className="log-charts">
          <Histogram month={month} year={year} monthLogs={monthLogs} category={viewType}/>
        </div>
      ) : ''}
      <LogList logs={monthLogs} update={update} setUpdate={setUpdate} category={viewType}/>
      
    </div>
  )
}
