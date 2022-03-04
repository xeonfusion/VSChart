import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@mui/material/List";
//import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import clsx from "clsx";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import AnaesthesiaChart from "./anaesthchart.jsx";
//import MedicationGrid2 from "./medicationgrid2.jsx";
import { ListItem, ListItemText } from "@mui/material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArchiveIcon from "@mui/icons-material/Archive";
import BuildIcon from "@mui/icons-material/Build";
import PrintIcon from '@mui/icons-material/Print';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

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
  const medgridRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const printDataRef = React.useRef(null);

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePrintData = () => {
    /*if(isElectron){
        try{
        window.ipcRenderer.send('print-to-pdf');
      }
      catch(error){
        console.log(error);
      } 
    }*/
    //window.print();
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
            onClick={() => medgridRef.current.handleShowOutputsCall()}
          >
            <ListItemIcon>
              <BloodtypeIcon />
            </ListItemIcon>
            <ListItemText>Add Output</ListItemText>
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
          <ListItem
            button
            onClick={() => chartRef.current.handleVitalsSourceCall()}
          >
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText>Vitals Source</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => medgridRef.current.handleExportDataCall()}
          >
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText>Export Data</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => medgridRef.current.handlePrintDataCall()}
          >
            <ListItemIcon>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText>Print Data</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <AnaesthesiaChart
          ref={chartRef}
          forwardedRef={medgridRef}
          printDataRef={printDataRef}
        />
      </main>
    </div>
  );
}
