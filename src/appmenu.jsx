import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
//import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid2 from "./medicationgrid2.jsx";
import { ListItem } from "@material-ui/core";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    display: "block",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    //flexGrow: 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing(0),
  },
}));

export default function AppMenu() {
  const medgridRef = React.useRef();
  const chartRef = React.useRef();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            VSChart
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.toolbar} />
        <List>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => medgridRef.current.handleShowMedCall()}
            >
              Add Medication
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => medgridRef.current.handleTimeStepsCall()}
            >
              Change Timesteps
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => chartRef.current.handleLoadChartCall()}
            >
              Load Chart
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <MedicationGrid2 ref={medgridRef} />
        <AnaesthesiaChart ref={chartRef} />
      </main>
    </div>
  );
}
