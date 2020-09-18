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
import moment from "moment";
import Grid from "@material-ui/core/Grid";
//import NumPad from "react-numpad";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const MedModal = ({
  showMedDialog,
  childState,
  selectedMeds,
  selectedItems,
  selectedItem,
  selectedGroup,
  selectedDose,
  selectedUnit,
  selectedRoute,
  selectedItemTime,
  selectedDuration,
  selectedDurationUnit,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    var finalallItems = handleAllItemsChange();
    childState(false, allGroups, finalallItems);
  };

  const [selectedDate, handleDateChange] = React.useState(new Date());

  React.useEffect(() => {
    setShow(showMedDialog);
    setAllGroups(selectedMeds);
    setAllItems(selectedItems);
    setSelGroup(selectedGroup);
    setSelItem(selectedItem);
    setSelDose(selectedDose);
    setSelUnit(selectedUnit);
    setSelRoute(selectedRoute);
    setSelDurationUnit(selectedDurationUnit);
    setSelDuration(selectedDuration);
    handleDateChange(selectedItemTime);
  }, [
    showMedDialog,
    selectedMeds,
    selectedItems,
    selectedGroup,
    selectedItem,
    selectedDose,
    selectedUnit,
    selectedRoute,
    selectedDuration,
    selectedItemTime,
    selectedDurationUnit,
  ]);

  const medGroups = [
    {
      id: 1,
      title: "Propofol",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "hypnotic",
      color: "yellow",
    },
    {
      id: 2,
      title: "Fentanyl",
      unit: "mcg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "opioid",
      color: "deepskyblue",
    },
    {
      id: 3,
      title: "Lidocaine",
      unit: "mg",
      route: "Subcutaneous",
      durationunit: "bolus (sec)",
      type: "localanaesthetic",
      color: "grey",
    },
    {
      id: 4,
      title: "Rocuronium",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "nmbd",
      color: "red",
    },
    {
      id: 5,
      title: "Ringers",
      unit: "ml/hr",
      route: "Intravenous",
      durationunit: "min",
      type: "ivfluid",
      color: "white",
    },
    {
      id: 6,
      title: "Midazolam",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "hypnotic",
      color: "orange",
    },
  ];

  const medItems = [
    {
      id: 1,
      group: 1,
      title: "150 mg",
      start_time: moment().add(0.5, "m"),
      end_time: moment().add(1, "m"),
      rightTitle: "",
    },
    {
      id: 2,
      group: 2,
      title: "75 mcg",
      start_time: moment().add(0, "m"),
      end_time: moment().add(0.5, "m"),
    },
    {
      id: 3,
      group: 3,
      title: "100 mg",
      start_time: moment().add(0, "m"),
      end_time: moment().add(0.5, "m"),
    },
    {
      id: 4,
      group: 4,
      title: "50 mg",
      start_time: moment().add(1, "m"),
      end_time: moment().add(1.5, "m"),
    },
    {
      id: 5,
      group: 5,
      title: "60 ml/hr",
      start_time: moment().add(0, "m"),
      end_time: moment().add(10, "m"),
    },
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

  const durations = ["bolus (sec)", "min", "sec"];

  const addmeds = ["Suxamethonium", "Morphine", "Cisatracurium", "Thiopentone"];

  const StyledListItem = ({ itemcolor, itemtitle, itemindex }) => {
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
        onClick={() => handleMedListClick(itemindex)}
      >
        <ListItemText>{itemtitle}</ListItemText>
      </ListItem>
    );
  };

  const MedListItems = ({ list }) => (
    <List dense={true}>
      {(list || []).map((listitem, index) => (
        <StyledListItem
          itemcolor={listitem.color}
          itemtitle={listitem.title}
          itemindex={listitem.id}
        ></StyledListItem>
      ))}
    </List>
  );

  const [allGroups, setAllGroups] = React.useState(medGroups);
  const [allItems, setAllItems] = React.useState(medItems);
  const [selectGroup, setSelGroup] = React.useState(medGroups[0]);
  const [selectItem, setSelItem] = React.useState(medItems[0]);

  const [selectDose, setSelDose] = React.useState(0);
  const [selectUnit, setSelUnit] = React.useState(doseunits[0]);
  const [selectRoute, setSelRoute] = React.useState(doseroutes[0]);
  const [selectDurationUnit, setSelDurationUnit] = React.useState(durations[0]);
  const [selectEvent, setSelEvent] = React.useState(eventtimes[0]);
  const [selectDuration, setSelDuration] = React.useState(0);

  const handleMedListClick = (index) => {
    console.log(index);
    var group = allGroups.filter((e) => e.id === index).map((group) => group);
    var item = allItems.filter((e) => e.id === index).map((item) => item);
    setSelGroup(group);
    setSelItem(item);

    console.log(group);
    console.log(item);

    var dose = parseInt(item[0].title);
    var unit = group[0].unit;
    var route = group[0].route;
    var start_time = item[0].start_time;
    var end_time = item[0].end_time;
    var duration = end_time.diff(start_time, "seconds");
    var durationunit = group[0].durationunit;

    setSelDose(dose);
    setSelUnit(unit);
    setSelRoute(route);
    handleDateChange(start_time);
    setSelDuration(duration);
    setSelDurationUnit(durationunit);
  };

  const handleAllItemsChange = () => {
    var itemId = selectItem[0].id;

    var items = allItems.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            title: selectItem[0].title,
            start_time: selectItem[0].start_time,
            end_time: selectItem[0].end_time,
          })
        : item
    );
    setAllItems(items);
    //console.log(items);
    return items;
  };

  const handleDoseChange = (event) => {
    setSelDose(event.target.value);

    var itemId = selectItem[0].id;

    var item = selectItem.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            title: event.target.value,
          })
        : item
    );
    setSelItem(item);
    //console.log(item);
  };

  const handleDurationChange = (event) => {
    setSelDuration(event.target.value);

    var itemId = selectItem[0].id;
    var start_time = moment(selectItem[0].start_time);
    var duration = event.target.value;
    var durationunit = convertDurationUnit(selectDurationUnit);

    var end_time = start_time.add(duration, durationunit);
    //console.log(start_time);
    //console.log(end_time);

    var item = selectItem.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start_time: selectItem[0].start_time,
            end_time: end_time,
          })
        : item
    );
    setSelItem(item);
  };

  const convertDurationUnit = (duration) => {
    var durationconverted;
    switch (duration) {
      case "bolus (sec)":
        durationconverted = "s";
        break;
      case "min":
        durationconverted = "m";
        break;
      default:
        durationconverted = "s";
        break;
    }
    return durationconverted;
  };

  const handleUnitChange = (event) => {
    setSelUnit(event.target.value);
  };

  const handleRouteChange = (event) => {
    setSelRoute(event.target.value);
  };

  const handleDurationUnitChange = (event) => {
    setSelDurationUnit(event.target.value);
  };

  const handleEventChange = (event) => {
    setSelEvent(event.target.value);
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
                  <MedListItems list={allGroups} />
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
                    value={selectDose}
                    onChange={handleDoseChange}
                  />
                </Grid>
                <Grid item xs>
                  Duration entry
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-duration"
                    label="Duration"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={0}
                    value={selectDuration}
                    onChange={handleDurationChange}
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
                    value={selectUnit}
                    onChange={handleUnitChange}
                  >
                    {doseunits.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs>
                  Duration unit
                </Grid>
                <Grid item xs>
                  <Select
                    id="duration-entry"
                    labelId="Duration"
                    variant="outlined"
                    fullWidth
                    defaultValue={durations[0]}
                    value={selectDurationUnit}
                    onChange={handleDurationUnitChange}
                  >
                    {durations.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
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
                  Route
                </Grid>
                <Grid item xs>
                  <Select
                    id="route"
                    labelId="Route"
                    variant="outlined"
                    fullWidth
                    defaultValue={doseroutes[0]}
                    value={selectRoute}
                    onChange={handleRouteChange}
                  >
                    {doseroutes.map((item) => (
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
                    value={selectEvent}
                    onChange={handleEventChange}
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
