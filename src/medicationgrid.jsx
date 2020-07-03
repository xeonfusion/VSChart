import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { Component } from "react";
import React from "react";
import "primereact/resources/themes/nova-light/theme.css";

class MedicationGrid2 extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    var data = [
      { drug: "Propofol", dose: 150, unit: "mg", time: 1500 },
      { drug: "Fentanyl", dose: 75, unit: "mcg", time: 1500 },
      { drug: "Rocuronium", dose: 50, unit: "mg", time: 1505 },
      { drug: "Lidocaine", dose: 100, unit: "mg", time: 1500 },
      { drug: "Ringers", dose: 60, unit: "ml/hr", time: 1500, timespan: 60 },
    ];
    this.setState({ drugs: data });
  }

  render() {
    return (
      <div>
        <DataTable value={this.state.drugs}>
          <Column field="drug" header="Medication" />
          <Column field="unit" header="Unit" />
          <Column field="dose" header="Dose" />
          <Column field="time" header="Time" />
        </DataTable>
      </div>
    );
  }
}

export default MedicationGrid2;
