import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const EventModal = ({
  showEventDialog,
  childEventState,
  selectedEventItems,
  selectedEventItem,
  selectedEventItemIndex,
}) => {
  const [showEvent, setEventShow] = React.useState(false);

  const handleClose = () => {
    setEventShow(false);

    childEventState(
      false,
      allEventItems,
      selectEventItem,
      selectEventItemIndex
    );
  };

  const [allEventItems, setAllEventItems] = React.useState(selectedEventItems);
  const [selectEventItem, setSelEventItem] = React.useState(selectedEventItem);
  const [selectEventItemIndex, setSelEventItemIndex] = React.useState(
    selectedEventItemIndex
  );

  React.useEffect(() => {
    //Run only on first mount with empty array dependency
    setAllEventItems(selectedEventItems);
  }, []);

  React.useEffect(() => {
    setSelEventItem(selectedEventItem);
    setSelEventItemIndex(selectedEventItemIndex);
    setEventShow(showEventDialog);
  }, [selectedEventItem, selectedEventItemIndex, showEventDialog]);

  return (
    <>
      <Dialog
        open={showEvent}
        onClose={() => {
          handleClose();
        }}
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title-2">Add Event</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="row"
            display="flex"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                display="flex"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs>
                  Events
                </Grid>
                <Grid item xs>
                  Add Event
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventModal;
