import React from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RespGrid from "./respiratorygrid.jsx";
import HemoGrid from "./hemodynamicgrid.jsx";
import MiscGrid from "./miscdatagrid.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    "& .MuiBox-root": {
      padding: "0px",
    },
  },
}));

const DataTabs = ({
  respDatasetItems,
  respDefaultStartTime,
  respDefaultEndTime,
  hemoDatasetItems,
  hemoDefaultStartTime,
  hemoDefaultEndTime,
  miscDatasetItems,
  miscDefaultStartTime,
  miscDefaultEndTime,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs value={value} onChange={handleChange} aria-label="datagridtabs">
        <Tab label="Respiratory" {...a11yProps(0)} />
        <Tab label="Hemodynamic" {...a11yProps(1)} />
        <Tab label="Misc" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tab}>
        <RespGrid
          respDatasetItems={respDatasetItems}
          respDefaultStartTime={respDefaultStartTime}
          respDefaultEndTime={respDefaultEndTime}
        />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tab}>
        <HemoGrid
          hemoDatasetItems={hemoDatasetItems}
          hemoDefaultStartTime={hemoDefaultStartTime}
          hemoDefaultEndTime={hemoDefaultEndTime}
        />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tab}>
        <MiscGrid
          miscDatasetItems={miscDatasetItems}
          miscDefaultStartTime={miscDefaultStartTime}
          miscDefaultEndTime={miscDefaultEndTime}
        />
      </TabPanel>
    </Paper>
  );
};

export default DataTabs;
