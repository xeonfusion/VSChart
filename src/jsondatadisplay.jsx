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
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

import ReactToPrint from "react-to-print";
import moment from "moment";
import * as dfd from "danfojs";

import Plot from "react-plotly.js";

import { Info, SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { Series } from "danfojs/dist/danfojs-base";

const JsonDataDisplay = forwardRef((props, ref) => {
  const { isDataDisplayed, childState, chartImage, medgroups, meditems } =
    props;

  const PlotJData = ({ headerarray, cellarray }) => {
    return (
      <Plot
        data={[
          {
            type: "table",
            header: {
              values: headerarray,
              align: "center",
              line: { width: 1, color: "black" },
              fill: { color: "grey" },
              font: { family: "Arial", size: 12, color: "white" },
            },
            cells: {
              values: cellarray,
              align: "center",
              line: { color: "black", width: 1 },
              fill: {},
              font: { family: "Arial", size: 11, color: ["black"] },
            },
          },
        ]}
      />
    );
  };

  const [selHeaderData, setSelHeaderData] = React.useState([]);
  const [selCellData, setSelCellData] = React.useState([]);
  React.useEffect(() => {
    loadheaderData();
    loadcellData();
  }, [medgroups, meditems]);

  const loadheaderData = () => {
    var values = [];
    values.push(["Medication"]);

    var dfitems = meditems.map((item) => {
      var group = medgroups.filter((e) => e.id === item.group);

      return Object.assign({}, item, {
        group: group[0].title,
        start_time: moment(item.start_time)
        .toString(),
        end_time: moment(item.end_time)
        .toString(),
      });
    });

    var df = new dfd.DataFrame(dfitems);

    var dg1 = df
      .groupby(["start_time"])
      .col(["group", "title"])
      .apply((x) => x);

    dg1.sortValues("start_time", { inplace: true });

    var dg = df
      .groupby(["group"])
      .col(["start_time", "title"])
      .apply((x) => x);

    var data = new dfd.dateRange({
      start: dg1.at(0, "start_time"),
      period: dg["group"].count(),
      //period: 60,
      freq: "m",
    });
    //console.log(data);

    data.map((item) => {
      var ditem = moment(item, "MM/DD/YYYY HH:mm:ss")
        .format("HH:mm")
        .toString();
      values.push([ditem]);
    });

    values.push(["Totals"]);
    setSelHeaderData(values);
    //return values;
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

    var df = new dfd.DataFrame(dfitems);
    
    //var dg1 = df.groupby(["start_time"]).col(["group", "title"]).agg({title:"min", group:"count"});
    var dg1 = df
      .groupby(["start_time"])
      .col(["group", "title"])
      .apply((x) => x);
    dg1.sortValues("start_time", { inplace: true });

    //dg1.print();

    var dg = df
      .groupby(["group"])
      .col(["start_time", "title"])
      .apply((x) => x);
    //var dg = df.groupby(["group"]).col(["start_time", "title"]).agg({title:"min", start_time:"min"});
    //dg.print();
    //console.log(dg.values)
    //values.push(dg.values[0])

    var data = new dfd.dateRange({
      start: dg1.at(0, "start_time"),
      period: dg["group"].count(),
      //period: 60,
      freq: "m",
    });

    //console.log(dfitems);

    var dtdata = data.map((dtime) => {
      var columns = medgroups.map((info) => {
        const group = info.title;
        var ditem = dfitems
          .filter(
            (e) =>
              moment(e.start_time, "MM/DD/YYYY HH:mm:ss").startOf("m").valueOf() ===
                moment(dtime, "MM/DD/YYYY HH:mm:ss a").startOf("m").valueOf() &&
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

      var sum = 0;
      items.forEach((item) => {
        sum += parseFloat(item.title);
      });
      total.push([sum + " (" + group.unit + ")"]);
    });
    //console.log(total);
    return total;
  };

  const DisplayData = meditems.map((info) => {
    var group = medgroups.filter((e) => e.id === info.group);
    //console.log(group);
    return (
      <tr>
        <td>{group[0].title + " (" + group[0].unit + ")"}</td>
        <td>{info.title}</td>
        <td>{info.start_time.toString()}</td>
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
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        className="align-top"
      >
        <DialogTitle disableTypography>
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
                    <th>Anaesthesia Chart</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div>
                <PlotJData
                  headerarray={selHeaderData}
                  cellarray={selCellData}
                />
              </div>
              <img src={showImageData} alt="chart" height="300" />
            </div>
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default JsonDataDisplay;
