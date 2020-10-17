//jshint esversion: 6
import React from "react";
import ReactDOM from "react-dom";

// database connection
// import {testFunction} from '../db/database';
import {testFunc} from '../db/test.js'


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

  class TimeChart extends React.Component {

    monthNames(month) {
      let months = ["January", "February", "March", "April", "May", "June", "Julu", "August", "September", "October", "November", "December"];
      return months[month];
    }

    getData(month, year) {
  
      return "haha not yet"
    }

    render() {
      testFunc();
      return (
        <div>
          <h2>{this.props.type} {this.monthNames(this.props.month)} {this.props.year}</h2>
          <BarChart width={730} height={500} data={data}>
            <XAxis dataKey="date">
                <Label value="Date" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: 'Minutes Spent Practicing', angle: -90}} />
            <Tooltip />
            <Bar dataKey="minutes" fill="#8884d8"/>
          </BarChart>
        </div>
        
      )
    }
  }
           

class TempComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        item: "value",
        view: props.view,
        month: props.currMonth,
        year: props.currYear
      };
    }

    render() {
      let graphContent;
      if (this.state.view == "month") {
        graphContent = 
          <TimeChart 
            type={"Guitar"}
            month={this.state.month}
            year={this.state.year}/>
      } else if (this.state.view == "year") {
        graphContent = "Year view not complete"
      } else {
        graphContent = "Well this was a mistake in Charts.js"
      }

      return <div>
        {graphContent}
        
        </div>
    }
}

export default TempComponent;