import React from "react";
import { forwardRef, Fragment } from "react";

import {
  Grid,
  Divider,
  Typography,
  IconButton,
  Button,
  withStyles,
  TextField,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableFooter,
} from "@mui/material/";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

import ReactToPrint from "react-to-print";
import moment from "moment";
import Plot from "react-plotly.js";

import { Info, SettingsInputAntennaTwoTone } from "@mui/icons-material/";
import "./tablestyle.css";

const divStyle = {
  //position: "relative",
  width: 800,
  //height: 300,
};

const tableStyle = {
  border: "1px solid black",
  padding: "1px",
  borderCollapse: "collapse",
};

const JsonDataDisplay = forwardRef((props, ref) => {
  const {
    isDataDisplayed,
    childState,
    chartImage,
    medgroups,
    meditems,
    outputgroups,
    outputitems,
    eventgroups,
    eventitems,
    proceduregroups,
    procedureitems,
    respdatagroups,
    respdataitems,
    hemodatagroups,
    hemodataitems,
    miscdatagroups,
    miscdataitems,
  } = props;

  const PlotJData = ({ headerarray, cellarray, tableheight }) => {
    return (
      <Plot
        data={[
          {
            type: "table",
            columnwidth: [
              500, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
              300,
            ],
            header: {
              values: headerarray,
              align: "center",
              line: { width: 1, color: "black" },
              fill: { color: "grey" },
              font: { family: "Arial", size: 15, color: "white" },
            },
            cells: {
              values: cellarray,
              align: "center",
              line: { color: "black", width: 1 },
              fill: {},
              font: { family: "Arial", size: 14, color: ["black"] },
            },
          },
        ]}
        config={{
          responsive: true,
          displayModeBar: true,
          toImageButtonOptions: {
            format: "svg",
            filename: "custom_image",
            height: 500,
            width: 700,
            scale: 2,
          },
        }}
        layout={{
          autosize: true,
          width: 1300,
          height: tableheight,
          margin: {
            l: 50,
            r: 50,
            b: 20,
            t: 20,
            pad: 4,
          },
        }}
      />
    );
  };

  const [selHeaderData, setSelHeaderData] = React.useState([]);
  const [selCellData, setSelCellData] = React.useState([]);
  const [selHeaderRespData, setSelHeaderRespData] = React.useState([]);
  const [selCellRespData, setSelCellRespData] = React.useState([]);
  const [selHeaderHemoData, setSelHeaderHemoData] = React.useState([]);
  const [selCellHemoData, setSelCellHemoData] = React.useState([]);
  const [selHeaderMiscData, setSelHeaderMiscData] = React.useState([]);
  const [selCellMiscData, setSelCellMiscData] = React.useState([]);

  React.useEffect(() => {
    loadheaderData();
    loadcellData();
  }, [medgroups, meditems]);

  React.useEffect(() => {
    loadheaderRespData();
    loadcellRespData();
  }, [respdatagroups, respdataitems]);

  React.useEffect(() => {
    loadheaderHemoData();
    loadcellHemoData();
  }, [hemodatagroups, hemodataitems]);

  React.useEffect(() => {
    loadheaderMiscData();
    loadcellMiscData();
  }, [miscdatagroups, miscdataitems]);

  const loadheaderData = () => {
    var values = [];
    values.push(["Medication"]);

    var dfitems = meditems.map((item) => {
      var group = medgroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time).toString(),
        end_time: moment(item.end_time).toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);

    data.map((item) => {
      var ditem = moment(item).format("HH:mm").toString();
      values.push([ditem]);
    });

    values.push(["Totals"]);
    setSelHeaderData(values);
    //console.log(values);
    //return values;
  };

  const getDateRange = (startdate, interval) => {
    var data = [];
    var date = startdate.clone();
    var maxdate = startdate.clone().add(interval, "m");
    while (maxdate > date) {
      data.push(date.format("MM/DD/YYYY HH:mm:ss"));
      date = moment(date).add(1, "m");
    }
    return data;
  };

  const loadcellData = () => {
    var values = [];
    var meds = [];

    medgroups.map((info) => {
      const item = info.title + "(" + info.unit + ")";
      meds.push(item);
    });

    values.push(meds);

    var dfitems = meditems.map((item) => {
      var group = medgroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
        end_time: moment(item.end_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);
    //console.log(dfitems);

    var dtdata = data.map((dtime) => {
      var columns = medgroups.map((info) => {
        const group = info.title;
        var ditem = dfitems
          .filter(
            (e) =>
              moment(e.start_time, "MM/DD/YYYY HH:mm:ss")
                .startOf("m")
                .valueOf() ===
                moment(dtime, "MM/DD/YYYY HH:mm:ss").startOf("m").valueOf() &&
              e.group === group
          )
          .map((item) => {
            return item.title;
          });
        //console.log(ditem[0])
        if (ditem[0] === undefined || ditem[0] === null) ditem[0] = "";
        return ditem[0];
      });
      return columns;
    });
    //console.log(dtdata);

    dtdata.map((item) => {
      values.push(item);
    });

    var totals = getItemTotalsAllGroups();
    values.push(totals);

    //console.log(values);
    setSelCellData(values);
    //return values;
  };

  const getItemTotalsAllGroups = () => {
    var total = [];
    medgroups.map((group) => {
      var items = meditems.filter((e) => e.group === group.id);

      var infsum = 0;
      if (items[0] !== undefined) {
        items.forEach((item) => {
          var duration = 0;
          if (
            group.durationunit === "bolus (sec)" ||
            group.durationunit === "bolus (min)"
          )
            duration = 1;
          else
            duration = item.end_time.diff(
              item.start_time,
              getGroupUnit(group).time,
              true
            );
          var infrate = parseFloat(item.title);
          var totalinf = infrate * duration;
          infsum += totalinf;
        });
        if (
          group.durationunit !== "bolus (sec)" &&
          group.durationunit !== "bolus (min)"
        )
          infsum = infsum.toFixed(1);
        //console.log(infsum);
      }
      total.push([infsum + " " + getGroupUnit(group).unit]);
      return infsum;
    });

    return total;
  };

  const getGroupUnit = (group) => {
    var unit = "";
    var time = "";
    switch (group.unit) {
      case "ml/hr":
        unit = "ml";
        time = "h";
        break;
      case "mg/kg/hr":
        unit = "mg/kg";
        time = "h";
        break;
      case "mg/hr":
        unit = "mg";
        time = "h";
        break;
      case "mcg/kg/hr":
        unit = "mcg/kg";
        time = "h";
        break;
      case "mcg/kg/min":
        unit = "mcg/kg";
        time = "m";
        break;
      case "U/hr":
        unit = "U";
        time = "h";
        break;
      case "L/min":
        unit = "L";
        time = "m";
        break;
      default:
        unit = group.unit;
        time = "m";
        break;
    }
    return {
      unit: unit,
      time: time,
    };
  };

  const loadheaderRespData = () => {
    var values = [];
    values.push(["Respiratory"]);

    if (respdataitems[0] === undefined || respdataitems[0] === null) return [];

    var dfitems = respdataitems.map((item) => {
      var group = respdatagroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time).toString(),
        end_time: moment(item.end_time).toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);

    data.map((item) => {
      var ditem = moment(item).format("HH:mm").toString();
      values.push([ditem]);
    });

    setSelHeaderRespData(values);
    //console.log(values);
    //return values;
  };

  const loadcellRespData = () => {
    var values = [];
    var resplabels = [];

    if (respdataitems[0] === undefined || respdataitems[0] === null) return [];

    respdatagroups.map((info) => {
      const item = info.title + "(" + info.unit + ")";
      resplabels.push(item);
    });

    values.push(resplabels);

    var dfitems = respdataitems.map((item) => {
      var group = respdatagroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
        end_time: moment(item.end_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);
    //console.log(dfitems);

    var dtdata = data.map((dtime) => {
      var columns = respdatagroups.map((info) => {
        const group = info.title;
        var ditem = dfitems
          .filter(
            (e) =>
              moment(e.start_time, "MM/DD/YYYY HH:mm:ss")
                .startOf("m")
                .valueOf() ===
                moment(dtime, "MM/DD/YYYY HH:mm:ss").startOf("m").valueOf() &&
              e.group === group
          )
          .map((item) => {
            return item.title;
          });
        //console.log(ditem[0])
        if (ditem[0] === undefined || ditem[0] === null) ditem[0] = "";
        return ditem[0];
      });
      return columns;
    });
    //console.log(dtdata);

    dtdata.map((item) => {
      values.push(item);
    });

    //console.log(values);
    setSelCellRespData(values);
    //return values;
  };

  const loadheaderHemoData = () => {
    var values = [];
    values.push(["Hemodynamic"]);

    if (hemodataitems[0] === undefined || hemodataitems[0] === null) return [];

    var dfitems = hemodataitems.map((item) => {
      var group = hemodatagroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time).toString(),
        end_time: moment(item.end_time).toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);

    data.map((item) => {
      var ditem = moment(item).format("HH:mm").toString();
      values.push([ditem]);
    });

    setSelHeaderHemoData(values);
    //console.log(values);
    //return values;
  };

  const loadcellHemoData = () => {
    var values = [];
    var hemolabels = [];

    if (hemodataitems[0] === undefined || hemodataitems[0] === null) return [];

    hemodatagroups.map((info) => {
      const item = info.title + "(" + info.unit + ")";
      hemolabels.push(item);
    });

    values.push(hemolabels);

    var dfitems = hemodataitems.map((item) => {
      var group = hemodatagroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
        end_time: moment(item.end_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);
    //console.log(dfitems);

    var dtdata = data.map((dtime) => {
      var columns = hemodatagroups.map((info) => {
        const group = info.title;
        var ditem = dfitems
          .filter(
            (e) =>
              moment(e.start_time, "MM/DD/YYYY HH:mm:ss")
                .startOf("m")
                .valueOf() ===
                moment(dtime, "MM/DD/YYYY HH:mm:ss").startOf("m").valueOf() &&
              e.group === group
          )
          .map((item) => {
            return item.title;
          });
        //console.log(ditem[0])
        if (ditem[0] === undefined || ditem[0] === null) ditem[0] = "";
        return ditem[0];
      });
      return columns;
    });
    //console.log(dtdata);

    dtdata.map((item) => {
      values.push(item);
    });

    //console.log(values);
    setSelCellHemoData(values);
    //return values;
  };

  const loadheaderMiscData = () => {
    var values = [];
    values.push(["Misc"]);

    if (miscdataitems[0] === undefined || miscdataitems[0] === null) return [];

    var dfitems = miscdataitems.map((item) => {
      var group = miscdatagroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time).toString(),
        end_time: moment(item.end_time).toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);

    data.map((item) => {
      var ditem = moment(item).format("HH:mm").toString();
      values.push([ditem]);
    });

    setSelHeaderMiscData(values);
    //console.log(values);
    //return values;
  };

  const loadcellMiscData = () => {
    var values = [];
    var misclabels = [];

    if (miscdataitems[0] === undefined || miscdataitems[0] === null) return [];

    miscdatagroups.map((info) => {
      const item = info.title + "(" + info.unit + ")";
      misclabels.push(item);
    });

    values.push(misclabels);

    var dfitems = miscdataitems.map((item) => {
      var group = miscdatagroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
        end_time: moment(item.end_time)
          .format("MM/DD/YYYY HH:mm:ss")
          .toString(),
      });
    });

    const mindate = moment(
      dfitems
        .map((obj) => new Date(obj.start_time ?? ""))
        .reduce((a, b) => (b < a ? b : a))
    );

    var data = getDateRange(mindate, 12);
    //console.log(data);
    //console.log(dfitems);

    var dtdata = data.map((dtime) => {
      var columns = miscdatagroups.map((info) => {
        const group = info.title;
        var ditem = dfitems
          .filter(
            (e) =>
              moment(e.start_time, "MM/DD/YYYY HH:mm:ss")
                .startOf("m")
                .valueOf() ===
                moment(dtime, "MM/DD/YYYY HH:mm:ss").startOf("m").valueOf() &&
              e.group === group
          )
          .map((item) => {
            return item.title;
          });
        //console.log(ditem[0])
        if (ditem[0] === undefined || ditem[0] === null) ditem[0] = "";
        return ditem[0];
      });
      return columns;
    });
    //console.log(dtdata);

    dtdata.map((item) => {
      values.push(item);
    });

    //console.log(values);
    setSelCellMiscData(values);
    //return values;
  };

  const DisplayEventData = eventitems.map((info) => {
    return (
      <tr>
        <td style={tableStyle}>{info.title}</td>
        <td style={tableStyle}>
          {moment(info.start_time).format("DD/MM/YYYY HH:mm").toString()}
        </td>
      </tr>
    );
  });

  const DisplayProcedureData = procedureitems.map((info) => {
    return (
      <tr>
        <td style={tableStyle}>{info.title}</td>
        <td style={tableStyle}>
          {moment(info.start_time).format("DD/MM/YYYY HH:mm").toString()}
        </td>
      </tr>
    );
  });

  const getOutputItemTotalsFromGroup = (groupId) => {
    var items = outputitems.filter((e) => e.group === groupId);

    var sum = 0;
    items.forEach((item) => {
      sum += parseFloat(item.title);
    });

    return sum;
  };

  const DisplayOutputData = outputgroups.map((group) => {
    return (
      <tr>
        <td style={tableStyle}>{group.title}</td>
        <td style={tableStyle}>
          {getOutputItemTotalsFromGroup(group.id) + " " + group.unit}
        </td>
      </tr>
    );
  });

  const [show, setShow] = React.useState(false);
  const [showImageData, setShowImageData] = React.useState(null);

  const handleClose = () => {
    setShow(false);
    childState(false);
  };

  React.useEffect(() => {
    setShow(isDataDisplayed);
  }, [isDataDisplayed]);

  React.useEffect(() => {
    setShowImageData(chartImage);
  }, [chartImage]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
        fullWidth={true}
        maxWidth="md"
        scroll="body"
        disableEscapeKeyDown={true}
        className="align-top"
      >
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h6">Print Chart</Typography>
            </Grid>
          </Grid>
          {show ? (
            <IconButton
              aria-label="close"
              className="dialogCloseButton"
              onClick={handleClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <Fragment>
            <ReactToPrint
              trigger={() => <button>Print this</button>}
              content={() => ref.current}
            />
            <div ref={ref}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <div style={{ marginLeft: 50 }}>
                      <th>Anaesthesia Chart</th>
                    </div>
                  </tr>
                  <tr>
                    <td>
                      <PlotJData
                        headerarray={selHeaderData}
                        cellarray={selCellData}
                        tableheight={200}
                      />
                    </td>
                  </tr>
                  <div style={{ marginLeft: 50 }}>
                    <th>Events</th>
                    <th>Procedures</th>
                    <th>Outputs</th>
                    <tr>
                      <td>{DisplayEventData}</td>
                      <td>{DisplayProcedureData}</td>
                      <td>{DisplayOutputData}</td>
                    </tr>
                    <tr></tr>
                  </div>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div style={{ margin: 50 }}>
                        <img
                          src={showImageData}
                          alt="chart"
                          height="300"
                          width="1300"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <PlotJData
                        headerarray={selHeaderRespData}
                        cellarray={selCellRespData}
                        tableheight={500}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <PlotJData
                        headerarray={selHeaderHemoData}
                        cellarray={selCellHemoData}
                        tableheight={500}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <PlotJData
                        headerarray={selHeaderMiscData}
                        cellarray={selCellMiscData}
                        tableheight={500}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default JsonDataDisplay;
