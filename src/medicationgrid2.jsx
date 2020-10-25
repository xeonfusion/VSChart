import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { Component } from "react";
import React from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline/lib";

import MedModal from "./meddialog.jsx";
import Button from "@material-ui/core/Button";

const groups = [
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
];

const items = [
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
    group: 1,
    title: "50 mg",
    start_time: moment().add(1.5, "m"),
    end_time: moment().add(2, "m"),
    rightTitle: "",
  },

  {
    id: 3,
    group: 2,
    title: "75 mcg",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 4,
    group: 3,
    title: "100 mg",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 5,
    group: 4,
    title: "50 mg",
    start_time: moment().add(1, "m"),
    end_time: moment().add(1.5, "m"),
  },
  {
    id: 6,
    group: 5,
    title: "60 ml/hr",
    start_time: moment().add(0, "m"),
    end_time: moment().add(10, "m"),
  },
];

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title", // key for item div content
  itemDivTitleKey: "title", // key for item div title (<div title="text"/>)
  itemGroupKey: "group",
  itemTimeStartKey: "start_time",
  itemTimeEndKey: "end_time",
};

export class MedicationGrid2 extends Component {
  constructor() {
    super();

    const defaultTimeStart = moment().startOf("day").toDate();
    const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
    };
  }

  render() {
    return (
      <div>
        <MedGrid />
      </div>
    );
  }
}

