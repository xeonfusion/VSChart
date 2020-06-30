import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid from "./medicationgrid.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MedicationGrid />
        <AnaesthesiaChart />
      </div>
    );
  }
}

export default App;
