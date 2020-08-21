import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import NumPad from "react-numpad";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export class MedDlg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.inputRef = React.createRef();
  }

  render() {
    return <MedModal showMedDialog={this.props.showMedDialog} />;
  }
}

function MedModal(props) {
  const [show, setShow] = React.useState(props.showMedDialog);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const [selectedDate, handleDateChange] = React.useState(new Date());

  React.useEffect(() => {
    setShow(props.showMedDialog);
  }, [props.showMedDialog]);
  console.log(show);

  return (
    <>
      <Dialog open={show} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle id="simple-dialog-title">Add Medication</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="row">
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid item xs>
                  Selected Medications
                  <List dense={true}>
                    <ListItem button selected>
                      <ListItemText>Midazolam</ListItemText>
                    </ListItem>
                    <ListItem button>
                      <ListItemText>Fentanyl</ListItemText>
                    </ListItem>
                    <ListItem button>
                      <ListItemText>Rocuronium</ListItemText>
                    </ListItem>
                    <ListItem button>
                      <ListItemText>Dexamethasone</ListItemText>
                    </ListItem>
                    <ListItem button>
                      <ListItemText>Ondansetron</ListItemText>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs>
                  Add Medication
                </Grid>
                <Grid item xs>
                  <TextField
                    id="Add-entry"
                    select
                    label="Select"
                    helperText="Add Medication"
                  >
                    <MenuItem>Propofol</MenuItem>
                    <MenuItem>Lidocaine</MenuItem>
                    <MenuItem>Fentanyl</MenuItem>
                    <MenuItem>Rocuronium</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={3}
                direction="column"
                justify="space-between"
                alignItems="stretch"
              >
                <Grid item xs>
                  Dose entry
                </Grid>
                <Grid item xs>
                  <NumPad.Number
                    onChange={(value) => {
                      console.log("value", value);
                    }}
                    label={""}
                    placeholder={"Number Pad"}
                    value={0}
                    decimal={2}
                    negative={false}
                    inline={false}
                  />
                </Grid>
                <Grid item xs>
                  Last Doses
                  <ButtonGroup aria-label="Last doses">
                    <Button variant="outlined" color="default" size="small">
                      Dose1
                    </Button>
                    <Button variant="outlined" color="default" size="small">
                      Dose2
                    </Button>
                    <Button variant="outlined" color="default" size="small">
                      Dose3
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs>
                  Timestamp
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      openTo="minutes"
                      format="DD/MM/YYYY hh:mm a"
                      variant="dialog"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs>
                  Dose unit
                </Grid>
                <Grid item xs>
                  <TextField
                    id="dose-unit"
                    select
                    label="Select"
                    helperText="Dose unit"
                  >
                    <MenuItem>mg</MenuItem>
                    <MenuItem>mcg</MenuItem>
                    <MenuItem>mcg/kg/min</MenuItem>
                    <MenuItem>ml/hr</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs>
                  Duration
                </Grid>
                <Grid item xs>
                  <TextField
                    id="duration-entry"
                    select
                    label="Select"
                    helperText="Duration"
                  >
                    <MenuItem>bolus</MenuItem>
                    <MenuItem>min</MenuItem>
                    <MenuItem>sec</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs>
                  Event timing
                </Grid>
                <Grid item xs>
                  <TextField
                    id="event-timing"
                    select
                    label="Select"
                    helperText="Event timing"
                  >
                    <MenuItem>Induction</MenuItem>
                    <MenuItem>Intubation</MenuItem>
                    <MenuItem>Maintenance</MenuItem>
                    <MenuItem>Extubation</MenuItem>
                    <MenuItem>Other</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MedDlg;
