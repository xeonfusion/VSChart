import React, { forwardRef, Fragment } from "react";
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

import {
  meditems,
  medgroups,
  eventitems,
  eventgroups,
  respdatagroups,
  hemodatagroups,
  miscdatagroups,
} from "./dataconstants.jsx";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";

const JsonDataDisplay = forwardRef((props, ref) => {
  const { isDataDisplayed, childState, chartImage } = props;
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
                    <th>Medication</th>
                    <th>Dose</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
              </table>
              <img src={showImageData} height="300" />
            </div>
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default JsonDataDisplay;
