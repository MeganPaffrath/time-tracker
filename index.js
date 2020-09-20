import React from "react";
import ReactDOM from "react-dom";

// Import Components
import Charts from "./Charts";

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