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

const groups = [
  { id: 1, title: "Propofol", type: "hypnotic", color: "yellow" },
  { id: 2, title: "Fentanyl", type: "opioid", color: "deepskyblue" },
  { id: 3, title: "Lidocaine", type: "localanaesthetic", color: "grey" },
  { id: 4, title: "Rocuronium", type: "nmbd", color: "red" },
  { id: 5, title: "Ringers", type: "ivfluid", color: "white" },
  { id: 6, title: "" },
  { id: 7, title: "" },
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
  const [allitems, setItem] = React.useState(items);
  const [allgroups, setGroup] = React.useState(groups);
  const [selectedItem, setSelItem] = React.useState(items[0]);

  const handleItemDoubleClick = (itemId, e, time) => {
    console.log("double clicked", itemId, time);

    var item = allitems.filter((e) => e.id === itemId);

    var groupid = item[0].group;
    var group = allgroups.filter((e) => e.id === groupid);

    console.log(
      group[0].title,
      item[0].title,
      item[0].start_time.toDate(),
      item[0].end_time.toDate()
    );

    setSelItem(item);
    setShow(true);
  };

  const handleItemResize = (itemId, time, edge) => {
    console.log("Resized", itemId, time, edge);
  };

  const handleChildState = (childstate, selectedMeds) => {
    setShow(childstate);
    setGroup(selectedMeds);
  };

  return (
    <>
      <MedModal
        showMedDialog={show}
        childState={handleChildState}
        selectedMeds={allgroups}
        selectedItem={selectedItem}
      />
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(0, "s")}
        defaultTimeEnd={moment().add(600, "s")}
        sidebarWidth={150}
        rightSidebarWidth={150}
        showCursorLine
        canResize={true}
        onItemDoubleClick={handleItemDoubleClick}
        onItemResize={handleItemResize}
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
          <DateHeader unit="hour" />
          <DateHeader />
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
    </>
  );
}

export default MedicationGrid2;
