import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";

import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
//import NumPad from "react-numpad";
//import NumPad from "react-numpad-material";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { IndexKind } from "typescript";

const MedModal = ({
  showMedDialog,
  childState,
  selectedMeds,
  selectedItem,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    childState(false, listItems);
  };

  const [selectedDate, handleDateChange] = React.useState(new Date());

  React.useEffect(() => {
    setShow(showMedDialog);
    setListItems(selectedMeds);
    setSelItem(selectedItem);
  }, [showMedDialog, selectedMeds, selectedItem]);

  const medGroups = [
    { id: 1, title: "Propofol", type: "hypnotic", color: "yellow" },
    { id: 2, title: "Fentanyl", type: "opioid", color: "deepskyblue" },
    { id: 3, title: "Lidocaine", type: "localanaesthetic", color: "grey" },
    { id: 4, title: "Rocuronium", type: "nmbd", color: "red" },
    { id: 5, title: "Ringers", type: "ivfluid", color: "white" },
    { id: 6, title: "Midazolam", type: "hypnotic", color: "orange" },
  ];

  const doseunits = ["mg", "mcg", "mcg/kg/min", "ml/hr"];

  const doseroutes = [
    "Intravenous",
    "Subcutaneous",
    "Intramuscular",
    "Intranasal",
    "Endotracheal",
  ];

  const eventtimes = [
    "Induction",
    "Intubation",
    "Maintenance",
    "Extubation",
    "Other",
  ];

  const durations = ["bolus", "min", "sec"];

  const addmeds = ["Suxamethonium", "Morphine", "Cisatracurium", "Thiopentone"];

  const StyledListItem = ({ itemcolor, itemtitle }) => {
    const useStyles = makeStyles({
      root: {
        background: itemcolor,
        borderRadius: 3,
        border: 0,
        color: "black",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(144, 144, 144, .5)",
      },
      label: {
        textTransform: "capitalize",
      },
    });

    const classes = useStyles();
    return (
      <ListItem
        classes={{ root: classes.root, label: classes.label }}
        button
        divider={true}
      >
        <ListItemText>{itemtitle}</ListItemText>
      </ListItem>
    );
  };

  const [listItems, setListItems] = React.useState(medGroups);

  const MedListItems = ({ list }) => (
    <List dense={true}>
      {(list || []).map((listitem) => (
        <StyledListItem
          itemcolor={listitem.color}
          itemtitle={listitem.title}
        ></StyledListItem>
      ))}
    </List>
  );

  const [selectItem, setSelItem] = React.useState(selectedItem);
  const [selectUnit, setSelUnit] = React.useState("mg");

  const handleSelectedDose = () => {
    var dose = parseInt(selectItem[0].title);
    console.log(selectItem[0]);
    return dose;
  };

  const handleUnitChange = (event) => {
    setSelUnit(event.target.value);
  };

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
          <Grid container spacing={3} direction="row">
            <Grid item xs>
              <Grid
                container
                spacing={3}
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid item xs>
                  Medications
                  <MedListItems list={listItems} />
                </Grid>
                <Grid item xs>
                  Add Medication
                </Grid>
                <Grid item xs>
                  <TextField
                    id="Add-entry"
                    select
                    label=""
                    helperText="Add Medication"
                    variant="outlined"
                    fullWidth
                  >
                    {addmeds.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
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
                  <TextField
                    id="outlined-dose"
                    label="Dosage"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={0}
                    value={handleSelectedDose}
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
                spacing={3}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs>
                  Dose unit
                </Grid>
                <Grid item xs>
                  <Select
                    id="dose-unit"
                    labelId="Dose unit"
                    variant="outlined"
                    fullWidth
                    defaultValue={doseunits[0]}
                    value={selectUnit}
                    onChange={handleUnitChange}
                  >
                    {doseunits.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs>
                  Route
                </Grid>
                <Grid item xs>
                  <Select
                    id="route"
                    labelId="Route"
                    variant="outlined"
                    fullWidth
                    defaultValue={doseroutes[0]}
                  >
                    {doseroutes.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={3}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs>
                  Duration
                </Grid>
                <Grid item xs>
                  <Select
                    id="duration-entry"
                    labelId="Duration"
                    variant="outlined"
                    fullWidth
                    defaultValue={durations[0]}
                  >
                    {durations.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs>
                  Event timing
                </Grid>
                <Grid item xs>
                  <Select
                    id="event-timing"
                    labelId="Event timing"
                    variant="outlined"
                    fullWidth
                    defaultValue={eventtimes[0]}
                  >
                    {eventtimes.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
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
