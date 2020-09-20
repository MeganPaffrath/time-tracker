//jshint esversion: 6
import React from "react";
import ReactDOM from "react-dom";

// For chart from recharts.org (sample chart to later compare DB data output with)
import { BarChart, Tooltip, Legend, Label, LabelList, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [
    {
      "date": "1",
      "minutes": 63
    },
    {
      "date": "2",
      "minutes": 73
    },
    {
      "date": "3",
      "minutes": 64
    },
    {
      "date": "4",
      "minutes": 63
    },
    {
      "date": "5",
      "minutes": 67
    },
    {
      "date": "6",
      "minutes": 62
    },
    {
      "date": "7",
      "minutes": 60
    },
    {
      "date": "8",
      "minutes": 61
    },
    {
      "date": "9",
      "minutes": 66
    },
    {
      "date": "10",
      "minutes": 60
    },
    {
      "date": "11",
      "minutes": 62
    },
    {
      "date": "12",
      "minutes": 66
    },
    {
      "date": "13",
      "minutes": 60
    },
    {
      "date": "14",
      "minutes": 50
    },
    {
      "date": "15",
      "minutes": 65
    }
  ]

  const timeChart = (
    <BarChart width={730} height={500} data={data}>
        <XAxis dataKey="date">
            <Label value="Date" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Minutes Spent Practicing', angle: -90, position: 'Left' }} />
        <Tooltip />
        <Bar dataKey="minutes" fill="#8884d8"/>
    </BarChart>
  );
                           
  

class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        item: "value"
      };
    }
    render() {
      return <div>
          <h1>September 1-15th Guitar Log:</h1>
          {timeChart}
        </div>
    }
}

export default MyComponent;