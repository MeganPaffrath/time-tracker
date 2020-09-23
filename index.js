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
        item: 'value'
    };
}

render() {
    const title = <Title />;

    return (
      <main>
          {title}
          <Charts/>
      </main>
    );
}
}

ReactDOM.render(<App/>,
document.getElementById("root")
);