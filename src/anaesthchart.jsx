//import Button from "@material-ui/core/Button";

import React from "react";
import { useEffect, useRef, useState, forwardRef } from "react";
import Chartjs from "chart.js";
import VitalSourceModal from "./vitalsourcedialog.jsx";
import moment from "moment";
import DataTabs from "./datagridtabs.jsx";
import mqtt from "mqtt";

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

const getDatasetsbyPhysioID5 = (jdata, physioid) => {
  //For reading from mqtt-server url
  var datapoints = [];
  //console.log(jdata);

  if (jdata !== null && jdata !== undefined) {
    /*jdata
      .filter((e) => e.PhysioID === physioid)
      .map((e) =>
        datapoints.push({
          x: moment(e.Timestamp, "DD-MM-YYYY HH:mm:ss").toDate(),
          y: e.Value,
        })
      );*/
    jdata.forEach((e) =>
      e.constructor === Array
        ? e
            .filter((e) => e.PhysioID === physioid)
            .map((e) =>
              datapoints.push({
                x: moment(e.Timestamp, "DD-MM-YYYY HH:mm:ss").toDate(),
                y: e.Value,
              })
            )
        : null
    );
  }

  //console.log(datapoints);
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

  var chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartJdata, setChartJdata] = useState([]);
  const [mqttJData, setMqttJdata] = useState([]);
  const [selectedMqttTopic, setSelMqttTopic] = React.useState(
    "/VSCapture/ASDF/numericdata/#"
  );
  const [selectedMqttQoS, setSelMqttQoS] = React.useState("0");
  const [selectedMqttUser, setSelMqttUser] = React.useState("");
  const [selectedMqttPass, setSelMqttPass] = React.useState("");

  const [showVitalSource, setVitalSourceShow] = React.useState(false);
  const [selectedVitalMqttSource, setSelVitalMqttSourceURLValue] =
    React.useState("ws://localhost:8883/");
  const [selectedVitalSource, setSelVitalSource] = React.useState(
    "http://localhost:5000/posts"
  );
  const [selectedVitalSourceType, setSelVitalSourceType] =
    React.useState("VSCSVFile");
  const [selectedVitalFileSource, setSelVitalFileSource] = React.useState(null);
  const [dropVitalFileSourceValue, setDropVitalFileSourceValue] =
    React.useState(false);
  const [selRespDatasetItems, setSelRespDatasetItems] = React.useState([]);
  const [selRespDefaultStartTime, setSelRespDefaultStartTime] = React.useState(
    moment().add(0, "m")
  );
  const [selRespDefaultEndTime, setSelRespDefaultEndTime] = React.useState(
    moment().add(12, "m")
  );
  const [selHemoDatasetItems, setSelHemoDatasetItems] = React.useState([]);
  const [selHemoDefaultStartTime, setSelHemoDefaultStartTime] = React.useState(
    moment().add(0, "m")
  );
  const [selHemoDefaultEndTime, setSelHemoDefaultEndTime] = React.useState(
    moment().add(12, "m")
  );
  const [selMiscDatasetItems, setSelMiscDatasetItems] = React.useState([]);
  const [selMiscDefaultStartTime, setSelMiscDefaultStartTime] = React.useState(
    moment().add(0, "m")
  );
  const [selMiscDefaultEndTime, setSelMiscDefaultEndTime] = React.useState(
    moment().add(12, "m")
  );
  const [selectedMonitorType, setSelMonitorType] = React.useState("DatexS5");

  useEffect(() => {
    if (chartInstance && chartContainer && chartContainer.current) {
      updateDataset();
    }
  }, [chartJdata]);

  useEffect(() => {
    if (chartInstance && chartContainer && chartContainer.current) {
      handleLoadChart();
    }
  }, [
    selectedVitalSource,
    selectedVitalSourceType,
    selectedVitalFileSource,
    selectedMonitorType,
  ]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = () => {
    if (chartJdata !== null && chartJdata !== undefined) {
      //console.log(chartJdata);
      if (selectedMonitorType === "Intellivue") {
        var datasets = [
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_NONINV_SYS"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_NONINV_DIA"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_NONINV_MEAN"),
          getDatasetsbyPhysioID(chartJdata, "NOM_ECG_CARD_BEAT_RATE"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PULS_OXIM_SAT_O2"),
          getDatasetsbyPhysioID(chartJdata, "NOM_RESP_RATE"),
          getDatasetsbyPhysioID(chartJdata, "NOM_TEMP_GEN_1"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_SYS"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_DIA"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_MEAN"),
        ];

        datasets.map((e, index) => {
          return (chartInstance.data.datasets[index].data = e);
        });

        var respdatasets = [
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_O2_INSP"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_O2_ET"),
          getDatasetsbyPhysioID(chartJdata, "NOM_VOL_AWAY_INSP_TIDAL"),
          getDatasetsbyPhysioID(chartJdata, "NOM_VOL_AWAY_EXP_TIDAL"),
          getDatasetsbyPhysioID(chartJdata, "NOM_RESP_RATE"),
          getDatasetsbyPhysioID(chartJdata, "NOM_VENT_PRESS_AWAY_END_EXP_POS"),
          getDatasetsbyPhysioID(chartJdata, "NOM_AWAY_CO2_ET"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_AWAY_INSP_MAX"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_RESP_PLAT"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_N2O_INSP"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_N2O_ET"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_AGENT_INSP"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_AGENT_ET"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_AGENT"),
          getDatasetsbyPhysioID(chartJdata, "NOM_CONC_AWAY_SUM_MAC_ET"),
          getDatasetsbyPhysioID(chartJdata, "NOM_VOL_MINUTE_AWAY_EXP"),
          getDatasetsbyPhysioID(chartJdata, "NOM_COMPL_LUNG_DYN"),
        ];

        getRespDatasetsItems(respdatasets);

        var hemodatasets = [
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_NONINV_SYS"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_NONINV_DIA"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_NONINV_MEAN"),
          getDatasetsbyPhysioID(chartJdata, "NOM_ECG_CARD_BEAT_RATE"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PULS_OXIM_SAT_O2"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_SYS"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_DIA"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_MEAN"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_ABP_SYS"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_ABP_DIA"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_ART_ABP_MEAN"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PRESS_BLD_VEN_CENT_MEAN"),
          getDatasetsbyPhysioID(chartJdata, "NOM_ECG_AMPL_ST_II"),
          getDatasetsbyPhysioID(chartJdata, "NOM_ECG_AMPL_ST_V5"),
          getDatasetsbyPhysioID(chartJdata, "NOM_ECG_AMPL_ST_AVL"),
          getDatasetsbyPhysioID(chartJdata, "NOM_PULS_PRESS_VAR"),
          getDatasetsbyPhysioID(
            chartJdata,
            "NOM_PULS_OXIM_PLETH_AMPL_VAR_INDEX"
          ),
        ];

        getHemoDatasetsItems(hemodatasets);

        var miscdatasets = [
          getDatasetsbyPhysioID(chartJdata, "NOM_TEMP_GEN_1"),
          getDatasetsbyPhysioID(chartJdata, "NOM_TEMP_GEN_2"),
          getDatasetsbyPhysioID(chartJdata, "NOM_EEG_BISPECTRAL_INDEX"),
          getDatasetsbyPhysioID(chartJdata, "NOM_EEG_RATIO_SUPPRN"),
          getDatasetsbyPhysioID(chartJdata, "NOM_EMG_ELEC_POTL_MUSCL"),
          getDatasetsbyPhysioID(chartJdata, "NOM_EEG_BIS_SIG_QUAL_INDEX"),
          getDatasetsbyPhysioID(chartJdata, "EEG_Entropy"),
          getDatasetsbyPhysioID(chartJdata, "EMG_Entropy"),
          getDatasetsbyPhysioID(chartJdata, "SQI_Entropy"),
        ];

        getMiscDatasetsItems(miscdatasets);
      } else if (selectedMonitorType === "DatexS5") {
        var datasets2 = [
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

        datasets2.map((e, index) => {
          return (chartInstance.data.datasets[index].data = e);
        });

        var respdatasets2 = [
          getDatasetsbyPhysioID(chartJdata, "O2_FI"),
          getDatasetsbyPhysioID(chartJdata, "O2_ET"),
          getDatasetsbyPhysioID(chartJdata, "TV_Insp"),
          getDatasetsbyPhysioID(chartJdata, "TV_Exp"),
          getDatasetsbyPhysioID(chartJdata, "RR"),
          getDatasetsbyPhysioID(chartJdata, "PEEP"),
          getDatasetsbyPhysioID(chartJdata, "ET_CO2"),
          getDatasetsbyPhysioID(chartJdata, "PPeak"),
          getDatasetsbyPhysioID(chartJdata, "PPlat"),
          getDatasetsbyPhysioID(chartJdata, "N2O_FI"),
          getDatasetsbyPhysioID(chartJdata, "N2O_ET"),
          getDatasetsbyPhysioID(chartJdata, "AA_FI"),
          getDatasetsbyPhysioID(chartJdata, "AA_ET"),
          getDatasetsbyPhysioID(chartJdata, "Agent_AA"),
          getDatasetsbyPhysioID(chartJdata, "AA_MAC_SUM"),
          getDatasetsbyPhysioID(chartJdata, "MV_Exp"),
          getDatasetsbyPhysioID(chartJdata, "Compliance"),
        ];

        getRespDatasetsItems(respdatasets2);

        var hemodatasets2 = [
          getDatasetsbyPhysioID(chartJdata, "NIBP_Systolic"),
          getDatasetsbyPhysioID(chartJdata, "NIBP_Diastolic"),
          getDatasetsbyPhysioID(chartJdata, "NIBP_Mean"),
          getDatasetsbyPhysioID(chartJdata, "ECG_HR"),
          getDatasetsbyPhysioID(chartJdata, "SpO2"),
          getDatasetsbyPhysioID(chartJdata, "P1_Systolic"),
          getDatasetsbyPhysioID(chartJdata, "P1_Disatolic"),
          getDatasetsbyPhysioID(chartJdata, "P1_Mean"),
          getDatasetsbyPhysioID(chartJdata, "P2_Systolic"),
          getDatasetsbyPhysioID(chartJdata, "P2_Diastolic"),
          getDatasetsbyPhysioID(chartJdata, "P2_Mean"),
          getDatasetsbyPhysioID(chartJdata, "CVP"),
          getDatasetsbyPhysioID(chartJdata, "ST_II"),
          getDatasetsbyPhysioID(chartJdata, "ST_V5"),
          getDatasetsbyPhysioID(chartJdata, "ST_avL"),
          getDatasetsbyPhysioID(chartJdata, "PPV"),
          getDatasetsbyPhysioID(chartJdata, "PVI"),
        ];

        getHemoDatasetsItems(hemodatasets2);

        var miscdatasets2 = [
          getDatasetsbyPhysioID(chartJdata, "T1_Temp"),
          getDatasetsbyPhysioID(chartJdata, "T2_Temp"),
          getDatasetsbyPhysioID(chartJdata, "BIS"),
          getDatasetsbyPhysioID(chartJdata, "BIS_BSR"),
          getDatasetsbyPhysioID(chartJdata, "BIS_EMG"),
          getDatasetsbyPhysioID(chartJdata, "BIS_SQI"),
          getDatasetsbyPhysioID(chartJdata, "EEG_Entropy"),
          getDatasetsbyPhysioID(chartJdata, "EMG_Entropy"),
          getDatasetsbyPhysioID(chartJdata, "SQI_Entropy"),
        ];

        getMiscDatasetsItems(miscdatasets2);
      }

      chartInstance.update();
    }
  };

  const [client, setClient] = React.useState(null);
  const [isSubed, setIsSub] = React.useState(false);
  const [mqttConnectStatus, setMqttConnectStatus] =
    React.useState("Disconnected");

  const handleMqttConnect = () => {
    var clientId = `mqttjs_+${Math.random().toString(16).substr(2, 8)}`;

    const options = {
      clientId: clientId,
      username: selectedMqttUser,
      password: selectedMqttPass,
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 5000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 1,
        retain: false,
      },
      rejectUnauthorized: false,
    };

    mqttConnect(selectedVitalMqttSource, options);
  };

  const handleMqttSubscribe = () => {
    const subscription = {
      topic: selectedMqttTopic,
      qos: parseInt(selectedMqttQoS),
    };
    mqttSub(subscription);
  };

  const handleMqttPayload = (payload) => {
    try {
      var message = JSON.parse(payload.message);
    } catch (e) {
      console.log("Error parsing JSON message: " + e);
    }
    //console.log(message);
    setMqttJdata(message);
    //setChartJdata(message);
  };

  useEffect(() => {
    if (chartInstance && chartContainer && chartContainer.current) {
      chartJdata.push(mqttJData);
      //console.log(chartJdata);
      updateDataset();
    }
  }, [mqttJData]);

  const handleMqttDisconnect = () => {
    mqttDisconnect();
  };

  const handleMqttOptions = () => {};

  const mqttConnect = (host, mqttOption) => {
    setMqttConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setMqttConnectStatus("Disconnected");
      });
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };

  React.useEffect(() => {
    if (client) {
      console.log(client);
      client.on("connect", () => {
        setMqttConnectStatus("Connected");
        const unsubscription = {
          topic: "/#",
          qos: parseInt(selectedMqttQoS),
        };
        mqttUnSub(unsubscription);
        const subscription = {
          topic: selectedMqttTopic,
          qos: parseInt(selectedMqttQoS),
        };
        mqttSub(subscription);
        console.log(subscription);
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setMqttConnectStatus("Reconnecting");
      });
      client.on("close", () => {
        setMqttConnectStatus("Disconnected");
      });
      client.on("message", (topic, message) => {
        const payload = {
          topic,
          message: message.toString(),
        };
        setMqttConnectStatus("Receiving messages");
        //console.log(payload);
        handleMqttPayload(payload);
      });
    }
  }, [client]);

  React.useEffect(() => {
    if (selectedVitalSourceType === "MQTTURL") handleMqttConnect();
    else handleMqttDisconnect();
  }, [
    selectedVitalMqttSource,
    selectedMqttTopic,
    selectedMqttQoS,
    selectedVitalSourceType,
    selectedMqttUser,
    selectedMqttPass,
  ]);

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
      };*/
    }
  };

  const handleVitalSourceChildState = (
    childvitalsourcestate,
    selectedVitalMqttSource,
    mqttConnectStatus,
    selectedMqttTopic,
    selectedMqttQoS,
    selectedMqttUser,
    selectedMqttPass,
    selectedVitalSource,
    selectedVitalFileSource,
    selectedVitalSourceType,
    dropVitalSourceFileValue,
    selectedMonitorType
  ) => {
    setVitalSourceShow(childvitalsourcestate);
    setSelVitalMqttSourceURLValue(selectedVitalMqttSource);
    setMqttConnectStatus(mqttConnectStatus);
    setSelMqttTopic(selectedMqttTopic);
    setSelMqttQoS(selectedMqttQoS);
    setSelMqttUser(selectedMqttUser);
    setSelMqttPass(selectedMqttPass);
    setSelVitalSource(selectedVitalSource);
    setSelVitalFileSource(selectedVitalFileSource);
    setSelVitalSourceType(selectedVitalSourceType);
    setDropVitalFileSourceValue(dropVitalSourceFileValue);
    setSelMonitorType(selectedMonitorType);
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
        case "MQTTURL":
          datapoints = getDatasetsbyPhysioID5(jdata, physioid);
          break;
        default:
          break;
      }

      /*//filter and remove duplicates or multiple values in a minute
      var datasets = datapoints.filter(
        (value, index, array) =>
          array.findIndex(
            (t) =>
              moment(t.x).startOf("m").valueOf() ===
              moment(value.x).startOf("m").valueOf()
          ) === index
      );
      console.log(datasets);
      return datasets;*/

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

    if (selrespdatasets[0] !== null && selrespdatasets[0] !== undefined) {
      var visiblestarttime = selrespdatasets[0].start_time.clone().startOf("m");
      var visibleendtime = selrespdatasets[0].start_time
        .clone()
        .startOf("m")
        .add(12, "m");

      setSelRespDefaultStartTime(visiblestarttime);
      setSelRespDefaultEndTime(visibleendtime);

      setSelRespDatasetItems(selrespdatasets);
    }
  };

  const getHemoDatasetsItems = (hemodatasets) => {
    var allItems = [];

    //convert to flat object data array
    hemodatasets.map((item, index) => {
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

    //filter and remove duplicates or multiple values in a minute
    var selhemodatasets = allItems
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

    if (selhemodatasets[0] !== null && selhemodatasets[0] !== undefined) {
      var visiblestarttime = selhemodatasets[0].start_time.clone().startOf("m");
      var visibleendtime = selhemodatasets[0].start_time
        .clone()
        .startOf("m")
        .add(12, "m");

      setSelHemoDefaultStartTime(visiblestarttime);
      setSelHemoDefaultEndTime(visibleendtime);

      setSelHemoDatasetItems(selhemodatasets);
    }
  };

  const getMiscDatasetsItems = (miscdatasets) => {
    var allItems = [];

    //convert to flat object data array
    miscdatasets.map((item, index) => {
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
    var selmiscdatasets = allItems
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

    if (selmiscdatasets[0] !== null && selmiscdatasets[0] !== undefined) {
      var visiblestarttime = selmiscdatasets[0].start_time.clone().startOf("m");
      var visibleendtime = selmiscdatasets[0].start_time
        .clone()
        .startOf("m")
        .add(12, "m");

      setSelMiscDefaultStartTime(visiblestarttime);
      setSelMiscDefaultEndTime(visibleendtime);

      setSelMiscDatasetItems(selmiscdatasets);
    }
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
        selectedVitalMqttURLSource={selectedVitalMqttSource}
        selectedMqttTopic={selectedMqttTopic}
        selectedMqttQoS={selectedMqttQoS}
        selectedMqttUser={selectedMqttUser}
        selectedMqttPass={selectedMqttPass}
        mqttConnectionStatus={mqttConnectStatus}
        selectedVitalURLSource={selectedVitalSource}
        selectedVitalFileSource={selectedVitalFileSource}
        selectedVitalSourceType={selectedVitalSourceType}
        dropVitalSourceFileValue={dropVitalFileSourceValue}
        selectedMonitorType={selectedMonitorType}
      />
      <DataTabs
        respDatasetItems={selRespDatasetItems}
        respDefaultStartTime={selRespDefaultStartTime}
        respDefaultEndTime={selRespDefaultEndTime}
        hemoDatasetItems={selHemoDatasetItems}
        hemoDefaultStartTime={selHemoDefaultStartTime}
        hemoDefaultEndTime={selHemoDefaultEndTime}
        miscDatasetItems={selMiscDatasetItems}
        miscDefaultStartTime={selMiscDefaultStartTime}
        miscDefaultEndTime={selMiscDefaultEndTime}
      />
    </>
  );
});

export default NewChart;
