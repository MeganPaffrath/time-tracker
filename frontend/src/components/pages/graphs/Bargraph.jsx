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
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalRectSeries } from 'react-vis';


export default function Bargraph({ selectedLogs, year, month, view, activityView }) {
  const [monthDays, setMonthDays] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [maxHours, setMaxHours] = useState(0);
  const [change, setChange] = useState(0);

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

        if (data.length > 0
          && data.some(item => date === item.x)) { // update old item & time
            const index = data.findIndex(item => item.x === date);
            time = data[index].y + time;
            data[index].y = time;
        } else { // push new item
          data.push({
            x0: (date - 1),
            x: date,
            y: time
           });
        }

        // Set max hours
        if (Math.floor(time) + 1 > maxHours) {
          setMaxHours(Math.floor(time) + 1);
        }
    })


      setMonthData(data);
    }}, [month, year, activityView, selectedLogs]);

    useEffect(() => {
      setChange(change + 1);
    }, [monthData]);

  return (
    <center className="bargraph-component">
      { (monthData.length !== 0 && activityView !== 'all' && view !== 'all') ? (
        <div>
          <center>
            <h5>Hours of {activityView} per day</h5>
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
    </center>
    
  );
}
