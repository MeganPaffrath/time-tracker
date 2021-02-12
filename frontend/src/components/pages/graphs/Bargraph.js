import React, {useEffect, useState} from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalRectSeries } from 'react-vis';


export default function Bargraph({ selectedLogs, year, month, activityView }) {
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
    if (selectedLogs !== null) {
      setMonthData(null);
      let data = [];
      selectedLogs.map( (log) => {
        let date = new Date(log.date).getUTCDate();
        let time = (log.minutes) / 60;
        if (Math.floor(time) > maxHours) {
          setMaxHours(Math.floor(time));
        }
        data.push({
        x0: (date - 1),
        x: date,
        y: time
      });
    })


      setMonthData(data);
    }}, [month, year, activityView, selectedLogs]);

    useEffect(() => {
      setChange(change + 1);
      // console.log(monthData);

    }, [monthData]);

  return (
    <div>
      <p>BAR GRAPH HERE</p>
      <p>Month: {month}</p>
      <p>Year: {year}</p>
      <p>View: {activityView}</p>
      { (selectedLogs && selectedLogs.length >= 0) ? (
        <p>Selected: {selectedLogs.length}</p>
      ) : (
        <p>No selected logs</p>
      )}
      { (monthData && monthData.length >= 0) ? (
        <p>Month Data: {monthData.length}</p>
      ) : (
        <p>No selected logs</p>
      )}
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
