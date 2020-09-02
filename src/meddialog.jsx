import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import NumPad from "react-numpad";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const MedModal = ({ showMedDialog, childState, selectedMeds }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    childState(false, listItems);
  };

  const [selectedDate, handleDateChange] = React.useState(new Date());

  React.useEffect(() => {
    setShow(showMedDialog);
    setListItems(selectedMeds);
  }, [showMedDialog, selectedMeds]);

  const medGroups = [
    { id: 1, title: "Propofol" },
    { id: 2, title: "Fentanyl" },
    { id: 3, title: "Lidocaine" },
    { id: 4, title: "Rocuronium" },
    { id: 5, title: "Ringers" },
    { id: 6, title: "Midazolam" },
  ];

  const [listItems, setListItems] = React.useState(medGroups);

  const MedListItems = ({ list }) => (
    <List dense={true}>
      {(list || []).map((listitem) => (
        <ListItem button>{listitem.title}</ListItem>
      ))}
    </List>
  );

  return (
    <>
      <Dialog
        open={show}
        onClose={() => {
          handleClose();
        }}
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title">Add Medication</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="row">
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid item xs>
                  Selected Medications
                  <MedListItems list={listItems} />
                </Grid>
                <Grid item xs>
                  Add Medication
                </Grid>
                <Grid item xs>
                  <TextField
                    id="Add-entry"
                    select
                    label="Select"
                    helperText="Add Medication"
                  >
                    <MenuItem>Propofol</MenuItem>
                    <MenuItem>Lidocaine</MenuItem>
                    <MenuItem>Fentanyl</MenuItem>
                    <MenuItem>Rocuronium</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={3}
                direction="column"
                justify="space-between"
                alignItems="stretch"
              >
                <Grid item xs>
                  Dose entry
                </Grid>
                <Grid item xs>
                  <NumPad.Number
                    onChange={(value) => {
                      console.log("value", value);
                    }}
                    label={""}
                    placeholder={"Number Pad"}
                    value={0}
                    decimal={2}
                    negative={false}
                    inline={false}
                  />
                </Grid>
                <Grid item xs>
                  Last Doses
                  <ButtonGroup aria-label="Last doses">
                    <Button variant="outlined" color="default" size="small">
                      Dose1
                    </Button>
                    <Button variant="outlined" color="default" size="small">
                      Dose2
                    </Button>
                    <Button variant="outlined" color="default" size="small">
                      Dose3
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  Timestamp
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      openTo="minutes"
                      format="DD/MM/YYYY hh:mm a"
                      variant="dialog"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs>
                  Dose unit
                </Grid>
                <Grid item xs>
                  <TextField
                    id="dose-unit"
                    select
                    label="Select"
                    helperText="Dose unit"
                  >
                    <MenuItem>mg</MenuItem>
                    <MenuItem>mcg</MenuItem>
                    <MenuItem>mcg/kg/min</MenuItem>
                    <MenuItem>ml/hr</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs>
                  Duration
                </Grid>
                <Grid item xs>
                  <TextField
                    id="duration-entry"
                    select
                    label="Select"
                    helperText="Duration"
                  >
                    <MenuItem>bolus</MenuItem>
                    <MenuItem>min</MenuItem>
                    <MenuItem>sec</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs>
                  Event timing
                </Grid>
                <Grid item xs>
                  <TextField
                    id="event-timing"
                    select
                    label="Select"
                    helperText="Event timing"
                  >
                    <MenuItem>Induction</MenuItem>
                    <MenuItem>Intubation</MenuItem>
                    <MenuItem>Maintenance</MenuItem>
                    <MenuItem>Extubation</MenuItem>
                    <MenuItem>Other</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MedModal;
