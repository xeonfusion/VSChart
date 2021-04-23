//import Button from "@material-ui/core/Button";

import React from "react";
import { useEffect, useRef, useState, forwardRef } from "react";
import Chartjs from "chart.js";
import VitalSourceModal from "./vitalsourcedialog.jsx";
import RespGrid from "./respiratorygrid.jsx";
import moment from "moment";

const divStyle = {
  //position: "relative",
  //width: 800,
  height: 300,
};

let newChartInstance;

const getDatasetsbyPhysioID1 = (jdata, physioid) => {
  //For reading from json-server test db.json
  var datapoints = [];
  //console.log(jdata);
  if (jdata !== null && jdata !== undefined) {
    jdata.forEach((e) =>
      e.constructor === Array
        ? e
            .filter((e) => e.PhysioID === physioid)
            .map((e) =>
              datapoints.push({ x: new Date([e.Timestamp]), y: e.Value })
            )
        : null
    );
  }
  return datapoints;
};

const getDatasetsbyPhysioID2 = (jdata, physioid) => {
  //For reading from json-server local db.json file format
  var datapoints = [];
  //console.log(jdata);
  if (jdata !== null && jdata !== undefined) {
    jdata.posts.forEach((e) =>
      e.constructor === Array
        ? e
            .filter((e) => e.PhysioID === physioid)
            .map((e) =>
              datapoints.push({ x: new Date([e.Timestamp]), y: e.Value })
            )
        : null
    );
  }
  return datapoints;
};

const getDatasetsbyPhysioID3 = (jdata, physioid) => {
  //For reading from VSCapture csv file format
  var datapoints = [];
  //console.log(jdata);
  if (jdata !== null) {
    jdata.map((e) =>
      datapoints.push({ x: new Date([e.Time]), y: e[physioid] })
    );
  }
  //console.log(datapoints);
  return datapoints;
};

