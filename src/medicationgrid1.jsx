import React from "react";
import Chart from "react-google-charts";
import moment from "moment";

const divStyle = {
  //position: "relative",
  //width: 800,
  //height: 100,
};

const columns = [
  { type: "string", label: "medication" },
  { type: "string", label: "title" },
  { type: "date", label: "start_time" },
  { type: "date", label: "end_time" },
];

const rows = [
  [
    "Propofol",
    "150 mg",
    moment(moment().add(0.5, "m").format()).toDate(),
    moment(moment().add(1, "m").format()).toDate(),
  ],
  [
    "Fentanyl",
    "75 mcg",
    moment(moment().add(0, "m").format()).toDate(),
    moment(moment().add(0.5, "m").format()).toDate(),
  ],
  [
    "Lidocaine",
    "100 mg",
    moment(moment().add(0, "m").format()).toDate(),
    moment(moment().add(0.5, "m").format()).toDate(),
  ],
  [
    "Rocuronium",
    "50 mg",
    moment(moment().add(1, "m").format()).toDate(),
    moment(moment().add(1.5, "m").format()).toDate(),
  ],
  [
    "Ringers",
    "60 ml/hr",
    moment(moment().add(0, "m").format()).toDate(),
    moment(moment().add(10, "m").format()).toDate(),
  ],
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
        <Chart
          chartType="Timeline"
          data={[columns, ...rows]}
          width="100%"
          height="300px"
          rootProps={{ "data-testid": "2" }}
          options={{
            timeline: {
              //singleColor: "#4d84f1",
            },
            hAxis: {
              title: "Timestamp",
              format: "hh:mm a",
              minValue: moment(moment().format()).toDate(),
              maxValue: moment(moment().add(15, "m").format()).toDate(),
            },
          }}
        />
      </div>
    );
  }
}

export default MedicationGrid;
