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

const divStyle = {
  //position: "relative",
  width: 800,
  //height: 300,
};

const JsonDataDisplay = forwardRef((props, ref) => {
  const { isDataDisplayed, childState, chartImage, medgroups, meditems } =
    props;

  const PlotJData = ({ headerarray, cellarray }) => {
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
          height: 200,
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
                  <tr>
                    <td>
                        <PlotJData
                          headerarray={selHeaderData}
                          cellarray={selCellData}
                        />
                    </td>
                  </tr>
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
