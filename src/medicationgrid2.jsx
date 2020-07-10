//import Timeline, { TodayMarker } from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
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

const groups = [
  { id: 1, title: "Propofol" },
  { id: 2, title: "Fentanyl" },
  { id: 3, title: "Lidocaine" },
  { id: 4, title: "Rocuronium" },
  { id: 5, title: "Ringers" },
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

class MedicationGrid3 extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(0, "s")}
          defaultTimeEnd={moment().add(300, "s")}
          sidebarWidth={150}
          rightSidebarWidth={150}
          showCursorLine
        >
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => {
                const sideStyles = {
                  ...getRootProps(),
                  backgroundColor: "white",
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
                  backgroundColor: "white",
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
      </div>
    );
  }
}

export default MedicationGrid3;
