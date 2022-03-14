import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
//import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AnaesthesiaChart from "./anaesthchart.jsx";
import { ListItem, ListItemText } from "@mui/material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArchiveIcon from "@mui/icons-material/Archive";
import BuildIcon from "@mui/icons-material/Build";
import PrintIcon from "@mui/icons-material/Print";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const drawerWidth = 240;
const minidrawerWidth = 70;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AppMenu() {
  const medgridRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const printDataRef = React.useRef(null);

  //const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "block" }}>
      <>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} size="large">
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
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
        <Box
          component="main"
          sx={{
            //marginLeft: minidrawerWidth,
            marginLeft: theme.spacing(9),
            width: `calc(100% - ${minidrawerWidth}px)`,
            padding: theme.spacing(0),
          }}
        >
          <DrawerHeader />
          <AnaesthesiaChart
            ref={chartRef}
            forwardedRef={medgridRef}
            printDataRef={printDataRef}
          />
        </Box>
      </>
    </Box>
  );
}