function MedGrid() {
  const [show, setShow] = React.useState(false);
  const [allitems, setItems] = React.useState(items);
  const [allgroups, setGroups] = React.useState(groups);

  const [selectedGroup, setSelGroup] = React.useState(groups[0]);
  const [selectedGroupIndex, setSelGroupIndex] = React.useState(0);
  const [selectedItem, setSelItem] = React.useState(items[0]);
  const [selectedItemIndex, setSelItemIndex] = React.useState(0);

  const [selectedDose, setSelDose] = React.useState(0);
  const [selectedUnit, setSelUnit] = React.useState("mg");
  const [selectedRoute, setSelRoute] = React.useState("Intravenous");
  const [selectedItemTime, setSelItemTime] = React.useState(moment());
  const [selectedDuration, setSelDuration] = React.useState(0);
  const [selectedDurationUnit, setSelDurationUnit] = React.useState(0);

  const [selectedTimeSteps, setSelTimeSteps] = React.useState({ minute: 1 });
  const [timeStepCount, setTimeStepCount] = React.useState(0);
  const [selTimeStart, setSelTimeStart] = React.useState(moment().add(0, "s"));
  const [selTimeEnd, setSelTimeEnd] = React.useState(moment().add(600, "s"));

  const handleItemDoubleClick = (itemId, e, time) => {
    var item = allitems.filter((e) => e.id === itemId);

    var groupid = item[0].group;
    var group = allgroups.filter((e) => e.id === groupid);

    setSelItem(item);
    setSelGroup(group);
    setSelGroupIndex(groupid);
    setSelItemIndex(itemId);

    var dose = parseInt(item[0].title);
    var unit = group[0].unit;
    var route = group[0].route;
    var start_time = item[0].start_time;
    var end_time = item[0].end_time;
    var durationunit = group[0].durationunit;
    var duration = end_time.diff(start_time, convertDurationUnit(durationunit));

    setSelDose(dose);
    setSelUnit(unit);
    setSelRoute(route);
    setSelItemTime(start_time);
    setSelDuration(duration);
    setSelDurationUnit(durationunit);

    setShow(true);
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

  //const handleItemClick = (itemId, e, time) => {};

  //const handleItemSelect = (itemId, e, time) => {};

  const handleItemResize = (itemId, time, edge) => {
    console.log("Resized", itemId, time, edge);
  };

  const handleCanvasDoubleClick = (groupId, e, time) => {
    var group = allgroups.filter((e) => e.id === groupId);
    var item = allitems.filter((e) => e.group === groupId);

    setSelItem(item);
    setSelGroup(group);

    var dose = parseInt(item[0].title);
    var unit = group[0].unit;
    var route = group[0].route;
    //var start_time = item[0].start_time;
    //var end_time = item[0].end_time;
    var start_time = moment(time);
    var end_time = moment(time).clone().add(0.5, "m");
    var durationunit = group[0].durationunit;
    var duration = end_time.diff(start_time, convertDurationUnit(durationunit));

    setSelDose(dose);
    setSelUnit(unit);
    setSelRoute(route);
    setSelItemTime(start_time);
    setSelDuration(duration);
    setSelDurationUnit(durationunit);

    setShow(true);
  };

  const groupRenderer = ({ group, isRightSidebar }) => {
    if (group.title !== "" && !isRightSidebar) {
      return (
        <table>
          <tbody>
            <tr>
              <td>{group.title + " (" + group.unit + ")"}</td>
            </tr>
          </tbody>
        </table>
      );
    } else return null;
  };

  const [showItemInfo, setShowItemInfo] = React.useState(false);

  const itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    return (
      <div
        {...getItemProps({
          style: {
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1,
          },
          onMouseEnter: () => {
            setShowItemInfo(true);
          },
          onMouseLeave: () => {
            setShowItemInfo(false);
          },
          onClick: () => {
            setShowItemInfo(false);
          },
          onDoubleClick: () => {
            setShowItemInfo(false);
          },
        })}
      >
        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </div>
      </div>
    );
  };

  const handleChildState = (
    childstate,
    selectedMeds,
    selectedItems,
    selectedItem,
    selectedGroup,
    selectedItemIndex,
    selectedGroupIndex,
    selectedDose,
    selectedUnit,
    selectedRoute,
    selectedDate,
    selectedDuration,
    selectedDurationUnit
  ) => {
    setGroups(selectedMeds);
    setItems(selectedItems);

    setSelItem(selectedItem);
    setSelGroup(selectedGroup);
    setSelItemIndex(selectedItemIndex);
    setSelGroupIndex(selectedGroupIndex);
    setSelDose(selectedDose);
    setSelUnit(selectedUnit);
    setSelRoute(selectedRoute);
    setSelDurationUnit(selectedDurationUnit);
    setSelDuration(selectedDuration);
    setSelItemTime(selectedDate);
    //console.log(selectedMeds);
    //console.log(selectedItems);

    setShow(childstate);
  };

  /*React.useEffect(() => {
    setGroups(allgroups);
    setItems(allitems);
  }, [allgroups, allitems]);*/

  const handleShowMed = () => setShow(true);

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    setSelTimeStart(visibleTimeStart);
    setSelTimeEnd(visibleTimeEnd);
  };

  const handleTimeSteps = () => {
    var count =
      timeStepCount !== 3
        ? setTimeStepCount(timeStepCount + 1)
        : setTimeStepCount(0);

    switch (timeStepCount) {
      case 0:
        setSelTimeSteps({ minute: 1 });
        setSelTimeStart(moment().add(0, "s"));
        setSelTimeEnd(moment().add(600, "s"));
        break;
      case 1:
        setSelTimeSteps({ minute: 5 });
        setSelTimeStart(moment().add(0, "s"));
        setSelTimeEnd(moment().add(3600, "s"));
        break;
      case 2:
        setSelTimeSteps({ minute: 15 });
        setSelTimeStart(moment().add(0, "s"));
        setSelTimeEnd(moment().add(3600, "s"));
        break;
      default:
        setSelTimeSteps({ minute: 1 });
        setSelTimeStart(moment().add(0, "s"));
        setSelTimeEnd(moment().add(600, "s"));
        break;
    }
  };

  return (
    <>
      <MedModal
        showMedDialog={show}
        childState={handleChildState}
        selectedMeds={allgroups}
        selectedItems={allitems}
        selectedGroup={selectedGroup}
        selectedGroupIndex={selectedGroupIndex}
        selectedItem={selectedItem}
        selectedItemIndex={selectedItemIndex}
        selectedDose={selectedDose}
        selectedUnit={selectedUnit}
        selectedRoute={selectedRoute}
        selectedItemTime={selectedItemTime}
        selectedDuration={selectedDuration}
        selectedDurationUnit={selectedDurationUnit}
      />
      <Timeline
        key={keys}
        groups={allgroups}
        items={allitems}
        defaultTimeStart={moment().add(0, "s")}
        defaultTimeEnd={moment().add(600, "s")}
        sidebarWidth={150}
        rightSidebarWidth={150}
        showCursorLine
        stackItems={true}
        canResize={true}
        onItemDoubleClick={handleItemDoubleClick}
        onItemResize={handleItemResize}
        onCanvasDoubleClick={handleCanvasDoubleClick}
        groupRenderer={groupRenderer}
        itemRenderer={itemRenderer}
        timeSteps={selectedTimeSteps}
        visibleTimeStart={selTimeStart}
        visibleTimeEnd={selTimeEnd}
        onTimeChange={handleTimeChange}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              const sideStyles = {
                ...getRootProps(),
                backgroundColor: "#F0F0F0",
                width: 150,
              };
              return <div style={sideStyles}>Medications</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="minute" labelFormat="HH:mm" />
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              const sideStyles = {
                ...getRootProps(),
                backgroundColor: "#F0F0F0",
                width: 150,
              };
              return <div style={sideStyles}>Totals</div>;
            }}
          </SidebarHeader>
        </TimelineHeaders>
        <TimelineMarkers>
          <TodayMarker interval={10000} />
          <TodayMarker>
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: "red",
                width: "2px",
              };
              return <div style={customStyles} />;
            }}
          </TodayMarker>
        </TimelineMarkers>
      </Timeline>
      <Button variant="contained" color="primary" onClick={handleShowMed}>
        Add Medication
      </Button>
      <Button variant="contained" color="primary" onClick={handleTimeSteps}>
        Change Timesteps
      </Button>
    </>
  );
}

export default MedGrid;
