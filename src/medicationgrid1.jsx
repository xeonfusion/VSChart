import React from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";

const divStyle = {
  //position: "relative",
  //width: 800,
  //height: 100,
};

const columns = [
  { key: "title", name: "Medication" },
  { key: "dose1", name: "1500" },
  { key: "dose2", name: "1505" },
  { key: "dose3", name: "1510" },
  { key: "dose4", name: "1515" },
];

const rows = [
  { id: 0, title: "Propofol" },
  { id: 1, title: "Fentanyl" },
  { id: 2, title: "Rocuronium" },
  { id: 3, title: "Lidocaine" },
];

class MedicationGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsdata: [],
    };
  }
  render() {
    return (
      <div style={divStyle}>
        <ReactDataGrid
          columns={columns}
          rows={rows}
          rowsCount={10}
          rowGetter={(i) => rows[i]}
          enableCellSelect={true}
        />
      </div>
    );
  }
}

export default MedicationGrid;
