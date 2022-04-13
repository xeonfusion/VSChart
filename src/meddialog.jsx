import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";

//import MomentUtils from "@date-io/moment";
import DateAdapter from "@mui/lab/AdapterDateFns";
import moment from "moment";
import Grid from "@mui/material/Grid";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

/*import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";*/
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AlarmIcon from "@mui/icons-material/Alarm";
import SnoozeIcon from "@mui/icons-material/Snooze";
import ClockIcon from "@mui/icons-material/AccessTime";

import {
  medGroups,
  medItems,
  doseunits,
  doseroutes,
  eventtimes,
  durations,
  addmeds,
  medtypes,
} from "./dataconstants.jsx";

const MedModal = ({
  showMedDialog,
  childState,
  selectedMeds,
  selectedItems,
  selectedItem,
  selectedGroup,
  selectedItemIndex,
  selectedGroupIndex,
  selectedDose,
  selectedUnit,
  selectedRoute,
  selectedItemTime,
  selectedDuration,
  selectedDurationUnit,
  selectedMedType,
  selectedEventItems,
  selectedEventItem,
  selectedEventItemIndex,
}) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    var finalallItems = handleAllItemsChange();
    var finalallGroups = handleAllGroupsChange();

    setShow(false);
    childState(
      false,
      finalallGroups,
      finalallItems,
      selectItem,
      selectGroup,
      selectItemIndex,
      selectGroupIndex,
      selectDose,
      selectUnit,
      selectRoute,
      selectedDate,
      selectDuration,
      selectDurationUnit,
      selectMedType
    );
  };

  const StyledListItem = ({
    itemcolor,
    itemtitle,
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
        onClick={() => handleMedListClick(itemindex)}
      >
        <ListItemText>{itemtitle}</ListItemText>
      </ListItem>
    );
  };

  const MedListItems = ({ list, itemselected }) => (
    <List
      dense={true}
      sx={{
        maxHeight: 300,
        maxWidth: 160,
        minWidth: 160,
        overflow: "scroll",
      }}
    >
      {(list || []).map((listitem, index) => (
        <StyledListItem
          itemcolor={listitem.color}
          itemtitle={listitem.title}
          itemindex={listitem.id}
          itemselected={
            typeof itemselected[0] === "undefined"
              ? false
              : itemselected[0].group === listitem.id
              ? true
              : false
          }
        ></StyledListItem>
      ))}
    </List>
  );

  //const [allGroups, setAllGroups] = React.useState(medGroups);
  //const [allItems, setAllItems] = React.useState(medItems);
  const [allGroups, setAllGroups] = React.useState(selectedMeds);
  const [allItems, setAllItems] = React.useState(selectedItems);
  //const [selectGroup, setSelGroup] = React.useState(medGroups[0]);
  const [selectGroup, setSelGroup] = React.useState(selectedGroup);
  //const [selectItem, setSelItem] = React.useState(medItems[0]);
  const [selectItem, setSelItem] = React.useState(selectedItem);
  const [selectItemIndex, setSelItemIndex] = React.useState(selectedItemIndex);
  const [selectGroupIndex, setSelGroupIndex] =
    React.useState(selectedGroupIndex);
  const [selectDose, setSelDose] = React.useState(0);
  const [selectUnit, setSelUnit] = React.useState(doseunits[0]);
  const [selectRoute, setSelRoute] = React.useState(doseroutes[0]);
  const [selectDurationUnit, setSelDurationUnit] = React.useState(durations[0]);
  //const [selectEvent, setSelEvent] = React.useState(eventtimes[4]);
  const [alleventitems, setSelEventItems] = React.useState(selectedEventItems);
  const [selectEvent, setSelEvent] = React.useState(selectedEventItem);
  const [selectDuration, setSelDuration] = React.useState(0);
  const [selectAddMeds, setSelAddMeds] = React.useState("");
  const [selectAddMedsList, setSelAddMedsList] = React.useState(medGroups);
  const [selectMedType, setSelMedType] = React.useState(medtypes[0]);
  const [selectedDate, setSelDateChange] = React.useState(moment());

  const filter = createFilterOptions();

  React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setAllGroups(selectedMeds);
    setAllItems(selectedItems);
  }, []);

  React.useEffect(() => {
    setSelGroup(selectedGroup);
    setSelGroupIndex(selectedGroupIndex);
    setSelItem(selectedItem);
    setSelItemIndex(selectedItemIndex);

    setSelDose(selectedDose);
    setSelUnit(selectedUnit);
    setSelRoute(selectedRoute);
    setSelDurationUnit(selectedDurationUnit);
    setSelDuration(selectedDuration);
    setSelMedType(selectedMedType);
    setSelEventItems(selectedEventItems);
    setSelEvent(selectedEventItem);
    setSelDateChange(selectedItemTime);
    setShow(showMedDialog);
  }, [
    selectedGroup,
    selectedItem,
    selectedGroupIndex,
    selectedItemIndex,
    selectedDose,
    selectedUnit,
    selectedRoute,
    selectedDuration,
    selectedDurationUnit,
    selectedMedType,
    selectedEventItems,
    selectedEventItem,
    selectedItemTime,
    showMedDialog,
  ]);

  const handleMedListClick = (index) => {
    handleAllItemsChange();
    handleAllGroupsChange();
    if (index === 0) return;
    handleMedListItemClick(index);
  };

  const handleMedListItemClick = (index) => {
    var group = allGroups.filter((e) => e.id === index).map((group) => group);
    var items = allItems.filter((e) => e.group === index).map((item) => item);

    if (items[0] === null || items[0] === undefined) {
      handleAddMedDoseAtIndex(index, group);
      return;
    }

    //select last item
    var item = items.slice(-1);

    setSelGroup(group);
    setSelItem(item);

    setSelItemIndex(item[0].id);
    setSelGroupIndex(index);

    //console.log(allGroups);
    //console.log(allItems);
    //console.log(group);
    //console.log(items);
    //console.log(item);

    handleGetSelItemDetail(item, group);
  };

  const handleAllItemsChange = () => {
    if (selectItemIndex !== 0) {
      var itemId = selectItem[0].id;
      //console.log(itemId);
      //console.log(selectItemIndex);

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
      return items;
    } else return selectedItems;
  };

  const handleAllGroupsChange = () => {
    if (selectGroupIndex !== 0) {
      var groupId = selectGroupIndex;

      var groupcolor = medtypes
        .filter((e) => e.type === selectGroup[0].type)
        .map((group) => group.color);

      var groups = allGroups.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              title: selectGroup[0].title,
              unit: selectGroup[0].unit,
              route: selectGroup[0].route,
              durationunit: selectGroup[0].durationunit,
              type: selectGroup[0].type,
              color: groupcolor,
            })
          : group
      );
      setAllGroups(groups);
      return groups;
    } else return selectedMeds;
  };

  const handleDoseChange = (event) => {
    if (selectItemIndex !== 0) {
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
    }
  };

  const handleDurationChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelDuration(event.target.value);

      var itemId = selectItem[0].id;
      var start_time = moment(selectItem[0].start_time);
      var durationunit = convertDurationUnit(selectDurationUnit);
      var duration = moment.duration().add(event.target.value, durationunit);
      var end_time = moment(start_time).add(duration);

      var item = selectItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: start_time,
              end_time: end_time,
            })
          : item
      );
      setSelItem(item);
    }
  };

  const convertDurationUnit = (duration) => {
    var durationconverted;
    switch (duration) {
      case "bolus (sec)":
        durationconverted = "s";
        break;
      case "bolus (min)":
        durationconverted = "m";
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

  const handleDateChange = (value) => {
    if (selectItemIndex !== 0) {
      setSelDateChange(value);

      var itemId = selectItem[0].id;
      var start_time = moment(selectItem[0].start_time);
      var end_time = moment(selectItem[0].end_time);
      var duration = moment.duration(end_time.diff(start_time));

      var final_start_time = moment(value);
      var final_end_time = moment(value).add(duration);

      var item = selectItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: final_start_time,
              end_time: final_end_time,
            })
          : item
      );
      setSelItem(item);
    }
  };

  const handleUnitChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelUnit(event.target.value);

      var groupId = selectGroup[0].id;

      var group = selectGroup.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              unit: event.target.value,
            })
          : group
      );
      setSelGroup(group);
    }
  };

  const handleMedTypeChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelMedType(event.target.value);

      var groupId = selectGroup[0].id;

      var group = selectGroup.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              type: event.target.value,
            })
          : group
      );
      setSelGroup(group);
    }
  };

  const handleRouteChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelRoute(event.target.value);
    }
  };

  const handleDurationUnitChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelDurationUnit(event.target.value);
      var groupId = selectGroup[0].id;

      var group = selectGroup.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              durationunit: event.target.value,
            })
          : group
      );
      setSelGroup(group);
    }
  };

  const handleEventChange = (event) => {
    if (selectItemIndex !== 0) {
    setSelEvent(event.target.value);
    }
  };

  const handleMedSelChange = (event, value) => {
    if (typeof value === "string") {
      setSelAddMeds({
        title: value,
      });
    } else if (value && value.inputValue) {
      setSelAddMeds({
        title: value.inputValue,
      });

      const newgroup = [
        {
          id: allGroups.length + 1,
          title: value.inputValue,
          unit: "mg",
          route: "Intravenous",
          durationunit: "bolus (sec)",
          type: "Other",
          color: "white",
        },
      ];

      var addmedlist = selectAddMedsList.map((group) => group);
      addmedlist.push(newgroup[0]);
      setSelAddMedsList(addmedlist);
    } else {
      setSelAddMeds(value);
    }
  };

  const handleGetSelItemDetail = (selitem, selgroup) => {
    var dose = parseFloat(selitem[0].title);
    var unit = selgroup[0].unit;
    var route = selgroup[0].route;
    var start_time = selitem[0].start_time;
    var end_time = selitem[0].end_time;
    var duration = end_time.diff(start_time, "seconds");
    var durationunit = selgroup[0].durationunit;
    var medtype = selgroup[0].type;

    setSelDose(dose);
    setSelUnit(unit);
    setSelRoute(route);
    setSelDateChange(start_time);
    setSelDuration(duration);
    setSelDurationUnit(durationunit);
    setSelMedType(medtype);
  };

  const handleAddMeds = () => {
    if (selectAddMeds !== "") {
      var selgroup = selectAddMedsList
        .filter((e) => e.title === selectAddMeds.title)
        .map((group) => group);

      var selgroupindex = allGroups.length + 1;
      selgroup[0].id = selgroupindex;

      //console.log(selgroup);

      allGroups.push(selgroup[0]);

      var selitemindex = allItems.length + 1;

      const item = [
        {
          id: selitemindex,
          group: selgroupindex,
          title: "0",
          start_time: moment().add(0, "m"),
          end_time: moment().add(0.5, "m"),
        },
      ];

      //console.log(item);

      allItems.push(item[0]);

      var finalgroups = allGroups.map((group, index) =>
        Object.assign({}, group, {
          id: index + 1,
        })
      );

      var finalitems = allItems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      //console.log(selgroupindex);
      //console.log(selitemindex);

      var finalgroup = finalgroups.filter((e) => e.id === selgroupindex);
      setSelGroup(finalgroup);
      setSelGroupIndex(selgroupindex);

      var finalitem = finalitems.filter((e) => e.id === selitemindex);
      setSelItem(finalitem);
      setSelItemIndex(selitemindex);

      setAllGroups(finalgroups);
      setAllItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      //console.log(selectedItem);
      handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handleAddMedDoseAtIndex = (index, group) => {
    //if (selectOutputGroupIndex !== 0) {
    var selgroupindex = index;

    //console.log(selgroupindex);

    var selitemindex = allItems.length + 1;

    const item = [
      {
        id: selitemindex,
        group: selgroupindex,
        title: "0",
        start_time: moment().add(0, "m"),
        end_time: moment().clone().add(0.5, "m"),
      },
    ];

    allItems.push(item[0]);

    var finalitems = allItems.map((item, index) =>
      Object.assign({}, item, {
        id: index + 1,
      })
    );

    //console.log(finalitems)
    var finalitem = finalitems.filter((e) => e.id === selitemindex);
    setSelItem(finalitem);
    setSelItemIndex(selitemindex);

    setAllItems(finalitems);

    setSelGroup(group);
    setSelGroupIndex(selgroupindex);

    handleGetSelItemDetail(finalitem, group);
    //return finalitems;
    //}
  };

  const handleAddMedDose = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      //console.log(selgroupindex);

      var selitemindex = allItems.length + 1;

      const item = [
        {
          id: selitemindex,
          group: selgroupindex,
          title: "0",
          start_time: moment().add(0, "m"),
          end_time: moment().clone().add(0.5, "m"),
        },
      ];

      allItems.push(item[0]);

      var finalitems = allItems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finalitem = finalitems.filter((e) => e.id === selitemindex);
      setSelItem(finalitem);
      setSelItemIndex(selitemindex);

      setAllItems(finalitems);
    }
  };

  const handleRemoveMeds = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      var selgroups = allGroups
        .filter((e) => e.id !== selgroupindex)
        .map((groups) => groups);
      //console.log(selgroups);

      var selitems = allItems
        .filter((e) => e.group !== selgroupindex)
        .map((items) => items);
      //console.log(selitems);

      //var selitemindex = selectItem[0].id;

      var finalgroups = selgroups.map((group, index) =>
        Object.assign({}, group, {
          oldid: group.id,
          id: index + 1,
        })
      );

      var finalitems = selitems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
          group: finalgroups.find((e) => e.oldid === item.group).id,
        })
      );

      var finalgroupindex = 0;
      switch (selgroupindex) {
        case 1:
          if (selgroups.length > 0) finalgroupindex = selgroups.length;
          break;
        default:
          finalgroupindex = selgroupindex - 1;
      }

      var finalgroup = finalgroups.filter((e) => e.id === finalgroupindex);
      setSelGroup(finalgroup);
      setSelGroupIndex(finalgroupindex);

      var finalitem = finalitems.filter((e) => e.group === finalgroupindex);
      setSelItem(finalitem);
      setSelItemIndex(finalitem.id);

      setAllGroups(finalgroups);
      setAllItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      if (finalgroupindex !== 0) handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handleRemoveMedDose = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      var items = allItems
        .filter((e) => e.group === selgroupindex)
        .map((items) => items);
      //console.log(items);

      if (items.length === 1) {
        handleRemoveMeds();
        return;
      }

      var item = items.filter((e) => e.id === selectItem[0].id);

      var selitems = allItems
        .filter((e) => e.id !== item[0].id)
        .map((items) => items);
      //console.log(selitems);

      var finalgroups = allGroups.map((group, index) =>
        Object.assign({}, group, {
          oldid: group.id,
          id: index + 1,
        })
      );

      var finalitems = selitems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
          group: finalgroups.find((e) => e.oldid === item.group).id,
        })
      );

      var finalgroup = finalgroups.filter((e) => e.id === selgroupindex);
      setSelGroup(finalgroup);
      setSelGroupIndex(selgroupindex);

      var finalitem = finalitems.filter((e) => e.group === selgroupindex);
      setSelItem(finalitem);
      setSelItemIndex(finalitem.id);

      setAllGroups(finalgroups);
      setAllItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  function arraymove(array, oldIndex, newIndex) {
    if (newIndex >= array.length) {
      newIndex = array.length - 1;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }
  const handleUpMeds = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      var finalgroupindex = 0;
      switch (selgroupindex) {
        case 1:
          if (allGroups.length > 0) finalgroupindex = allGroups.length;
          break;
        default:
          finalgroupindex = selgroupindex - 1;
      }

      var selgroups = allGroups.map((groups) => groups);

      arraymove(selgroups, selgroupindex - 1, finalgroupindex - 1);
      //console.log(selgroups);

      var selitems = allItems.map((items) => items);

      var finalgroups = selgroups.map((group, index) =>
        Object.assign({}, group, {
          oldid: group.id,
          id: index + 1,
        })
      );

      var finalitems = selitems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
          group: finalgroups.find((e) => e.oldid === item.group).id,
        })
      );

      var finalgroup = finalgroups.filter((e) => e.id === finalgroupindex);
      setSelGroup(finalgroup);
      setSelGroupIndex(finalgroupindex);

      var finalitem = finalitems.filter((e) => e.group === finalgroupindex);
      setSelItem(finalitem);
      setSelItemIndex(finalitem.id);

      setAllGroups(finalgroups);
      setAllItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      if (finalgroupindex !== 0) handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handleDownMeds = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      var finalgroupindex = 0;
      switch (selgroupindex) {
        case allGroups.length:
          if (allGroups.length > 0) finalgroupindex = 1;
          break;
        default:
          finalgroupindex = selgroupindex + 1;
      }

      var selgroups = allGroups.map((groups) => groups);

      arraymove(selgroups, selgroupindex - 1, finalgroupindex - 1);
      //console.log(selgroups);

      var selitems = allItems.map((items) => items);

      var finalgroups = selgroups.map((group, index) =>
        Object.assign({}, group, {
          oldid: group.id,
          id: index + 1,
        })
      );

      var finalitems = selitems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
          group: finalgroups.find((e) => e.oldid === item.group).id,
        })
      );

      var finalgroup = finalgroups.filter((e) => e.id === finalgroupindex);
      setSelGroup(finalgroup);
      setSelGroupIndex(finalgroupindex);

      var finalitem = finalitems.filter((e) => e.group === finalgroupindex);
      setSelItem(finalitem);
      setSelItemIndex(finalitem.id);

      setAllGroups(finalgroups);
      setAllItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      if (finalgroupindex !== 0) handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handlePreviousDose = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      var items = allItems
        .filter((e) => e.group === selgroupindex)
        .map((items) => items);

      var item = items.filter((e) => e.id === selectItem[0].id);
      var itemindex = items.indexOf(item[0]);
      //console.log(items);
      //console.log(item);
      //console.log(itemindex);

      var group = allGroups
        .filter((e) => e.id === selgroupindex)
        .map((group) => group);

      //select previous item
      var previousitem;
      if (itemindex === 0) previousitem = items.slice(-1);
      else previousitem = items.slice(itemindex - 1, itemindex);
      //console.log(previousitem);

      setSelGroup(group);
      setSelItem(previousitem);

      setSelItemIndex(previousitem.id);
      setSelGroupIndex(selgroupindex);

      handleGetSelItemDetail(previousitem, group);
    }
  };

  const handleNextDose = () => {
    if (selectGroupIndex !== 0) {
      var selgroupindex = selectGroup[0].id;

      var items = allItems
        .filter((e) => e.group === selgroupindex)
        .map((items) => items);

      var item = items.filter((e) => e.id === selectItem[0].id);
      var itemindex = items.indexOf(item[0]);
      //console.log(items);
      //console.log(item);
      //console.log(itemindex);

      var group = allGroups
        .filter((e) => e.id === selgroupindex)
        .map((group) => group);

      //select next item
      var nextitem;
      if (itemindex === items.length - 1) nextitem = items.slice(0, 1);
      else nextitem = items.slice(itemindex + 1, itemindex + 2);
      //console.log(nextitem);

      setSelGroup(group);
      setSelItem(nextitem);

      setSelItemIndex(nextitem.id);
      setSelGroupIndex(selgroupindex);

      handleGetSelItemDetail(nextitem, group);
    }
  };

  const handleGetEventTime = () => {
    if (selectEvent !== null || selectEvent !== undefined) {
      handleDateChange(selectEvent.start_time);
    }
  };

  const handleGetCurrentTime = () => {
    handleDateChange(moment());
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
                  Medications
                  <MedListItems list={allGroups} itemselected={selectItem} />
                </Grid>
                <Grid item xs>
                  Add Medication
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    id="Add-entry"
                    options={addmeds}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      // Add option created dynamically
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.title;
                    }}
                    sx={{
                      minWidth: "160px",
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      if (params.inputValue !== "") {
                        filtered.push({
                          inputValue: params.inputValue,
                          title: `Add "${params.inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    onChange={handleMedSelChange}
                    renderOption={(props, option) => (
                      <li {...props}>{option.title}</li>
                    )}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Add/Remove Meds">
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleAddMeds}
                    >
                      Add Meds
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleRemoveMeds}
                    >
                      Remove Meds
                    </Button>
                  </ButtonGroup>
                  <Grid item xs>
                    <ButtonGroup aria-label="Up/Down Meds">
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          maxWidth: "80px",
                        }}
                        onClick={handleUpMeds}
                      >
                        Shift Up
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          maxWidth: "80px",
                        }}
                        onClick={handleDownMeds}
                      >
                        Shift Down
                      </Button>
                    </ButtonGroup>
                  </Grid>
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
                    //variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectDose}
                    onChange={handleDoseChange}
                    fullWidth
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
                    //variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={0}
                    value={selectDuration}
                    onChange={handleDurationChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs>
                  Select Doses
                  <ButtonGroup aria-label="Last doses">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handlePreviousDose}
                    >
                      Previous Dose
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleNextDose}
                    >
                      Next Dose
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  Add/Remove Doses
                  <ButtonGroup aria-label="Add/Remove doses">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleAddMedDose}
                    >
                      Add Doses
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleRemoveMedDose}
                    >
                      Remove Doses
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
                alignItems="stretch"
              >
                <Grid item xs>
                  Dose unit
                </Grid>
                <Grid item xs>
                  <Select
                    id="dose-unit"
                    labelId="Dose unit"
                    //variant="outlined"
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
                    //variant="outlined"
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
                  Event times
                  <Select
                    id="event-timing"
                    labelId="Event timing"
                    variant="outlined"
                    fullWidth
                    helpertext="Get Event timing"
                    defaultValue={""}
                    value={selectEvent}
                    onChange={handleEventChange}
                  >
                    {alleventitems.map((item) => (
                      <MenuItem value={item}>
                        {item.title + " " + item.start_time.format("HH:mm")}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs>
                  Get Timestamp From
                  <ButtonGroup aria-label="Get Timestamp">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleGetEventTime}
                    >
                      Event Time
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleGetCurrentTime}
                    >
                      Current Time
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
                alignItems="stretch"
              >
                <Grid item xs>
                  Route
                </Grid>
                <Grid item xs>
                  <Select
                    id="route"
                    labelId="Route"
                    //variant="outlined"
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
                  Medication type
                </Grid>
                <Grid item xs>
                  <Select
                    id="med-type"
                    labelId="Medication type"
                    //variant="outlined"
                    fullWidth
                    defaultValue={medtypes[0]}
                    value={selectMedType}
                    onChange={handleMedTypeChange}
                  >
                    {medtypes.map((item) => (
                      <MenuItem value={item.type}>{item.type}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs>
                  Timestamp
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

export default MedModal;
