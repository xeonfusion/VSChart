import "./Timeline.css";
import moment from "moment";
import React from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline/lib";

const groups = [
  {
    id: 1,
    title: "NIBP_Systolic",
    unit: "mm Hg",
  },
  {
    id: 2,
    title: "NIBP_Diastolic",
    unit: "mm Hg",
  },
  {
    id: 3,
    title: "NIBP_Mean",
    unit: "mm Hg",
  },
  {
    id: 4,
    title: "ECG_HR",
    unit: "/min",
  },
  {
    id: 5,
    title: "SpO2",
    unit: "%",
  },
  {
    id: 6,
    title: "P1_Systolic",
    unit: "mm Hg",
  },
  {
    id: 7,
    title: "P1_Diastolic",
    unit: "mm Hg",
  },
  {
    id: 8,
    title: "P1_Mean",
    unit: "mm Hg",
  },
  {
    id: 9,
    title: "P2_Systolic",
    unit: "mm Hg",
  },
  {
    id: 10,
    title: "P2_Diastolic",
    unit: "mm Hg",
  },
  {
    id: 11,
    title: "P2_Mean",
    unit: "mm Hg",
  },
  {
    id: 12,
    title: "CVP",
    unit: "mm Hg",
  },
  {
    id: 13,
    title: "ST_II",
    unit: "mm",
  },
  {
    id: 14,
    title: "ST_V5",
    unit: "mm",
  },
  {
    id: 15,
    title: "ST_avL",
    unit: "mm",
  },
  {
    id: 16,
    title: "PPV",
    unit: "%",
  },
  {
    id: 17,
    title: "PVI",
    unit: "%",
  },
];

const HemoGrid = ({
  hemoDatasetItems,
  hemoDefaultStartTime,
  hemoDefaultEndTime,
}) => {
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
    }
  };

  const [allitems, setItems] = React.useState(hemoDatasetItems);
  const [allgroups, setGroups] = React.useState(groups);
  const [selHemoDefaultStartTime, setHemoDefaultStartTime] = React.useState(
    hemoDefaultStartTime
  );
  const [selHemoDefaultEndTime, setHemoDefaultEndTime] = React.useState(
    hemoDefaultEndTime
  );
  /*React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setGroups(groups);
    setItems(items);
  }, []);*/

  React.useEffect(() => {
    if (hemoDatasetItems !== undefined) {
      setItems(hemoDatasetItems);
    }
    //console.log(hemoDatasetItems);
    setHemoDefaultStartTime(hemoDefaultStartTime);
    setHemoDefaultEndTime(hemoDefaultEndTime);
  }, [hemoDatasetItems, hemoDefaultStartTime, hemoDefaultEndTime]);

  //const handleLoadhemoChart = () => {};

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    setHemoDefaultStartTime(visibleTimeStart);
    setHemoDefaultEndTime(visibleTimeEnd);
  };

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
            border: 0,
            background: "rgba(0, 0, 0, 0)",
            width: 0,
            borderStyle: "none",
            borderWidth: 0,
            borderRadius: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        })}
      >
        <div
          style={{
            height: itemContext.dimensions.height,
            width: itemContext.width,
            overflow: "visible",
            paddingLeft: 0,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "black",
            textAlign: "center",
          }}
        >
          {item.title}
        </div>
      </div>
    );
  };

  return (
    <>
      <Timeline
        groups={allgroups}
        items={allitems}
        defaultTimeStart={selHemoDefaultStartTime}
        defaultTimeEnd={selHemoDefaultEndTime}
        visibleTimeStart={selHemoDefaultStartTime}
        visibleTimeEnd={selHemoDefaultEndTime}
        timeSteps={{ minute: 1 }}
        onTimeChange={handleTimeChange}
        sidebarWidth={150}
        showCursorLine
        stackItems={true}
        canResize={true}
        dragSnap={1 * 60 * 1000}
        itemTouchSendsClick={false}
        groupRenderer={groupRenderer}
        itemRenderer={itemRenderer}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              const sideStyles = {
                ...getRootProps(),
                backgroundColor: "#F0F0F0",
                width: 150,
              };
              return <div style={sideStyles}>Hemodynamic</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="minute" labelFormat="HH:mm" />
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
};

export default HemoGrid;
