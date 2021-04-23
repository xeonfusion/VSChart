import "./Timeline.css";
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

const groups = [
  {
    id: 1,
    title: "FIO2",
    unit: "%",
  },
  {
    id: 2,
    title: "ETO2",
    unit: "%",
  },
  {
    id: 3,
    title: "Vti",
    unit: "ml",
  },
  {
    id: 4,
    title: "Vte",
    unit: "ml",
  },
  {
    id: 5,
    title: "RR",
    unit: "/min",
  },
  {
    id: 6,
    title: "PEEP",
    unit: "cm H2O",
  },
  {
    id: 7,
    title: "ETCO2",
    unit: "mm Hg",
  },
  {
    id: 8,
    title: "PPeak",
    unit: "cm H2O",
  },
  {
    id: 9,
    title: "PPlateau",
    unit: "cm H2O",
  },
  {
    id: 10,
    title: "FIN2O",
    unit: "%",
  },
  {
    id: 11,
    title: "ETN2O",
    unit: "%",
  },
  {
    id: 12,
    title: "FIAA",
    unit: "%",
  },
  {
    id: 13,
    title: "ETAA",
    unit: "%",
  },
  {
    id: 14,
    title: "AgentAA",
    unit: "",
  },
  {
    id: 15,
    title: "MAC_SUM",
    unit: "%",
  },
  {
    id: 16,
    title: "MinuteVolExp",
    unit: "L/min",
  },
  {
    id: 17,
    title: "Compliance",
    unit: "mL/cm H2O",
  },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "0",
    start_time: moment().startOf("m").add(0.5, "m"),
    end_time: moment().startOf("m").add(0.5, "m"),
    rightTitle: "",
  },
  {
    id: 2,
    group: 2,
    title: "0",
    start_time: moment().startOf("m").add(0.5, "m"),
    end_time: moment().startOf("m").add(0.5, "m"),
    rightTitle: "",
  },

  {
    id: 3,
    group: 3,
    title: "0",
    start_time: moment().startOf("m").add(0.5, "m"),
    end_time: moment().startOf("m").add(0.5, "m"),
    rightTitle: "",
  },
  {
    id: 4,
    group: 4,
    title: "0",
    start_time: moment().startOf("m").add(0.5, "m"),
    end_time: moment().startOf("m").add(0.5, "m"),
    rightTitle: "",
  },
  {
    id: 5,
    group: 5,
    title: "0",
    start_time: moment().startOf("m").add(0.5, "m"),
    end_time: moment().startOf("m").add(0.5, "m"),
    rightTitle: "",
  },
];

const RespGrid = ({
  respDatasetItems,
  respDefaultStartTime,
  respDefaultEndTime,
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

  const [allitems, setItems] = React.useState(respDatasetItems);
  const [allgroups, setGroups] = React.useState(groups);
  const [selRespDefaultStartTime, setRespDefaultStartTime] = React.useState(
    respDefaultStartTime
  );
  const [selRespDefaultEndTime, setRespDefaultEndTime] = React.useState(
    respDefaultEndTime
  );
  /*React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setGroups(groups);
    setItems(items);
  }, []);*/

  React.useEffect(() => {
    if (respDatasetItems !== undefined) {
      setItems(respDatasetItems);
    }
    //console.log(respDatasetItems);
    setRespDefaultStartTime(respDefaultStartTime);
    setRespDefaultEndTime(respDefaultEndTime);
  }, [respDatasetItems, respDefaultStartTime, respDefaultEndTime]);

  //const handleLoadRespChart = () => {};

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    setRespDefaultStartTime(visibleTimeStart);
    setRespDefaultEndTime(visibleTimeEnd);
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
        defaultTimeStart={selRespDefaultStartTime}
        defaultTimeEnd={selRespDefaultEndTime}
        visibleTimeStart={selRespDefaultStartTime}
        visibleTimeEnd={selRespDefaultEndTime}
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
              return <div style={sideStyles}>Respiratory</div>;
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

export default RespGrid;
