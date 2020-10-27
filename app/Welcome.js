//jshint esversion: 6
import React from "react";
import ReactDOM from "react-dom";

  class Welcome extends React.Component {

    render() {
      testFunc();
      return (
        <div>
          <h1>Start Tracking</h1>
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

export default Welcome;