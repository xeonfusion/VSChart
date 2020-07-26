import Button from "react-bootstrap/Button";
import MedicationDlg from "./medicationdialog.jsx";

import React from "react";
var Chart = require("chart.js");
let myChart;

const divStyle = {
  //position: "relative",
  //width: 800,
  height: 300,
};

class AnaesthesiaChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      jdata: [],
      chart: null,
    };

    this.loadChartData = this.loadChartData.bind(this);
    this.createChart = this.createChart.bind(this);
    this.getDatasetsbyPhysioID = this.getDatasetsbyPhysioID.bind(this);
  }

  loadChartData = () => {
    var jsondata = null;

    fetch("./AS3DataExport.json")
      .then((response) => response.json())
      .then((data) => {
        jsondata = JSON.parse(JSON.stringify(data));
        this.setState({ jdata: jsondata });
        //this.setState({ chart: this.myChart });
      })
      .catch((error) => {
        console.log(error);
      });

    /*const xhr = new XMLHttpRequest();
    xhr.open("GET", "./AS3DataExport.json");
    xhr.send();
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        jsondata = JSON.parse(xhr.response);
        console.log(jsondata);
        //this.setState({ jdata: jsondata });
      }
    };
    this.setState({ jdata: jsondata });*/
  };

  getDatasetsbyPhysioID = (jdata, physioid) => {
    var datapoints = [];
    if (jdata !== null) {
      jdata
        .filter((e) => e.PhysioID === physioid)
        .map((e) =>
          datapoints.push({ x: new Date([e.Timestamp]), y: e.Value })
        );
    }
    return datapoints;
  };

  createChart = () => {
    var jdata = this.state.jdata;
    myChart = this.state.chart;

    if (myChart !== null) myChart.destroy();

    Chart.defaults.line.showLines = false;
    myChart = new Chart(this.chartRef.current.getContext("2d"), {
      type: "line",
      data: {
        datasets: [
          {
            data: this.getDatasetsbyPhysioID(jdata, "NIBP_Systolic"),
            label: "Systolic NIBP",
            borderColor: "#ff9933",
            //borderColor: "#8f8786",
            //fill: false,
            fill: "+1",
            //backgroundColor: 'rgba(244,242,245,0)',
            backgroundColor: "rgba(255, 153, 51,0)",
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "triangle",
            pointRotation: 180,
            pointBackgroundColor: "#ff9933",
            hoverRadius: 9,
            showLine: true,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "NIBP_Diastolic"),
            label: "Diastolic NIBP",
            borderColor: "#ff9933",
            //borderColor: "#8f8786",
            //fill: false,
            fill: "-1",
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "triangle",
            pointBackgroundColor: "#ff9933",
            hoverRadius: 9,
            showLine: true,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "NIBP_Mean"),
            label: "Mean NIBP",
            borderColor: "#8e5ea2",
            fill: false,
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "crossRot",
            hoverRadius: 9,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "ECG_HR"),
            label: "HR",
            borderColor: "#c45850",
            fill: false,
            radius: 3,
            pointBorderWidth: 2,
            pointStyle: "circle",
            pointBackgroundColor: "#c45850",
            hoverRadius: 5,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "SpO2"),
            label: "SPO2",
            borderColor: "#3cba9f",
            fill: false,
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "star",
            hoverRadius: 9,
            borderDash: [5, 5],
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "RR"),
            label: "Respiratory Rate",
            borderColor: "#e8ad0c",
            fill: false,
            radius: 3,
            pointBorderWidth: 2,
            pointStyle: "circle",
            hoverRadius: 5,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "T1_Temp"),
            label: "Temperature",
            borderColor: "#ae4ae8",
            fill: false,
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "rectRot",
            hoverRadius: 9,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "P1_Systolic"),
            label: "IBP Systolic",
            borderColor: "#3e95cd",
            //fill: false,
            fill: "+1",
            backgroundColor: "rgba(62,149,205,0.2)",
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "triangle",
            pointRotation: 180,
            hoverRadius: 9,
            showLine: true,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "P1_Disatolic"),
            label: "IBP Diastolic",
            borderColor: "#3e95cd",
            //fill: false,
            fill: "-1",
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "triangle",
            hoverRadius: 9,
            showLine: true,
          },
          {
            data: this.getDatasetsbyPhysioID(jdata, "P1_Mean"),
            label: "IBP Mean",
            borderColor: "#8e5ea2",
            fill: false,
            radius: 5,
            pointBorderWidth: 2,
            pointStyle: "cross",
            hoverRadius: 9,
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0,
          },
        },
        plugins: {
          filler: {
            propagate: false,
          },
        },
        legend: {
          display: true,
          position: "left",
          align: "center",
          labels: {
            usePointStyle: true,
          },
          onHover: (e, legendItem) => {
            if (myChart != null) {
              var index = legendItem.datasetIndex;
              var dataset = myChart.data.datasets[index];
              dataset.showLine = true;
              myChart.update();
            }
          },
          onLeave: (e, legendItem) => {
            if (myChart != null) {
              var index = legendItem.datasetIndex;
              var dataset = myChart.data.datasets[index];
              dataset.showLine = false;
              myChart.update();
            }
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        tooltips: {
          mode: "x",
          intersect: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 200,
              },
              scaleLabel: {
                display: true,
                labelString: "Value",
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              //distribution: 'linear',
              distribution: "series",
              time: {
                unit: "minute",
                displayFormats: { minute: "HH:mm" },
                parser: "YYYYMMDDTHH:mm",
                tooltipFormat: "ll HH:mm",
                //round:'minute'
              },
              ticks: {
                source: "auto",
                //stepSize: 1
              },
              scaleLabel: {
                display: true,
                labelString: "Timestamp",
              },
            },
          ],
        },
      },
    });
    return myChart;
  };

  componentDidUpdate() {
    //console.log(this.state);
    var myChart = this.state.chart;
    if (myChart != null && this.state.jdata != null) {
      this.createChart();
    }
  }

  componentDidMount() {
    var myChart = this.createChart();
    this.setState({ chart: myChart });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.loadChartData}>
          Load Chart
        </Button>
        <MedicationDlg isMedDisplayed={true} />
        <canvas
          style={divStyle}
          ref={this.chartRef}
          height={window.innerHeight}
          width={window.innerWidth}
        ></canvas>
      </div>
    );
  }
}

export default AnaesthesiaChart;
