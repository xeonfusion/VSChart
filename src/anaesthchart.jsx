import Button from "@material-ui/core/Button";
import MedModal from "./meddialog.jsx";

import React from "react";
import { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

const divStyle = {
  //position: "relative",
  //width: 800,
  height: 300,
};

let newChartInstance;

export class AnaesthesiaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <newChart />;
  }
}

const getDatasetsbyPhysioID = (jdata, physioid) => {
  var datapoints = [];
  if (jdata !== null) {
    jdata
      .filter((e) => e.PhysioID === physioid)
      .map((e) => datapoints.push({ x: new Date([e.Timestamp]), y: e.Value }));
  }
  return datapoints;
};

const chartConfig = {
  type: "line",
  data: {
    datasets: [
      {
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
        label: "Mean NIBP",
        borderColor: "#8e5ea2",
        fill: false,
        radius: 5,
        pointBorderWidth: 2,
        pointStyle: "crossRot",
        hoverRadius: 9,
      },
      {
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
        label: "Respiratory Rate",
        borderColor: "#e8ad0c",
        fill: false,
        radius: 3,
        pointBorderWidth: 2,
        pointStyle: "circle",
        hoverRadius: 5,
      },
      {
        label: "Temperature",
        borderColor: "#ae4ae8",
        fill: false,
        radius: 5,
        pointBorderWidth: 2,
        pointStyle: "rectRot",
        hoverRadius: 9,
      },
      {
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
        if (newChartInstance != null) {
          var index = legendItem.datasetIndex;
          var dataset = newChartInstance.data.datasets[index];
          dataset.showLine = true;
          newChartInstance.update();
        }
      },
      onLeave: (e, legendItem) => {
        if (newChartInstance != null) {
          var index = legendItem.datasetIndex;
          var dataset = newChartInstance.data.datasets[index];
          dataset.showLine = false;
          newChartInstance.update();
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
};

const NewChart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartJdata, setChartJdata] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = () => {
    var datasets = [
      getDatasetsbyPhysioID(chartJdata, "NIBP_Systolic"),
      getDatasetsbyPhysioID(chartJdata, "NIBP_Diastolic"),
      getDatasetsbyPhysioID(chartJdata, "NIBP_Mean"),
      getDatasetsbyPhysioID(chartJdata, "ECG_HR"),
      getDatasetsbyPhysioID(chartJdata, "SpO2"),
      getDatasetsbyPhysioID(chartJdata, "RR"),
      getDatasetsbyPhysioID(chartJdata, "T1_Temp"),
      getDatasetsbyPhysioID(chartJdata, "P1_Systolic"),
      getDatasetsbyPhysioID(chartJdata, "P1_Disatolic"),
      getDatasetsbyPhysioID(chartJdata, "P1_Mean"),
    ];

    datasets.map((e, index) => {
      return (chartInstance.data.datasets[index].data = e);
    });

    chartInstance.update();
  };

  const onButtonClick = () => {
    var jsondata = null;

    fetch("./AS3DataExport.json")
      .then((response) => response.json())
      .then((data) => {
        jsondata = JSON.parse(JSON.stringify(data));
        setChartJdata(jsondata);
        updateDataset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);

  const handleChildState = (childstate, selectedMeds) => {
    setShow(childstate);
    setGroup(selectedMeds);
  };

  const medGroups = [
    { id: 1, title: "Propofol", type: "hypnotic", color: "yellow" },
    { id: 2, title: "Fentanyl", type: "opioid", color: "deepskyblue" },
    { id: 3, title: "Lidocaine", type: "localanaesthetic", color: "grey" },
    { id: 4, title: "Rocuronium", type: "nmbd", color: "red" },
    { id: 5, title: "Ringers", type: "ivfluid", color: "white" },
    { id: 6, title: "Midazolam", type: "hypnotic", color: "orange" },
  ];

  const [allgroups, setGroup] = React.useState(medGroups);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Load Chart
      </Button>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Add Medication
      </Button>
      <MedModal
        showMedDialog={show}
        childState={handleChildState}
        selectedMeds={allgroups}
      />
      <canvas
        style={divStyle}
        ref={chartContainer}
        height={window.innerHeight}
        width={window.innerWidth}
      ></canvas>
    </div>
  );
};

export default NewChart;
