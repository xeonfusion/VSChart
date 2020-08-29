import React, { Component } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid2 from "./medicationgrid2.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App" id="App">
        <MedicationGrid2 />
        <AnaesthesiaChart />
      </div>
    );
  }
}

export default App;
