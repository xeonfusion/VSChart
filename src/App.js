import React, { Component } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
//import AnaesthesiaChart from "./anaesthchart.jsx";
//import MedicationGrid from "./medicationgrid1.jsx";
//import MedicationGrid2 from "./medicationgrid2.jsx";
import AppMenu from "./appmenu.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App" id="App">
        <AppMenu />
      </div>
    );
  }
}

export default App;