const getDatasetsbyPhysioID4 = (jdata, physioid) => {
  //For reading from VSCapture json file format
  var datapoints = [];
  //console.log(jdata);
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

const NewChart = forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    handleLoadChartCall() {
      handleLoadChart();
    },
    handleVitalsSourceCall: () => {
      handleVitalsSource();
    },
  }));

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartJdata, setChartJdata] = useState(null);

  const [showVitalSource, setVitalSourceShow] = React.useState(false);
  const [selectedVitalSource, setSelVitalSource] = React.useState(
    "http://localhost:5000/posts"
  );
  const [selectedVitalSourceType, setSelVitalSourceType] = React.useState(
    "URL"
  );
  const [selectedVitalFileSource, setSelVitalFileSource] = React.useState(null);
  const [
    dropVitalFileSourceValue,
    setDropVitalFileSourceValue,
  ] = React.useState(false);
  const [selRespDatasetItems, setSelRespDatasetItems] = React.useState([]);
  const [selRespDefaultStartTime, setSelRespDefaultStartTime] = React.useState(
    moment().add(0, "m")
  );
  const [selRespDefaultEndTime, setSelRespDefaultEndTime] = React.useState(
    moment().add(12, "m")
  );

  useEffect(() => {
    if (chartInstance && chartContainer && chartContainer.current) {
      updateDataset();
    }
  }, [chartJdata]);

  useEffect(() => {
    if (chartInstance && chartContainer && chartContainer.current) {
      handleLoadChart();
    }
  }, [selectedVitalSource, selectedVitalSourceType, selectedVitalFileSource]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = () => {
    if (chartJdata !== null && chartJdata !== undefined) {
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

      var respdatasets = [
        getDatasetsbyPhysioID(chartJdata, "O2_FI"),
        getDatasetsbyPhysioID(chartJdata, "TV_Exp"),
        getDatasetsbyPhysioID(chartJdata, "RR"),
        getDatasetsbyPhysioID(chartJdata, "PEEP"),
        getDatasetsbyPhysioID(chartJdata, "ET_CO2"),
      ];

      getRespDatasetsItems(respdatasets);

      chartInstance.update();
    }
  };

  const handleVitalsSource = () => {
    setVitalSourceShow(true);
  };

  const CSVToJSON = (csv) => {
    if (csv !== null) {
      var lines = csv.split(/\r\n|\n/);
      //console.log(lines);
      const headers = lines.shift().split(/\t|,/);

      var jsonarray = lines.map((line) => {
        const values = line.split(/\t|,/);
        return headers.reduce(
          (obj, header, index) => ((obj[header] = values[index]), obj),
          {}
        );
      });
      //console.log(jsonarray);
      return jsonarray;
    }
  };

  const handleLoadChart = () => {
    var jsondata = null;

    //fetch("./AS3DataExport.json")
    //fetch("./db2.json")
    //fetch("http://localhost:5000/posts")

    //console.log(selectedVitalSourceType);
    //console.log(selectedVitalSource);
    //console.log(selectedVitalFileSource);

    if (selectedVitalSourceType === "URL" && selectedVitalSource !== null) {
      fetch(selectedVitalSource, { mode: "no-cors" })
        .then((response) => response.json())
        .then((data) => {
          jsondata = JSON.parse(JSON.stringify(data));
          setChartJdata(jsondata);
          updateDataset();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      selectedVitalSourceType === "File" ||
      "VSJSONFile" ||
      "VSCSVFile"
    ) {
      if (
        dropVitalFileSourceValue === false &&
        selectedVitalFileSource !== null
      ) {
        //var path = URL.createObjectURL(selectedVitalFileSource);
        var path = selectedVitalFileSource.name;

        fetch(path, { mode: "no-cors" })
          .then((response) => response.text())
          .then((data) => {
            var strdata = CSVToJSON(data);
            if (selectedVitalSourceType !== "VSCSVFile") {
              jsondata = JSON.parse(data);
            } else {
              jsondata = JSON.parse(JSON.stringify(strdata));
            }
            setChartJdata(jsondata);
            updateDataset();
          })
          .catch((error) => {
            console.log(error);
          });

        //URL.revokeObjectURL(path);
      } else if (
        dropVitalFileSourceValue === true &&
        selectedVitalFileSource !== null
      ) {
        var fileentry = selectedVitalFileSource;

        function ReadFile(entry, successCallback, errorCallback) {
          entry.file(function (file) {
            let reader = new FileReader();

            reader.onload = function () {
              successCallback(reader.result);
            };

            reader.onerror = function () {
              errorCallback(reader.error);
            };

            reader.readAsText(file);
          }, errorCallback);
        }

        function ReadData(result) {
          var readresult = CSVToJSON(result);
          //console.log(readresult);
          if (readresult !== null && readresult !== undefined) {
            jsondata = JSON.parse(JSON.stringify(readresult));
          }
          setChartJdata(jsondata);
          updateDataset();
        }

        function ErrorData(e) {
          console.log(e);
        }

        ReadFile(fileentry, ReadData, ErrorData);
      }

      /*var reader = new FileReader();
      if (selectedVitalFileSource !== undefined) {
        reader.readAsText(selectedVitalFileSource);
      }
      reader.onload = () => {
        try {
          if (selectedVitalSourceType !== "VSCSVFile") {
            jsondata = JSON.parse(reader.result);
          } else {
            var readresult = CSVToJSON(reader.result);
            if (readresult !== null && readresult !== undefined)
            {
              jsondata = JSON.parse(JSON.stringify(readresult));
            }
            
          }
        } catch (e) {
          console.log("Error reading file", e);
        }
        //console.log(reader.result);
        setChartJdata(jsondata);
        updateDataset();
      };*/
    }
  };

  const handleVitalSourceChildState = (
    childvitalsourcestate,
    selectedVitalSource,
    selectedVitalFileSource,
    selectedVitalSourceType,
    dropVitalSourceFileValue
  ) => {
    setVitalSourceShow(childvitalsourcestate);
    setSelVitalSource(selectedVitalSource);
    setSelVitalFileSource(selectedVitalFileSource);
    setSelVitalSourceType(selectedVitalSourceType);
    setDropVitalFileSourceValue(dropVitalSourceFileValue);
  };

  const getDatasetsbyPhysioID = (jdata, physioid) => {
    if (jdata !== null && jdata !== undefined) {
      var datapoints = [];
      switch (selectedVitalSourceType) {
        case "URL":
          datapoints = getDatasetsbyPhysioID1(jdata, physioid);
          break;
        case "File":
          datapoints = getDatasetsbyPhysioID2(jdata, physioid);
          break;
        case "VSCSVFile":
          datapoints = getDatasetsbyPhysioID3(jdata, physioid);
          break;
        case "VSJSONFile":
          datapoints = getDatasetsbyPhysioID4(jdata, physioid);
          break;
        default:
          break;
      }
      return datapoints;
    }
  };

  const getRespDatasetsItems = (respdatasets) => {
    var allItems = [];

    //convert to flat object data array
    respdatasets.map((item, index) => {
      return item.map((item2, index2) => {
        var selitemindex = allItems.length + 1;

        const item = [
          {
            id: selitemindex,
            group: index + 1,
            title: item2.y,
            start_time: moment(item2.x).startOf("m"),
            end_time: moment(item2.x),
          },
        ];
        allItems.push(item[0]);
        return item[0];
      });
    });

    //console.log(allItems);

    //filter and remove duplicates or multiple values in a minute
    var selrespdatasets = allItems
      .filter(
        (value, index, array) =>
          array.findIndex(
            (t) =>
              t.start_time.valueOf() === value.start_time.valueOf() &&
              t.group === value.group
          ) === index
      )
      .map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

    //console.log(selrespdatasets);

    var visiblestarttime = selrespdatasets[0].start_time.clone().startOf("m");
    var visibleendtime = selrespdatasets[0].start_time
      .clone()
      .startOf("m")
      .add(12, "m");

    setSelRespDefaultStartTime(visiblestarttime);
    setSelRespDefaultEndTime(visibleendtime);
    //console.log(visiblestarttime);
    //console.log(visibleendtime);

    setSelRespDatasetItems(selrespdatasets);
  };

  return (
    <>
      <div>
        <canvas
          style={divStyle}
          ref={chartContainer}
          //height={window.innerHeight}
          //width={window.innerWidth}
        ></canvas>
      </div>
      <VitalSourceModal
        showVitalSourceDialog={showVitalSource}
        childVitalSourceState={handleVitalSourceChildState}
        selectedVitalURLSource={selectedVitalSource}
        selectedVitalFileSource={selectedVitalFileSource}
        selectedVitalSourceType={selectedVitalSourceType}
        dropVitalSourceFileValue={dropVitalFileSourceValue}
      />
      <RespGrid
        respDatasetItems={selRespDatasetItems}
        respDefaultStartTime={selRespDefaultStartTime}
        respDefaultEndTime={selRespDefaultEndTime}
      />
    </>
  );
});

export default NewChart;
