import React, { Component } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid3 from "./medicationgrid2.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MedicationGrid3 />
        <AnaesthesiaChart />
      </div>
    );
  }
}

export default App;
