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

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AlarmIcon from "@mui/icons-material/Alarm";
import SnoozeIcon from "@mui/icons-material/Snooze";
import ClockIcon from "@mui/icons-material/AccessTime";

import {
  addoutputs,
  outputunits,
  outputdurations,
  outputGroups,
} from "./dataconstants.jsx";

const OutputModal = ({
  showOutputDialog,
  childOutputState,
  selectedOutputs,
  selectedOutputItems,
  selectedOutputItem,
  selectedOutputGroup,
  selectedOutputItemIndex,
  selectedOutputGroupIndex,
  selectedOutputValue,
  selectedOutputUnit,
  selectedOutputItemTime,
  selectedDuration,
  selectedDurationUnit,
}) => {
  const [showOutput, setOutputShow] = React.useState(false);

  const handleClose = () => {
    var finalallOutputItems = handleAllOutputItemsChange();
    var finalallOutputGroups = handleAllOutputGroupsChange();

    setOutputShow(false);
    childOutputState(
      false,
      finalallOutputGroups,
      finalallOutputItems,
      selectOutputItem,
      selectOutputItemIndex,
      selectedDate,
      selectOutputGroup,
      selectOutputGroupIndex,
      selectOutputValue,
      selectOutputUnit,
      selectDuration,
      selectDurationUnit
    );
  };

  const [allOutputGroups, setAllOutputGroups] = React.useState(selectedOutputs);
  const [allOutputItems, setAllOutputItems] =
    React.useState(selectedOutputItems);
  const [selectOutputGroup, setSelOutputGroup] =
    React.useState(selectedOutputGroup);
  const [selectOutputItem, setSelOutputItem] =
    React.useState(selectedOutputItem);
  const [selectOutputItemIndex, setSelOutputItemIndex] = React.useState(
    selectedOutputItemIndex
  );
  const [selectOutputGroupIndex, setSelOutputGroupIndex] = React.useState(
    selectedOutputGroupIndex
  );

  const [selectOutputValue, setSelOutputValue] = React.useState(0);
  const [selectOutputUnit, setSelOutputUnit] = React.useState(outputunits[0]);
  const [selectDurationUnit, setSelDurationUnit] = React.useState(
    outputdurations[0]
  );
  const [selectDuration, setSelDuration] = React.useState(0);
  const [selectAddOutputs, setSelAddOutputs] = React.useState("");
  const [selectAddOutputsList, setSelAddOutputsList] =
    React.useState(outputGroups);
  const [selectedDate, setSelDateChange] = React.useState(moment());

  const filter = createFilterOptions();

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
        onClick={() => handleOutputListClick(itemindex)}
      >
        <ListItemText>{itemtitle}</ListItemText>
      </ListItem>
    );
  };

  const OutputListItems = ({ list, itemselected }) => (
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
          itemcolor={index % 2 ? "#ffffff" : "#dbe7f4"}
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

  React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setAllOutputGroups(selectedOutputs);
    setAllOutputItems(selectedOutputItems);
  }, []);

  React.useEffect(() => {
    setSelOutputGroup(selectedOutputGroup);
    setSelOutputGroupIndex(selectedOutputGroupIndex);
    setSelOutputItem(selectedOutputItem);
    setSelOutputItemIndex(selectedOutputItemIndex);
    setSelDateChange(selectedOutputItemTime);

    setSelOutputValue(selectedOutputValue);
    setSelOutputUnit(selectedOutputUnit);
    setSelDuration(selectedDuration);
    setSelDurationUnit(selectedDurationUnit);
    setOutputShow(showOutputDialog);
  }, [
    selectedOutputGroup,
    selectedOutputGroupIndex,
    selectedOutputItem,
    selectedOutputItemIndex,
    selectedOutputItemTime,
    selectedOutputValue,
    selectedOutputUnit,
    selectedDuration,
    selectedDurationUnit,
    showOutputDialog,
  ]);

  const handleAddOutputs = () => {
    if (selectAddOutputs !== "") {
      var selgroup = selectAddOutputsList
        .filter((e) => e.title === selectAddOutputs.title)
        .map((group) => group);

      var selgroupindex = allOutputGroups.length + 1;
      selgroup[0].id = selgroupindex;

      allOutputGroups.push(selgroup[0]);

      var selitemindex = allOutputItems.length + 1;

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

      allOutputItems.push(item[0]);

      var finalgroups = allOutputGroups.map((group, index) =>
        Object.assign({}, group, {
          id: index + 1,
        })
      );

      var finalitems = allOutputItems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finalgroup = finalgroups.filter((e) => e.id === selgroupindex);
      setSelOutputGroup(finalgroup);
      setSelOutputGroupIndex(selgroupindex);

      var finalitem = finalitems.filter((e) => e.id === selitemindex);
      setSelOutputItem(finalitem);
      setSelOutputItemIndex(selitemindex);

      setAllOutputGroups(finalgroups);
      setAllOutputItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      //console.log(selectedItem);
      handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handleRemoveOutputs = () => {
    if (selectOutputGroupIndex !== 0) {
      var selgroupindex = selectOutputGroup[0].id;

      var selgroups = allOutputGroups
        .filter((e) => e.id !== selgroupindex)
        .map((groups) => groups);
      //console.log(selgroups);

      var selitems = allOutputItems
        .filter((e) => e.group !== selgroupindex)
        .map((items) => items);
      //console.log(selitems);

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
      setSelOutputGroup(finalgroup);
      setSelOutputGroupIndex(finalgroupindex);

      var finalitem = finalitems.filter((e) => e.group === finalgroupindex);
      setSelOutputItem(finalitem);
      setSelOutputItemIndex(finalitem.id);

      setAllOutputGroups(finalgroups);
      setAllOutputItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      if (finalgroupindex !== 0) handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handleDateChange = (value) => {
    if (selectOutputItemIndex !== 0) {
      setSelDateChange(value);

      var itemId = selectOutputItem[0].id;
      var start_time = moment(selectOutputItem[0].start_time);
      var end_time = moment(selectOutputItem[0].end_time);
      var duration = moment.duration(end_time.diff(start_time));

      var final_start_time = moment(value);
      var final_end_time = moment(value).add(duration);

      var item = selectOutputItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: final_start_time,
              end_time: final_end_time,
            })
          : item
      );
      setSelOutputItem(item);
    }
  };

  const handleOutputListClick = (index) => {
    handleAllOutputItemsChange();
    handleAllOutputGroupsChange();
    if (index === 0) return;
    handleOutputListItemClick(index);
  };

  const handleOutputListItemClick = (index) => {
    var group = allOutputGroups
      .filter((e) => e.id === index)
      .map((group) => group);
    var items = allOutputItems
      .filter((e) => e.group === index)
      .map((item) => item);

    if (items[0] === null || items[0] === undefined) {
      handleAddOutputAtIndex(index, group);
      return;
    }

    //select last item
    var item = items.slice(-1);

    setSelOutputGroup(group);
    setSelOutputItem(item);

    setSelOutputItemIndex(item[0].id);
    setSelOutputGroupIndex(index);

    //console.log(allOutputGroups);
    //console.log(allOutputItems);
    //console.log(group);
    //console.log(items);
    //console.log(item);

    handleGetSelItemDetail(item, group);
  };

  const handleGetSelItemDetail = (selitem, selgroup) => {
    var value = parseFloat(selitem[0].title);
    var unit = selgroup[0].unit;
    var start_time = selitem[0].start_time;
    var end_time = selitem[0].end_time;
    var duration = end_time.diff(start_time, "m");
    var durationunit = selgroup[0].durationunit;

    setSelOutputValue(value);
    setSelOutputUnit(unit);
    setSelDateChange(start_time);
    setSelDuration(duration);
    setSelDurationUnit(durationunit);
  };

  const handleOutputSelChange = (event, value) => {
    if (typeof value === "string") {
      setSelAddOutputs({
        title: value,
      });
    } else if (value && value.inputValue) {
      setSelAddOutputs({
        title: value.inputValue,
      });

      const newgroup = [
        {
          id: allOutputGroups.length + 1,
          title: value.inputValue,
          unit: "ml",
          durationunit: "min",
        },
      ];

      var addOutputlist = selectAddOutputsList.map((group) => group);
      addOutputlist.push(newgroup[0]);
      setSelAddOutputsList(addOutputlist);
    } else {
      setSelAddOutputs(value);
    }
  };

  const handleOutputChange = (event) => {
    if (selectOutputItemIndex !== 0) {
      setSelOutputValue(event.target.value);

      var itemId = selectOutputItem[0].id;

      var item = selectOutputItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              title: event.target.value,
            })
          : item
      );
      setSelOutputItem(item);
      //console.log(item);
    }
  };

  const convertDurationUnit = (duration) => {
    var durationconverted;
    switch (duration) {
      case "sec":
        durationconverted = "s";
        break;
      case "min":
        durationconverted = "m";
        break;
      default:
        durationconverted = "m";
        break;
    }
    return durationconverted;
  };

  const handleDurationChange = (event) => {
    if (selectOutputItemIndex !== 0) {
      setSelDuration(event.target.value);

      var itemId = selectOutputItem[0].id;
      var start_time = moment(selectOutputItem[0].start_time);
      var durationunit = convertDurationUnit(selectDurationUnit);
      var duration = moment.duration().add(event.target.value, durationunit);
      var end_time = moment(start_time).add(duration);

      var item = selectOutputItem.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: start_time,
              end_time: end_time,
            })
          : item
      );
      setSelOutputItem(item);
    }
  };

  const handlePreviousOutput = () => {
    if (selectOutputGroupIndex !== 0) {
      var selgroupindex = selectOutputGroup[0].id;

      var items = allOutputItems
        .filter((e) => e.group === selgroupindex)
        .map((items) => items);

      var item = items.filter((e) => e.id === selectOutputItem[0].id);
      var itemindex = items.indexOf(item[0]);
      //console.log(items);
      //console.log(item);
      //console.log(itemindex);

      var group = allOutputGroups
        .filter((e) => e.id === selgroupindex)
        .map((group) => group);

      //select previous item
      var previousitem;
      if (itemindex === 0) previousitem = items.slice(-1);
      else previousitem = items.slice(itemindex - 1, itemindex);
      //console.log(previousitem);

      setSelOutputGroup(group);
      setSelOutputItem(previousitem);

      setSelOutputItemIndex(previousitem.id);
      setSelOutputGroupIndex(selgroupindex);

      handleGetSelItemDetail(previousitem, group);
    }
  };

  const handleNextOutput = () => {
    if (selectOutputGroupIndex !== 0) {
      var selgroupindex = selectOutputGroup[0].id;

      var items = allOutputItems
        .filter((e) => e.group === selgroupindex)
        .map((items) => items);

      var item = items.filter((e) => e.id === selectOutputItem[0].id);
      var itemindex = items.indexOf(item[0]);
      //console.log(items);
      //console.log(item);
      //console.log(itemindex);

      var group = allOutputGroups
        .filter((e) => e.id === selgroupindex)
        .map((group) => group);

      //select next item
      var nextitem;
      if (itemindex === items.length - 1) nextitem = items.slice(0, 1);
      else nextitem = items.slice(itemindex + 1, itemindex + 2);
      //console.log(nextitem);

      setSelOutputGroup(group);
      setSelOutputItem(nextitem);

      setSelOutputItemIndex(nextitem.id);
      setSelOutputGroupIndex(selgroupindex);

      handleGetSelItemDetail(nextitem, group);
    }
  };

  const handleOutputUnitChange = (event) => {
    if (selectOutputItemIndex !== 0) {
      setSelOutputUnit(event.target.value);

      var groupId = selectOutputGroup[0].id;

      var group = selectOutputGroup.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              unit: event.target.value,
            })
          : group
      );
      setSelOutputGroup(group);
    }
  };

  const handleDurationUnitChange = (event) => {
    if (selectOutputItemIndex !== 0) {
      setSelDurationUnit(event.target.value);
    }
  };

  const handleAddOutputAtIndex = (index, group) => {
    //if (selectOutputGroupIndex !== 0) {
    var selgroupindex = index;

    //console.log(selgroupindex);

    var selitemindex = allOutputItems.length + 1;

    const item = [
      {
        id: selitemindex,
        group: selgroupindex,
        title: "0",
        start_time: moment().add(0, "m"),
        end_time: moment().clone().add(0.5, "m"),
        note: "",
      },
    ];

    allOutputItems.push(item[0]);

    var finalitems = allOutputItems.map((item, index) =>
      Object.assign({}, item, {
        id: index + 1,
      })
    );

    //console.log(finalitems)
    var finalitem = finalitems.filter((e) => e.id === selitemindex);
    setSelOutputItem(finalitem);
    setSelOutputItemIndex(selitemindex);

    setAllOutputItems(finalitems);

    setSelOutputGroup(group);
    setSelOutputGroupIndex(selgroupindex);

    handleGetSelItemDetail(finalitem, group);
    //return finalitems;
    //}
  };

  const handleAddOutput = () => {
    if (selectOutputGroupIndex !== 0) {
      var selgroupindex = selectOutputGroup[0].id;

      //console.log(selgroupindex);

      var selitemindex = allOutputItems.length + 1;

      const item = [
        {
          id: selitemindex,
          group: selgroupindex,
          title: "0",
          start_time: moment().add(0, "m"),
          end_time: moment().clone().add(0.5, "m"),
        },
      ];

      allOutputItems.push(item[0]);

      var finalitems = allOutputItems.map((item, index) =>
        Object.assign({}, item, {
          id: index + 1,
        })
      );

      var finalitem = finalitems.filter((e) => e.id === selitemindex);
      setSelOutputItem(finalitem);
      setSelOutputItemIndex(selitemindex);

      setAllOutputItems(finalitems);
    }
  };

  const handleRemoveOutput = () => {
    if (selectOutputGroupIndex !== 0) {
      var selgroupindex = selectOutputGroup[0].id;

      var items = allOutputItems
        .filter((e) => e.group === selgroupindex)
        .map((items) => items);
      //console.log(items);

      if (items.length === 1) {
        handleRemoveOutputs();
        return;
      }

      var item = items.filter((e) => e.id === selectOutputItem[0].id);

      var selitems = allOutputItems
        .filter((e) => e.id !== item[0].id)
        .map((items) => items);
      //console.log(selitems);

      var finalgroups = allOutputGroups.map((group, index) =>
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
      setSelOutputGroup(finalgroup);
      setSelOutputGroupIndex(selgroupindex);

      var finalitem = finalitems.filter((e) => e.group === selgroupindex);
      setSelOutputItem(finalitem);
      setSelOutputItemIndex(finalitem.id);

      setAllOutputGroups(finalgroups);
      setAllOutputItems(finalitems);

      //console.log(finalgroups);
      //console.log(finalitems);
      handleGetSelItemDetail(finalitem, finalgroup);
    }
  };

  const handleAllOutputItemsChange = () => {
    if (selectOutputItemIndex !== 0) {
      //console.log(selectOutputItem);

      var itemId = selectOutputItem[0].id;
      //console.log(itemId);
      //console.log(allOutputItems)

      var items = allOutputItems.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              title: selectOutputItem[0].title,
              start_time: selectOutputItem[0].start_time,
              end_time: selectOutputItem[0].end_time,
            })
          : item
      );
      setAllOutputItems(items);
      return items;
    } else return selectedOutputItems;
  };

  const handleAllOutputGroupsChange = () => {
    if (selectOutputGroupIndex !== 0) {
      var groupId = selectOutputGroupIndex;

      var groups = allOutputGroups.map((group) =>
        group.id === groupId
          ? Object.assign({}, group, {
              title: selectOutputGroup[0].title,
              unit: selectOutputGroup[0].unit,
              durationunit: selectOutputGroup[0].durationunit,
            })
          : group
      );
      setAllOutputGroups(groups);
      return groups;
    } else return selectedOutputs;
  };

  return (
    <>
      <Dialog
        open={showOutput}
        onClose={() => {
          handleClose();
        }}
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title">Add Output</DialogTitle>
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
                  Outputs
                  <OutputListItems
                    list={allOutputGroups}
                    itemselected={selectOutputItem}
                  />
                </Grid>
                <Grid item xs>
                  Add Output Type
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    id="Add-entry"
                    options={addoutputs}
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
                    onChange={handleOutputSelChange}
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
                  <ButtonGroup aria-label="Add/Remove Outputs">
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleAddOutputs}
                    >
                      Add Output types
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleRemoveOutputs}
                    >
                      Remove Output types
                    </Button>
                  </ButtonGroup>
                  <Grid item xs></Grid>
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
                  Output entry
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-output"
                    label="Output"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectOutputValue}
                    onChange={handleOutputChange}
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
                  Select Values
                  <ButtonGroup aria-label="Last values">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handlePreviousOutput}
                    >
                      Previous Value
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleNextOutput}
                    >
                      Next Value
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
                  Output unit
                </Grid>
                <Grid item xs>
                  <Select
                    id="output-unit"
                    labelId="Output unit"
                    variant="outlined"
                    fullWidth
                    value={selectOutputUnit}
                    onChange={handleOutputUnitChange}
                  >
                    {outputunits.map((item) => (
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
                    defaultValue={outputdurations[0]}
                    value={selectDurationUnit}
                    onChange={handleDurationUnitChange}
                  >
                    {outputdurations.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs>
                  Add/Remove Outputs
                  <ButtonGroup aria-label="Add/Remove Outputs">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleAddOutput}
                    >
                      Add Output
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "80px",
                      }}
                      onClick={handleRemoveOutput}
                    >
                      Remove Output
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
                  Timestamp
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

export default OutputModal;
