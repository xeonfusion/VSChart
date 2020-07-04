import React from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";

const divStyle = {
  //position: "relative",
  //width: 800,
  //height: 100,
};

const columns = [
  { key: "time", name: "Time" },
  { key: "drug", name: "Medication" },
  { key: "unit", name: "Units" },
  { key: "dose", name: "Dose" },
  { key: "timespan", name: "Timespan" },
];

class MedicationGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsdata: [],
    };
  }

  componentDidMount() {
    var data = [
      { drug: "Propofol", dose: 150, unit: "mg", time: 1500 },
      { drug: "Fentanyl", dose: 75, unit: "mcg", time: 1500 },
      { drug: "Rocuronium", dose: 50, unit: "mg", time: 1505 },
      { drug: "Lidocaine", dose: 100, unit: "mg", time: 1500 },
      { drug: "Ringers", dose: 60, unit: "ml/hr", time: 1500, timespan: 60 },
    ];
    this.setState({ rowsdata: data });
  }

  render() {
    return (
      <div style={divStyle}>
        <ReactDataGrid
          columns={columns}
          rows={this.state.rowsdata}
          rowsCount={10}
          enableCellSelect={true}
          subHeader={true}
        />
      </div>
    );
  }
}

export default MedicationGrid;
