import React from "react";
import ReactDOM from "react-dom";

// Import Components
import Charts from "./Charts";

// Require a node module, allows access to date() funciton
// const database = require(__dirname + "/database.js");

function Title(props) {
    return (
      <div className="title">
        <h1>Time Tracker</h1>
      </div>
    );
  }
  

class App extends React.Component {
  constructor(props) {
      super(props); // Must call
      
      this.state = {
          item: 'value',
          view: "month"
      };
  }

  render() {
      const title = <Title />;
      
      return (
        <main>
            {title}
            <Charts
              view={"month"}
              currMonth={new Date().getMonth()}
              currYear={new Date().getFullYear()}/>
        </main>
      );
  }
}

ReactDOM.render(<App/>,
document.getElementById("root")
);