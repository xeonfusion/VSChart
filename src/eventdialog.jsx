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

import { addevents } from "./dataconstants.jsx";

const EventModal = ({
  showEventDialog,
  childEventState,
  selectedEventItems,
  selectedEventItem,
  selectedEventItemIndex,
  selectedEventItemTime,
  selectedEventType,
  selectedEventNote,
}) => {
  const [showEvent, setEventShow] = React.useState(false);

  const handleClose = () => {
    var finalallEventItems = handleAllEventsChange();

    setEventShow(false);
    childEventState(
      false,
      finalallEventItems,
      selectEventItem,
      selectEventItemIndex,
      selectedDate,
      selectAddEvents,
      selectEventNote
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
        onClick={() => handleEventListClick(itemindex)}
        autoFocus={itemselected && selectListFocus ? true : false}
      >
        <ListItemText secondary={itemtime}>{itemtitle}</ListItemText>
      </ListItem>
    );
  };

  const EventListItems = ({ list, itemselected }) => (
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

  const [allEventItems, setAllEventItems] = React.useState(selectedEventItems);
  const [selectEventItem, setSelEventItem] = React.useState(selectedEventItem);
  const [selectEventItemIndex, setSelEventItemIndex] = React.useState(
    selectedEventItemIndex
  );
  const [selectAddEvents, setSelAddEvents] = React.useState("");
  const [selectedDate, setSelDateChange] = React.useState(new Date());
  const [selectEventNote, setSelEventNoteChange] = React.useState("");
  const [selectListFocus, setSelListFocus] = React.useState(false);

  React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setAllEventItems(selectedEventItems);
  }, []);

  React.useEffect(() => {
    setSelEventItem(selectedEventItem);
    setSelEventItemIndex(selectedEventItemIndex);
    setSelDateChange(selectedEventItemTime);
    setSelAddEvents(selectedEventType);
    setSelEventNoteChange(selectedEventNote);
    setEventShow(showEventDialog);
  }, [
    selectedEventItem,
    selectedEventItemIndex,
    selectedEventItemTime,
    selectedEventType,
    selectedEventNote,
    showEventDialog,
  ]);

  const handleDateChange = (value) => {
    if (selectEventItemIndex !== 0) {
      setSelDateChange(value);
      //console.log(selectEventItem[0]);

      var itemId = selectEventItem[0].id;
      var start_time = moment(selectEventItem[0].start_time);
      var end_time = moment(selectEventItem[0].end_time);
      var duration = moment.duration(end_time.diff(start_time));

      var final_start_time = moment(value);
      var final_end_time = moment(value).add(duration);

      var item = selectEventItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: final_start_time,
              end_time: final_end_time,
            })
          : item
      );
      //console.log(item);
      setSelEventItem(item);

      var items = allEventItems.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: final_start_time,
              end_time: final_end_time,
            })
          : item
      );
      setAllEventItems(items);
    }
  };

  const handleEventSelChange = (event) => {
    setSelAddEvents(event.target.value);
  };

  const handleAddEvents = () => {
    if (selectAddEvents !== "") {
      var seleventindex = allEventItems.length + 1;

      const item = [
        {
          id: seleventindex,
          group: 1,
          title: selectAddEvents,
          start_time: moment().add(0, "m"),
          end_time: moment().add(0.5, "m"),
        },
      ];

      allEventItems.push(item[0]);

      var finalitems = allEventItems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finalitem = finalitems.filter((e) => e.id === seleventindex);

      setSelEventItem(finalitem);
      setSelEventItemIndex(seleventindex);
      setAllEventItems(finalitems);

      handleGetSelEventDetail(finalitem);
      setSelListFocus(true);
    }
  };

  const handleGetSelEventDetail = (selevent) => {
    var start_time = selevent[0].start_time;
    setSelDateChange(start_time);
    var note = selevent[0].note;
    setSelEventNoteChange(note);
  };

  const handleRemoveEvents = () => {
    if (selectEventItemIndex !== 0) {
      var seleventindex = selectEventItem[0].id;

      var seleventitems = allEventItems
        .filter((e) => e.id !== seleventindex)
        .map((items) => items);

      var finalitems = seleventitems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finaleventindex = 0;
      switch (seleventindex) {
        case 1:
          if (seleventitems.length > 0) finaleventindex = seleventitems.length;
          break;
        default:
          finaleventindex = seleventindex - 1;
      }

      var finalitem = finalitems.filter((e) => e.id === finaleventindex);
      setSelEventItem(finalitem);
      setSelEventItemIndex(finalitem.id);

      setAllEventItems(finalitems);
      if (finaleventindex !== 0) handleGetSelEventDetail(finalitem);
      setSelListFocus(true);
    }
  };

  const handleNextEvent = () => {
    var seladdeventindex = addevents.findIndex((e) => e === selectAddEvents);

    var finaleventindex = 0;
    switch (seladdeventindex) {
      case addevents.length - 1:
        if (addevents.length > 0) finaleventindex = 0;
        break;
      case -1:
        if (addevents.length > 0) finaleventindex = 0;
        break;
      default:
        finaleventindex = seladdeventindex + 1;
    }

    var finalevent = addevents[finaleventindex];
    setSelAddEvents(finalevent);
  };

  const handlePreviousEvent = () => {
    var seladdeventindex = addevents.findIndex((e) => e === selectAddEvents);

    var finaleventindex = 0;
    switch (seladdeventindex) {
      case 0:
        if (addevents.length > 0) finaleventindex = addevents.length - 1;
        break;
      case -1:
        if (addevents.length > 0) finaleventindex = addevents.length - 1;
        break;
      default:
        finaleventindex = seladdeventindex - 1;
    }

    var finalevent = addevents[finaleventindex];
    setSelAddEvents(finalevent);
  };

  const handleChangeEventType = (event) => {
    if (selectEventItemIndex !== 0) {
      var seleventindex = selectEventItem[0].id;

      var finalitems = allEventItems.map((item, index) =>
        item.id === seleventindex
          ? Object.assign({}, item, {
              title: selectAddEvents,
            })
          : item
      );

      var finalitem = finalitems.filter((e) => e.id === seleventindex);

      setSelEventItem(finalitem);
      setSelEventItemIndex(seleventindex);
      setAllEventItems(finalitems);

      handleGetSelEventDetail(finalitem);
    }
  };

  const handleEventNoteChange = (event) => {
    if (selectEventItemIndex !== 0) {
      setSelEventNoteChange(event.target.value);

      var itemId = selectEventItem[0].id;

      var item = selectEventItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              note: event.target.value,
            })
          : item
      );
      //console.log(item);
      setSelListFocus(false);
      setSelEventItem(item);
    }
  };

  const handleAllEventsChange = () => {
    if (selectEventItemIndex !== 0) {
      var itemId = selectEventItem[0].id;
      //console.log(selectEventItem[0]);

      var items = allEventItems.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              title: selectEventItem[0].title,
              start_time: selectEventItem[0].start_time,
              end_time: selectEventItem[0].end_time,
              note: selectEventItem[0].note,
            })
          : item
      );
      setAllEventItems(items);
      return items;
    } else return selectedEventItems;
  };

  const handleEventListClick = (index) => {
    handleAllEventsChange();
    if (index === 0) return;
    var items = allEventItems.filter((e) => e.id === index).map((item) => item);
    var item = items.slice(-1);
    //console.log(allEventItems);
    //console.log(item);

    setSelEventItem(item);
    setSelEventItemIndex(item[0].id);
    setSelDateChange(item[0].start_time);
    setSelEventNoteChange(item[0].note);

    setSelListFocus(true);
  };

  return (
    <>
      <Dialog
        open={showEvent}
        onClose={() => {
          handleClose();
        }}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title-2">Add Event</DialogTitle>
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
                  Events
                  <EventListItems
                    list={allEventItems}
                    itemselected={selectEventItem}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="Add-entry"
                    select
                    label=""
                    helperText="Add Event"
                    variant="standard"
                    sx={{
                      minWidth: "200px",
                    }}
                    value={selectAddEvents}
                    onChange={handleEventSelChange}
                  >
                    {addevents.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Add/Remove Events">
                    <Button
                      size="medium"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handleAddEvents}
                    >
                      Add Events
                    </Button>
                    <Button
                      size="medium"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handleRemoveEvents}
                    >
                      Remove Events
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Browse Events">
                    <Button
                      size="medium"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handleNextEvent}
                    >
                      Next Event
                    </Button>
                    <Button
                      size="medium"
                      sx={{
                        maxWidth: "100px",
                      }}
                      onClick={handlePreviousEvent}
                    >
                      Previous Event
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Change Events">
                    <Button
                      size="large"
                      sx={{
                        maxWidth: "200px",
                      }}
                      onClick={handleChangeEventType}
                    >
                      Change Event Type
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
                  Event Note
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-eventnote"
                    label="EventNote"
                    multiline={true}
                    sx={{ width: 600 }}
                    minRows={12}
                    maxRows={16}
                    //variant="standard"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectEventNote}
                    onChange={handleEventNoteChange}
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

export default EventModal;
