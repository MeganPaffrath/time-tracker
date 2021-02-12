// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {useEffect, useState} from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalRectSeries, LineSeries} from 'react-vis';

// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   VerticalRectSeries
// } from 'index';

export default function Histogram({month, year, monthLogs, category}) {
  const [monthDays, setMonthDays] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [maxHours, setMaxHours] = useState(0);
  const [change, setChange] = useState(0);

  console.log("Category: " + category);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  console.log(monthData);
  console.log(monthDays);
  console.log(maxHours + " hours");

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
        console.log(log.activity + " =? " + category );
        if (log.activity === category) {
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
    }, [month, year, category]);

    useEffect(() => {
      setChange(change + 1);
      console.log(monthData);

    }, [monthData]);

  return (
    <div>
      { (monthData.length !== 0) ? (
        <div>
          <center>
          <h1>{monthNames[month]} {year}</h1>
          <p>Hours of {category} per day</p>
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
      ) : ''}
    </div>
    
  );
}
