import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
//import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";

//import MomentUtils from "@date-io/moment";
import DateAdapter from "@mui/lab/AdapterDateFns";
import moment from "moment";
import Grid from "@mui/material/Grid";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AlarmIcon from "@mui/icons-material/Alarm";
import SnoozeIcon from "@mui/icons-material/Snooze";
import ClockIcon from "@mui/icons-material/AccessTime";

import { addprocedures } from "./dataconstants.jsx";

const ProcedureModal = ({
  showProcedureDialog,
  childProcedureState,
  selectedProcedureItems,
  selectedProcedureItem,
  selectedProcedureItemIndex,
  selectedProcedureItemTime,
  selectedProcedureType,
  selectedProcedureNote,
}) => {
  const [showProcedure, setProcedureShow] = React.useState(false);
  const [selectListFocus, setSelListFocus] = React.useState(false);

  const handleClose = () => {
    var finalallProcedureItems = handleAllProceduresChange();

    setProcedureShow(false);
    childProcedureState(
      false,
      finalallProcedureItems,
      selectProcedureItem,
      selectProcedureItemIndex,
      selectedDate,
      selectAddProcedures,
      selectProcedureNote
    );
  };

  const StyledListItem = ({
    itemcolor,
    itemtitle,
    itemtime,
    itemindex,
    itemselected,
  }) => {
    const useStyles = makeStyles({
      root: {
        background: itemcolor,
        borderRadius: 3,
        border:
          itemselected === true ? "solid 6px rgba(144, 144, 144, 1)" : "0",
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
        onClick={() => handleProcedureListClick(itemindex)}
        autoFocus={itemselected && selectListFocus ? true : false}
      >
        <ListItemText secondary={itemtime}>{itemtitle}</ListItemText>
      </ListItem>
    );
  };

  const ProcedureListItems = ({ list, itemselected }) => (
    <List
      dense={true}
      sx={{
        maxHeight: 270,
        maxWidth: 200,
        minWidth: 200,
        overflow: "scroll",
      }}
    >
      {(list || [])
        .sort((a, b) => a.start_time.diff(b.start_time))
        .map((listitem, index) => (
          <StyledListItem
            itemcolor={index % 2 ? "#ffffff" : "#dbe7f4"}
            itemtitle={listitem.title}
            itemtime={listitem.start_time.format("HH:mm")}
            itemindex={listitem.id}
            itemselected={
              typeof itemselected[0] === "undefined"
                ? false
                : itemselected[0].id === listitem.id
                ? true
                : false
            }
          ></StyledListItem>
        ))}
    </List>
  );

  const [allProcedureItems, setAllProcedureItems] = React.useState(
    selectedProcedureItems
  );
  const [selectProcedureItem, setSelProcedureItem] = React.useState(
    selectedProcedureItem
  );
  const [selectProcedureItemIndex, setSelProcedureItemIndex] = React.useState(
    selectedProcedureItemIndex
  );
  const [selectAddProcedures, setSelAddProcedures] = React.useState("");
  const [selectedDate, setSelDateChange] = React.useState(new Date());
  const [selectProcedureNote, setSelProcedureNoteChange] = React.useState("");

  React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setAllProcedureItems(selectedProcedureItems);
  }, []);

  React.useEffect(() => {
    setSelProcedureItem(selectedProcedureItem);
    setSelProcedureItemIndex(selectedProcedureItemIndex);
    setSelDateChange(selectedProcedureItemTime);
    setSelAddProcedures(selectedProcedureType);
    setSelProcedureNoteChange(selectedProcedureNote);
    setProcedureShow(showProcedureDialog);
  }, [
    selectedProcedureItem,
    selectedProcedureItemIndex,
    selectedProcedureItemTime,
    selectedProcedureType,
    selectedProcedureNote,
    showProcedureDialog,
  ]);

  const handleDateChange = (value) => {
    if (selectProcedureItemIndex !== 0) {
      setSelDateChange(value);
      //console.log(selectProcedureItem[0]);

      var itemId = selectProcedureItem[0].id;
      var start_time = moment(selectProcedureItem[0].start_time);
      var end_time = moment(selectProcedureItem[0].end_time);
      var duration = moment.duration(end_time.diff(start_time));

      var final_start_time = moment(value);
      var final_end_time = moment(value).add(duration);

      var item = selectProcedureItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: final_start_time,
              end_time: final_end_time,
            })
          : item
      );
      //console.log(item);
      setSelProcedureItem(item);

      var items = allProcedureItems.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: final_start_time,
              end_time: final_end_time,
            })
          : item
      );
      setAllProcedureItems(items);
    }
  };

  const handleAllProceduresChange = () => {
    if (selectProcedureItemIndex !== 0) {
      var itemId = selectProcedureItem[0].id;
      //console.log(selectProcedureItem[0]);

      var items = allProcedureItems.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              title: selectProcedureItem[0].title,
              start_time: selectProcedureItem[0].start_time,
              end_time: selectProcedureItem[0].end_time,
              note: selectProcedureItem[0].note,
            })
          : item
      );
      setAllProcedureItems(items);
      return items;
    } else return selectedProcedureItems;
  };

  const handleProcedureListClick = (index) => {
    handleAllProceduresChange();
    if (index === 0) return;
    var items = allProcedureItems
      .filter((e) => e.id === index)
      .map((item) => item);
    var item = items.slice(-1);
    //console.log(allProcedureItems);
    //console.log(item);

    setSelProcedureItem(item);
    setSelProcedureItemIndex(item[0].id);
    setSelDateChange(item[0].start_time);
    setSelProcedureNoteChange(item[0].note);

    setSelListFocus(true);
  };

  const handleProcedureSelChange = (event) => {
    setSelAddProcedures(event.target.value);
  };

  const handleAddProcedures = () => {
    if (selectAddProcedures !== "") {
      var selprocedureindex = allProcedureItems.length + 1;

      const item = [
        {
          id: selprocedureindex,
          group: 1,
          title: selectAddProcedures,
          start_time: moment().add(0, "m"),
          end_time: moment().add(0.5, "m"),
        },
      ];

      allProcedureItems.push(item[0]);

      var finalitems = allProcedureItems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finalitem = finalitems.filter((e) => e.id === selprocedureindex);

      setSelProcedureItem(finalitem);
      setSelProcedureItemIndex(selprocedureindex);
      setAllProcedureItems(finalitems);

      handleGetSelProcedureDetail(finalitem);
      setSelListFocus(true);
    }
  };

  const handleGetSelProcedureDetail = (selprocedure) => {
    var start_time = selprocedure[0].start_time;
    setSelDateChange(start_time);
    var note = selprocedure[0].note;
    setSelProcedureNoteChange(note);
  };

  const handleRemoveProcedures = () => {
    if (selectProcedureItemIndex !== 0) {
      var selprocedureindex = selectProcedureItem[0].id;

      var selprocedureitems = allProcedureItems
        .filter((e) => e.id !== selprocedureindex)
        .map((items) => items);

      var finalitems = selprocedureitems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finalprocedureindex = 0;
      switch (selprocedureindex) {
        case 1:
          if (selprocedureitems.length > 0)
            finalprocedureindex = selprocedureitems.length;
          break;
        default:
          finalprocedureindex = selprocedureindex - 1;
      }

      var finalitem = finalitems.filter((e) => e.id === finalprocedureindex);
      setSelProcedureItem(finalitem);
      setSelProcedureItemIndex(finalitem.id);

      setAllProcedureItems(finalitems);
      if (finalprocedureindex !== 0) handleGetSelProcedureDetail(finalitem);
      setSelListFocus(true);
    }
  };

  const handleNextProcedure = () => {
    var seladdprocedureindex = addprocedures.findIndex(
      (e) => e === selectAddProcedures
    );

    var finalprocedureindex = 0;
    switch (seladdprocedureindex) {
      case addprocedures.length - 1:
        if (addprocedures.length > 0) finalprocedureindex = 0;
        break;
      case -1:
        if (addprocedures.length > 0) finalprocedureindex = 0;
        break;
      default:
        finalprocedureindex = seladdprocedureindex + 1;
    }

    var finalprocedure = addprocedures[finalprocedureindex];
    setSelAddProcedures(finalprocedure);
  };

  const handlePreviousProcedure = () => {
    var seladdprocedureindex = addprocedures.findIndex(
      (e) => e === selectAddProcedures
    );

    var finalprocedureindex = 0;
    switch (seladdprocedureindex) {
      case 0:
        if (addprocedures.length > 0)
          finalprocedureindex = addprocedures.length - 1;
        break;
      case -1:
        if (addprocedures.length > 0)
          finalprocedureindex = addprocedures.length - 1;
        break;
      default:
        finalprocedureindex = seladdprocedureindex - 1;
    }

    var finalprocedure = addprocedures[finalprocedureindex];
    setSelAddProcedures(finalprocedure);
  };

  const handleChangeProcedureType = (event) => {
    if (selectProcedureItemIndex !== 0) {
      var selprocedureindex = selectProcedureItem[0].id;

      var finalitems = allProcedureItems.map((item, index) =>
        item.id === selprocedureindex
          ? Object.assign({}, item, {
              title: selectAddProcedures,
            })
          : item
      );

      var finalitem = finalitems.filter((e) => e.id === selprocedureindex);

      setSelProcedureItem(finalitem);
      setSelProcedureItemIndex(selprocedureindex);
      setAllProcedureItems(finalitems);

      handleGetSelProcedureDetail(finalitem);
    }
  };

  const handleProcedureNoteChange = (event) => {
    if (selectProcedureItemIndex !== 0) {
      setSelProcedureNoteChange(event.target.value);

      var itemId = selectProcedureItem[0].id;

      var item = selectProcedureItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              note: event.target.value,
            })
          : item
      );
      //console.log(item);
      setSelListFocus(false);
      setSelProcedureItem(item);
    }
  };

  return (
    <>
      <Dialog
        open={showProcedure}
        onClose={() => {
          handleClose();
        }}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title-2">Add Procedure</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="row"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs>
                  Procedures
                  <ProcedureListItems
                    list={allProcedureItems}
                    itemselected={selectProcedureItem}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="Add-entry"
                    select
                    label=""
                    helperText="Add Procedure"
                    variant="standard"
                    sx={{
                      minWidth: "200px",
                    }}
                    value={selectAddProcedures}
                    onChange={handleProcedureSelChange}
                  >
                    {addprocedures.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Add/Remove Procedures">
                    <Button
                      size="large"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handleAddProcedures}
                    >
                      Add Procedure
                    </Button>
                    <Button
                      size="large"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handleRemoveProcedures}
                    >
                      Remove Procedure
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Browse Procedures">
                    <Button
                      size="large"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handleNextProcedure}
                    >
                      Next Procedure
                    </Button>
                    <Button
                      size="large"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handlePreviousProcedure}
                    >
                      Previous Procedure
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Change Procedures">
                    <Button
                      size="large"
                      sx={{
                        maxWidth: "200px",
                      }}
                      onClick={handleChangeProcedureType}
                    >
                      Change Procedure Type
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs>
                  Procedure Note
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-procedurenote"
                    label="ProcedureNote"
                    multiline={true}
                    sx={{ width: 600 }}
                    minRows={12}
                    maxRows={16}
                    //variant="standard"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectProcedureNote}
                    onChange={handleProcedureNoteChange}
                  />
                </Grid>
                <Grid item xs>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                      disableFuture
                      hideTabs
                      showTodayButton
                      todayText="now"
                      openTo="minutes"
                      inputFormat="dd/MM/yyyy HH:mm"
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                      components={{
                        LeftArrowIcon: AlarmIcon,
                        RightArrowIcon: SnoozeIcon,
                        OpenPickerIcon: ClockIcon,
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProcedureModal;
