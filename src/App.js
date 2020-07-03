import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid2 from "./medicationgrid.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MedicationGrid2 />
        <AnaesthesiaChart />
      </div>
    );
  }
}

export default App;
