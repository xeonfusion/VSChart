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
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

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
  selectedMedType,
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

  const medGroups = [
    {
      id: 1,
      title: "Propofol",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "InductionAgent",
      color: "yellow",
    },
    {
      id: 2,
      title: "Fentanyl",
      unit: "mcg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Opioid",
      color: "deepskyblue",
    },
    {
      id: 3,
      title: "Lidocaine",
      unit: "mg",
      route: "Subcutaneous",
      durationunit: "bolus (sec)",
      type: "LocalAnaesthetic",
      color: "grey",
    },
    {
      id: 4,
      title: "Rocuronium",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "MuscleRelaxant",
      color: "red",
    },
    {
      id: 5,
      title: "Ringers",
      unit: "ml/hr",
      route: "Intravenous",
      durationunit: "min",
      type: "IVfluid",
      color: "white",
    },
    {
      id: 6,
      title: "Midazolam",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Hypnotic",
      color: "orange",
    },
    {
      id: 6,
      title: "Suxamethonium",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "MuscleRelaxant",
      color: "red",
    },
    {
      id: 7,
      title: "Morphine",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Opioid",
      color: "deepskyblue",
    },
    {
      id: 8,
      title: "Cisatracurium",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "MuscleRelaxant",
      color: "red",
    },
    {
      id: 9,
      title: "Thiopentone",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "InductionAgent",
      color: "yellow",
    },
    {
      id: 10,
      title: "Saline 0.9%",
      unit: "ml/hr",
      route: "Intravenous",
      durationunit: "min",
      type: "IVfluid",
      color: "white",
    },
    {
      id: 11,
      title: "Glycopyrrolate",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Anticholinergic",
      color: "lawngreen",
    },
    {
      id: 12,
      title: "Ephedrine",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Vasopressor",
      color: "#debfd9",
    },
    {
      id: 13,
      title: "Ondansetron",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Antiemetic",
      color: "#edc282",
    },
    {
      id: 14,
      title: "Remifentanil",
      unit: "mcg/kg/min",
      route: "Intravenous",
      durationunit: "continuous",
      type: "Opioid",
      color: "deepskyblue",
    },
    {
      id: 15,
      title: "Ketamine",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "InductionAgent",
      color: "yellow",
    },
    {
      id: 16,
      title: "Dexmedetomidine",
      unit: "mcg/kg/hr",
      route: "Intravenous",
      durationunit: "continuous",
      type: "Other",
      color: "white",
    },
    {
      id: 17,
      title: "Phenylephrine",
      unit: "mcg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Vasopressor",
      color: "#debfd9",
    },
    {
      id: 18,
      title: "Sugammadex",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Other",
      color: "white",
    },
    {
      id: 19,
      title: "Neostigmine",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Other",
      color: "white",
    },
    {
      id: 20,
      title: "Dexamethasone",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Other",
      color: "white",
    },
    {
      id: 21,
      title: "Atropine",
      unit: "mg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Anticholinergic",
      color: "lawngreen",
    },
    {
      id: 22,
      title: "Norepinephrine",
      unit: "mcg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Vasopressor",
      color: "debfd9",
    },
    {
      id: 23,
      title: "Epinephrine",
      unit: "mcg",
      route: "Intravenous",
      durationunit: "bolus (sec)",
      type: "Vasopressor",
      color: "debfd9",
    },
  ];

  const medItems = [
    {
      id: 1,
      group: 1,
      title: "150",
      start_time: moment().add(0.5, "m"),
      end_time: moment().add(1, "m"),
      rightTitle: "",
    },
    {
      id: 2,
      group: 2,
      title: "75",
      start_time: moment().add(0, "m"),
      end_time: moment().add(0.5, "m"),
    },
    {
      id: 3,
      group: 3,
      title: "100",
      start_time: moment().add(0, "m"),
      end_time: moment().add(0.5, "m"),
    },
    {
      id: 4,
      group: 4,
      title: "50",
      start_time: moment().add(1, "m"),
      end_time: moment().add(1.5, "m"),
    },
    {
      id: 5,
      group: 5,
      title: "60",
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

  const doseunits = [
    "mg",
    "mcg",
    "mcg/kg/min",
    "ml/hr",
    "mg/kg/hr",
    "mcg/kg/hr",
    "mg/hr",
    "U",
    "U/hr",
    "%",
    "L/min",
  ];

  const doseroutes = [
    "Intravenous",
    "Subcutaneous",
    "Intramuscular",
    "Intranasal",
    "Endotracheal",
    "Topical",
    "Mucosal",
  ];

  const eventtimes = [
    "Equipment Check",
    "Patient In",
    "Anesthesia Start",
    "Preoxygenation",
    "Induction",
    "Intubation/SGA In",
    "Surgery Start",
    "Surgery Stop",
    "Emergence",
    "Extubation/SGA Out",
    "Patient Out",
    "Anaesthesia Stop",
    "Add Note",
    "Other",
  ];

  const durations = ["bolus (sec)", "min", "sec", "continuous"];

  const addmeds = [
    { title: "Atropine" },
    { title: "Cisatracurium" },
    { title: "Dexamethasone" },
    { title: "Dexmedetomidine" },
    { title: "Ephedrine" },
    { title: "Epinephrine" },
    { title: "Glycopyrrolate" },
    { title: "Ketamine" },
    { title: "Midazolam" },
    { title: "Morphine" },
    { title: "Nesotigmine" },
    { title: "Norepinephrine" },
    { title: "Ondansetron" },
    { title: "Phenylephrine" },
    { title: "Remifentanil" },
    { title: "Saline 0.9%" },
    { title: "Sugammadex" },
    { title: "Suxamethonium" },
    { title: "Thiopentone" },
  ];

  const medtypes = [
    { type: "Other", color: "white", pattern: "solid" },
    { type: "InductionAgent", color: "yellow", pattern: "solid" },
    { type: "Hypnotic", color: "orange", pattern: "solid" },
    { type: "IVfluid", color: "white", pattern: "solid" },
    { type: "Opioid", color: "deepskyblue", pattern: "solid" },
    { type: "LocalAnaesthetic", color: "grey", pattern: "solid" },
    { type: "MuscleRelaxant", color: "red", pattern: "solid" },
    { type: "Anticholinergic", color: "lawngreen", pattern: "solid" },
    { type: "Vasopressor", color: "#debfd9", pattern: "solid" },
    { type: "Antiemetic", color: "#edc282", pattern: "solid" },
    { type: "Vasodilators", color: "#debfd9", pattern: "striped" },
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
    <List
      dense={true}
      style={{
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
  const [selectEvent, setSelEvent] = React.useState(eventtimes[4]);
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
                    style={{
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
                    renderOption={(option) => option.title}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderInput={(params) => (
                      <TextField {...params} label="" variant="outlined" />
                    )}
                  />
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
                    variant="outlined"
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
                    variant="outlined"
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
                  Medication type
                </Grid>
                <Grid item xs>
                  <Select
                    id="med-type"
                    labelId="Medication type"
                    variant="outlined"
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
                <Grid item xs>
                  <Select
                    id="event-timing"
                    labelId="Event timing"
                    variant="outlined"
                    fullWidth
                    helpertext="Get Event timing"
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MedModal;
