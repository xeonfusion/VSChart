import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
//import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import AnaesthesiaChart from "./anaesthchart.jsx";
import MedicationGrid2 from "./medicationgrid2.jsx";
import { ListItem, ListItemText } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddCommentIcon from "@material-ui/icons/AddComment";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const drawerWidth = 240;
const minidrawerWidth = 70;

/*const useStyles = makeStyles((theme) => ({
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
}));*/

const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    display: "block",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    //flexGrow: 1,
    marginLeft: minidrawerWidth,
    width: `calc(100% - ${minidrawerWidth}px)`,
    padding: theme.spacing(0),
  },
}));

export default function AppMenu() {
  const medgridRef = React.useRef();
  const chartRef = React.useRef();

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <Toolbar />
        <div className={classes.toolbar} />
        <List>
          <ListItem
            button
            onClick={() => medgridRef.current.handleShowMedCall()}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>Add Medication</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => medgridRef.current.handleTimeStepsCall()}
          >
            <ListItemIcon>
              <ZoomInIcon />
            </ListItemIcon>
            <ListItemText>Change Timesteps</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => medgridRef.current.handleShowEventsCall()}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText>Add Event</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => medgridRef.current.handleShowNoteCall()}
          >
            <ListItemIcon>
              <AddCommentIcon />
            </ListItemIcon>
            <ListItemText>Add Note</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => chartRef.current.handleLoadChartCall()}
          >
            <ListItemIcon>
              <AutorenewIcon />
            </ListItemIcon>
            <ListItemText>Load Chart</ListItemText>
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
