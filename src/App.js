import React, { Component } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid2 from "./medicationgrid2.jsx";
//import MedDlg from "./meddialog.jsx";

class App extends Component {
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
