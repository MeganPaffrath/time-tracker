import React, {useEffect, useState} from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalRectSeries } from 'react-vis';


export default function Bargraph({ logs, setLogs, view, setView, activityView, setActivityView, year, month }) {
  // month={month} setMonth={setMonth}
  //             year={year} setYear={setYear}
  // let [year, setYear] = useState();
  // let [month, setMonth] = useState(0);
  let [monthLogs, setMonthLogs] = useState(logs);

  const [monthDays, setMonthDays] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [maxHours, setMaxHours] = useState(0);
  const [change, setChange] = useState(0);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    // determine days in each month
    if (year%4 === 0) {
      setMonthDays([
        31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
      ]);
    } else {
      setMonthDays([
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
      ]);
    }
    
    // set data
    if (monthLogs !== null) {
      setMonthData(null);
      let data = [];
      monthLogs.map( (log) => {
        // console.log(log.activity + " =? " + activityView );
        if (log.activity === activityView) {
          let date = new Date(log.date).getUTCDate();
          let time = (log.minutes) / 60;
          if (Math.floor(time) > maxHours) {
            setMaxHours(Math.floor(time));
          }
          console.log(date + ": " + time);
          data.push({
            x0: (date - 1),
            x: date,
            y: time
          });
        }
        
      })
      setMonthData(data);
    } 
    }, [month, year, activityView]);

    useEffect(() => {
      setChange(change + 1);
      // console.log(monthData);

    }, [monthData]);

  return (
    <div>
      <p>BAR GRAPH HERE</p>
      <p>Month: {month}</p>
      <p>Year: {year}</p>
      { (monthData.length !== 0) ? (
        <div>
          <center>
          <h1>{monthNames[month]} {year}</h1>
          <p>Hours of {activityView} per day</p>
        </center>
          <XYPlot
          xDomain={[1, monthDays[month]]}
          yDomain={[0, maxHours]}
          xType="linear"
          width={300}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalRectSeries data={monthData} style={{stroke: '#fff'}} />
        </XYPlot>
        </div>
      ) : 'nothing for now - histogram'}
    </div>
    
  );
}
