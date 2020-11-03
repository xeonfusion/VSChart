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
  selectedItemIndex,
  selectedGroupIndex,
  selectedDose,
  selectedUnit,
  selectedRoute,
  selectedItemTime,
  selectedDuration,
  selectedDurationUnit,
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
      selectDurationUnit
    );
  };

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
    {
      id: 6,
      title: "Suxamethonium",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "nmbd",
      color: "red",
    },
    {
      id: 7,
      title: "Morphine",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "opioid",
      color: "deepskyblue",
    },
    {
      id: 8,
      title: "Cisatracurium",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "nmbd",
      color: "red",
    },
    {
      id: 9,
      title: "Thiopentone",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "hypnotic",
      color: "yellow",
    },
    {
      id: 10,
      title: "Saline 0.9%",
      unit: "ml/hr",
      route: "Intravenous",
      durationunit: "min",
      type: "ivfluid",
      color: "white",
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

  const medItem = [
    {
      id: 1,
      group: 1,
      title: "",
      start_time: moment().add(0.5, "m"),
      end_time: moment().add(1, "m"),
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

  const addmeds = [
    "Midazolam",
    "Suxamethonium",
    "Morphine",
    "Cisatracurium",
    "Thiopentone",
    "Saline 0.9%",
  ];

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
    <List dense={true}>
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
  const [selectGroupIndex, setSelGroupIndex] = React.useState(
    selectedGroupIndex
  );
  const [selectDose, setSelDose] = React.useState(0);
  const [selectUnit, setSelUnit] = React.useState(doseunits[0]);
  const [selectRoute, setSelRoute] = React.useState(doseroutes[0]);
  const [selectDurationUnit, setSelDurationUnit] = React.useState(durations[0]);
  const [selectEvent, setSelEvent] = React.useState(eventtimes[0]);
  const [selectDuration, setSelDuration] = React.useState(0);
  const [selectAddMeds, setSelAddMeds] = React.useState("");
  const [selectedDate, setSelDateChange] = React.useState(new Date());

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

    //select last item
    var item = items.slice(-1);

    setSelGroup(group);
    setSelItem(item);

    setSelItemIndex(item.id);
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
      //console.log(selectGroupIndex);

      var groups = allGroups.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              title: selectGroup[0].title,
              unit: selectGroup[0].unit,
              route: selectGroup[0].route,
              durationunit: selectGroup[0].durationunit,
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

  const handleRouteChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelRoute(event.target.value);
    }
  };

  const handleDurationUnitChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelDurationUnit(event.target.value);
    }
  };

  const handleEventChange = (event) => {
    if (selectItemIndex !== 0) {
      setSelEvent(event.target.value);
    }
  };

  const handleMedSelChange = (event) => {
    setSelAddMeds(event.target.value);
  };

  const handleGetSelItemDetail = (selitem, selgroup) => {
    var dose = parseInt(selitem[0].title);
    var unit = selgroup[0].unit;
    var route = selgroup[0].route;
    var start_time = selitem[0].start_time;
    var end_time = selitem[0].end_time;
    var duration = end_time.diff(start_time, "seconds");
    var durationunit = selgroup[0].durationunit;

    setSelDose(dose);
    setSelUnit(unit);
    setSelRoute(route);
    setSelDateChange(start_time);
    setSelDuration(duration);
    setSelDurationUnit(durationunit);
  };

  const handleAddMeds = () => {
    if (selectAddMeds !== "") {
      var selgroup = medGroups
        .filter((e) => e.title === selectAddMeds)
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
                justify="flex-start"
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
                  <TextField
                    id="Add-entry"
                    select
                    label=""
                    helperText="Add Medication"
                    variant="outlined"
                    style={{
                      minWidth: "160px",
                    }}
                    onChange={handleMedSelChange}
                  >
                    {addmeds.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs>
                  <ButtonGroup aria-label="Add/Remove Meds">
                    <Button
                      variant="outlined"
                      color="default"
                      size="large"
                      style={{
                        maxWidth: "80px",
                      }}
                      onClick={handleAddMeds}
                    >
                      Add Meds
                    </Button>
                    <Button
                      variant="outlined"
                      color="default"
                      size="large"
                      style={{
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
                        color="default"
                        size="large"
                        style={{
                          maxWidth: "80px",
                        }}
                        onClick={handleUpMeds}
                      >
                        Shift Up
                      </Button>
                      <Button
                        variant="outlined"
                        color="default"
                        size="large"
                        style={{
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
                justify="flex-start"
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
                  Select Doses
                  <ButtonGroup aria-label="Last doses">
                    <Button
                      variant="outlined"
                      color="default"
                      size="small"
                      style={{
                        maxWidth: "80px",
                      }}
                      onClick={handlePreviousDose}
                    >
                      Previous Dose
                    </Button>
                    <Button
                      variant="outlined"
                      color="default"
                      size="small"
                      style={{
                        maxWidth: "80px",
                      }}
                      onClick={handleNextDose}
                    >
                      Next Dose
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
                <Grid items xs>
                  Add/Remove Doses
                  <ButtonGroup aria-label="Add/Remove doses">
                    <Button
                      variant="outlined"
                      color="default"
                      size="small"
                      style={{
                        maxWidth: "80px",
                      }}
                      onClick={handleAddMedDose}
                    >
                      Add Doses
                    </Button>
                    <Button
                      variant="outlined"
                      color="default"
                      size="small"
                      style={{
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
