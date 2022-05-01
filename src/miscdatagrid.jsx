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

import { miscdatagroups } from "./dataconstants.jsx";

const MiscGrid = ({
  miscDatasetItems,
  miscDefaultStartTime,
  miscDefaultEndTime,
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

  const [allitems, setItems] = React.useState(miscDatasetItems);
  const [allgroups, setGroups] = React.useState(miscdatagroups);
  const [selMiscDefaultStartTime, setMiscDefaultStartTime] =
    React.useState(miscDefaultStartTime);
  const [selMiscDefaultEndTime, setMiscDefaultEndTime] =
    React.useState(miscDefaultEndTime);
  /*React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setGroups(groups);
    setItems(items);
  }, []);*/

  React.useEffect(() => {
    if (miscDatasetItems !== undefined) {
      setItems(miscDatasetItems);
    }
    setMiscDefaultStartTime(miscDefaultStartTime);
    setMiscDefaultEndTime(miscDefaultEndTime);
  }, [miscDatasetItems, miscDefaultStartTime, miscDefaultEndTime]);

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    setMiscDefaultStartTime(visibleTimeStart);
    setMiscDefaultEndTime(visibleTimeEnd);
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
        defaultTimeStart={moment().add(0, "m")}
        defaultTimeEnd={moment().add(12, "m")}
        visibleTimeStart={selMiscDefaultStartTime}
        visibleTimeEnd={selMiscDefaultEndTime}
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
              return <div style={sideStyles}>Misc</div>;
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

export default MiscGrid;
