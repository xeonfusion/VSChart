import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { forwardRef } from "react";
import React from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline/lib";

import MedModal from "./meddialog.jsx";
import EventModal from "./eventdialog.jsx";
//import Button from "@material-ui/core/Button";

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
    title: "150",
    start_time: moment().add(0.5, "m"),
    end_time: moment().add(1, "m"),
    rightTitle: "",
  },
  {
    id: 2,
    group: 1,
    title: "50",
    start_time: moment().add(1.5, "m"),
    end_time: moment().add(2, "m"),
    rightTitle: "",
  },

  {
    id: 3,
    group: 2,
    title: "75",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 4,
    group: 3,
    title: "100",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 5,
    group: 4,
    title: "50",
    start_time: moment().add(1, "m"),
    end_time: moment().add(1.5, "m"),
  },
  {
    id: 6,
    group: 5,
    title: "60",
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

const eventgroups = [
  {
    id: 1,
    title: "Events",
  },
];

const eventitems = [
  {
    id: 1,
    group: 1,
    title: "Equipment Check",
    start_time: moment().subtract(4, "m"),
    end_time: moment().subtract(3, "m"),
    note: "",
  },
  {
    id: 2,
    group: 1,
    title: "Patient In",
    start_time: moment().subtract(3, "m"),
    end_time: moment().subtract(2, "m"),
    note: "",
  },
  {
    id: 3,
    group: 1,
    title: "Anesthesia Start",
    start_time: moment().subtract(2, "m"),
    end_time: moment().subtract(1, "m"),
    note: "",
  },
  {
    id: 4,
    group: 1,
    title: "Preoxygenation",
    start_time: moment().subtract(1, "m"),
    end_time: moment().add(0, "m"),
    note: "",
  },
  {
    id: 5,
    group: 1,
    title: "Induction",
    start_time: moment().add(0, "m"),
    end_time: moment().add(1, "m"),
    note: "",
  },
  {
    id: 6,
    group: 1,
    title: "Intubation/SGA In",
    start_time: moment().add(3, "m"),
    end_time: moment().add(4, "m"),
    note: "",
  },
  {
    id: 7,
    group: 1,
    title: "Surgery Start",
    start_time: moment().add(4, "m"),
    end_time: moment().add(5, "m"),
    note: "",
  },
];

const MedicationGrid2 = forwardRef((props, ref) => {
  //Forward Menu button actions
  React.useImperativeHandle(ref, () => ({
    handleShowMedCall: () => {
      handleShowMed();
    },
    handleShowEventsCall: () => {
      handleShowEvents();
    },
    handleShowNoteCall: () => {
      handleShowEventAddNote();
    },
    handleTimeStepsCall: () => {
      handleTimeSteps();
    },
  }));

  const [show, setShow] = React.useState(false);
  const [allitems, setItems] = React.useState(items);
  const [allgroups, setGroups] = React.useState(groups);
  //const [allitems, setItems] = React.useState([]);
  //const [allgroups, setGroups] = React.useState([]);

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
  const [timeStepCount, setTimeStepCount] = React.useState(1);
  const [selTimeStart, setSelTimeStart] = React.useState(moment().add(0, "s"));
  const [selTimeEnd, setSelTimeEnd] = React.useState(moment().add(600, "s"));

  const [showEvent, setEventShow] = React.useState(false);
  const [alleventitems, setEventItems] = React.useState(eventitems);
  const [selectedEventItem, setSelEventItem] = React.useState(eventitems[0]);
  const [selectedEventItemIndex, setSelEventItemIndex] = React.useState(0);
  const [selectedEventItemTime, setSelEventItemTime] = React.useState(moment());
  const [selectedEventType, setSelEventType] = React.useState("");

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
    //console.log("Resized", itemId, time, edge);
  };

  const handleCanvasContextMenu = (groupId, time, e) => {
    var group = allgroups.filter((e) => e.id === groupId);
    var items = allitems.filter((e) => e.group === groupId);

    //select last item
    var item = items.slice(-1);
    //console.log(item);
    var itemindex = items.indexOf(item[0]);

    setSelItem(item);
    setSelGroup(group);
    setSelGroupIndex(groupId);
    setSelItemIndex(itemindex);
    //console.log(time);

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

  const handleCanvasDoubleClick = (groupId, time, e) => {
    var group = allgroups.filter((e) => e.id === groupId);

    var selitemindex = allitems.length + 1;

    const item = [
      {
        id: selitemindex,
        group: groupId,
        title: "0",
        start_time: moment(time),
        end_time: moment(time).clone().add(0.5, "m"),
      },
    ];
    //console.log(time);

    allitems.push(item[0]);

    var finalitems = allitems.map((item, index) =>
      Object.assign({}, item, {
        id: index + 1,
      })
    );

    var finalitem = finalitems.filter((e) => e.id === selitemindex);
    setSelItem(finalitem);
    setSelItemIndex(selitemindex);
    setSelGroup(group);
    setSelGroupIndex(groupId);

    setItems(finalitems);

    var dose = parseInt(finalitem[0].title);
    var unit = group[0].unit;
    var route = group[0].route;
    var start_time = finalitem[0].start_time;
    var end_time = finalitem[0].end_time;
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

  const getItemUnitFromGroup = (groupId) => {
    var group = allgroups.filter((e) => e.id === groupId);
    var unit = group[0].unit;
    return unit;
  };

  const getItemTotalsFromGroup = (groupId) => {
    var items = allitems.filter((e) => e.group === groupId);

    var sum = 0;
    items.forEach((item) => {
      sum += parseInt(item.title);
    });

    return sum;
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
    } else if (group.title !== "" && isRightSidebar) {
      return (
        <table>
          <tbody>
            <tr>
              <td>{getItemTotalsFromGroup(group.id) + " " + group.unit}</td>
            </tr>
          </tbody>
        </table>
      );
    }
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
            width: itemContext.width,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "white",
            textAlign: "left",
          }}
        >
          {item.title}
          {" " + getItemUnitFromGroup(item.group)}
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
    /*console.log(selectedItem);
    console.log(selectedItemIndex);
    console.log(selectedGroup);
    console.log(selectedGroupIndex);*/

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
    timeStepCount !== 2
      ? setTimeStepCount(timeStepCount + 1)
      : setTimeStepCount(0);

    switch (timeStepCount) {
      case 0:
        setSelTimeSteps({ minute: 1 });
        setSelTimeStart(moment().add(0, "m"));
        setSelTimeEnd(moment().add(12, "m"));
        break;
      case 1:
        setSelTimeSteps({ minute: 5 });
        setSelTimeStart(moment().add(0, "m"));
        setSelTimeEnd(moment().add(60, "m"));
        break;
      case 2:
        setSelTimeSteps({ minute: 15 });
        setSelTimeStart(moment().add(0, "m"));
        setSelTimeEnd(moment().add(180, "m"));
        break;
      default:
        setSelTimeSteps({ minute: 1 });
        setSelTimeStart(moment().add(0, "m"));
        setSelTimeEnd(moment().add(12, "m"));
        break;
    }
  };

  const handleEventItemDoubleClick = (itemId, e, time) => {
    var item = alleventitems.filter((e) => e.id === itemId);

    setSelEventItem(item);
    setSelEventItemIndex(itemId);
    //console.log(item);
    setSelEventItemTime(item[0].start_time);

    setEventShow(true);
  };

  const handleEventCanvasDoubleClick = (groupId, time, e) => {
    var seleventindex = alleventitems.length + 1;

    const item = [
      {
        id: seleventindex,
        group: 1,
        title: "Add Note",
        start_time: moment(time).add(0, "m"),
        end_time: moment(time).add(0.5, "m"),
      },
    ];

    alleventitems.push(item[0]);

    var finalitems = alleventitems.map((item, index) =>
      Object.assign({}, item, {
        id: index + 1,
      })
    );

    var finalitem = finalitems.filter((e) => e.id === seleventindex);

    setSelEventItem(finalitem);
    setSelEventItemIndex(seleventindex);
    setEventItems(finalitems);

    setSelEventType("Add Note");
    setEventShow(true);
  };

  const itemEventRenderer = ({
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
        })}
      >
        <div
          style={{
            height: itemContext.dimensions.height,
            width: itemContext.width,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "white",
            textAlign: "left",
          }}
        >
          {item.title}
        </div>
      </div>
    );
  };

  const handleEventChildState = (
    childeventstate,
    selectedEventItems,
    selectedEventItem,
    selectedEventItemIndex,
    selectedEventItemTime,
    selectedEventType
  ) => {
    setEventItems(selectedEventItems);

    setSelEventItem(selectedEventItem);
    setSelEventItemIndex(selectedEventItemIndex);
    setSelEventItemTime(selectedEventItemTime);
    setSelEventType(selectedEventType);

    setEventShow(childeventstate);
  };

  const handleShowEvents = () => {
    setEventShow(true);
  };

  const handleShowEventAddNote = () => {
    var seleventindex = alleventitems.length + 1;

    const item = [
      {
        id: seleventindex,
        group: 1,
        title: "Add Note",
        start_time: moment().add(0, "m"),
        end_time: moment().add(0.5, "m"),
      },
    ];

    alleventitems.push(item[0]);

    var finalitems = alleventitems.map((item, index) =>
      Object.assign({}, item, {
        id: index + 1,
      })
    );

    var finalitem = finalitems.filter((e) => e.id === seleventindex);

    setSelEventItem(finalitem);
    setSelEventItemIndex(seleventindex);
    setEventItems(finalitems);

    setSelEventType("Add Note");
    setEventShow(true);
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
        defaultTimeStart={moment().add(0, "m")}
        defaultTimeEnd={moment().add(12, "m")}
        sidebarWidth={150}
        rightSidebarWidth={100}
        showCursorLine
        stackItems={true}
        canResize={true}
        dragSnap={1 * 60 * 1000}
        itemTouchSendsClick={true}
        onItemDoubleClick={handleItemDoubleClick}
        onItemResize={handleItemResize}
        onCanvasContextMenu={handleCanvasContextMenu}
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
                width: 100,
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
      <Timeline
        groups={eventgroups}
        items={alleventitems}
        timeSteps={selectedTimeSteps}
        visibleTimeStart={selTimeStart}
        visibleTimeEnd={selTimeEnd}
        onTimeChange={handleTimeChange}
        sidebarWidth={150}
        rightSidebarWidth={100}
        showCursorLine
        stackItems={true}
        canResize={true}
        dragSnap={1 * 60 * 1000}
        itemTouchSendsClick={true}
        onItemDoubleClick={handleEventItemDoubleClick}
        onCanvasDoubleClick={handleEventCanvasDoubleClick}
        itemRenderer={itemEventRenderer}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              const sideStyles = {
                ...getRootProps(),
                backgroundColor: "#BBBBBB",
                width: 150,
              };
              return <div style={sideStyles}></div>;
            }}
          </SidebarHeader>
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              const sideStyles = {
                ...getRootProps(),
                backgroundColor: "#BBBBBB",
                width: 100,
              };
              return <div style={sideStyles}></div>;
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
      <EventModal
        showEventDialog={showEvent}
        childEventState={handleEventChildState}
        selectedEventItems={alleventitems}
        selectedEventItem={selectedEventItem}
        selectedEventItemIndex={selectedEventItemIndex}
        selectedEventItemTime={selectedEventItemTime}
        selectedEventType={selectedEventType}
      />
    </>
  );
});

export default MedicationGrid2;
