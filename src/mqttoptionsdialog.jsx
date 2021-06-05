import React from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const MqttOptionsModal = ({
  showMqttOptionsDialog,
  childMqttOptionsState,
  selectedMqttTopic,
  selectedMqttQoS,
  selectedMqttUser,
  selectedMqttPass,
}) => {
  const [showMqttOptions, setMqttOptionsShow] = React.useState(false);
  const [mqttTopic, setMqttTopic] = React.useState(
    "/VSCapture/ASDF/numericdata/#"
  );

  //const mqttqos = ["0 (At most once)", "1 (At least once)", "2 (Exactly once)"];
  const mqttqos = ["0", "1", "2"];

  const [selectMqttQoS, setMqttQoS] = React.useState(mqttqos[0]);
  const [selectMqttUser, setMqttUser] = React.useState("");
  const [selectMqttPass, setMqttPass] = React.useState("");

  const handleClose = () => {
    setMqttOptionsShow(false);
    childMqttOptionsState(
      false,
      mqttTopic,
      selectMqttQoS,
      selectMqttUser,
      selectMqttPass
    );
  };

  const handleMqttTopicChange = (event) => {
    setMqttTopic(event.target.value);
  };

  const handleQoSChange = (event) => {
    setMqttQoS(event.target.value);
  };

  const handleMqttUserChange = (event) => {
    setMqttUser(event.target.value);
  };

  const handleMqttPassChange = (event) => {
    setMqttPass(event.target.value);
  };

  React.useEffect(() => {
    setMqttOptionsShow(showMqttOptionsDialog);
    setMqttTopic(selectedMqttTopic);
    setMqttQoS(selectedMqttQoS);
    setMqttUser(selectedMqttUser);
    setMqttPass(selectedMqttPass);
  }, [
    showMqttOptionsDialog,
    selectedMqttTopic,
    selectedMqttQoS,
    selectedMqttUser,
    selectedMqttPass,
  ]);

  return (
    <>
      <Dialog
        open={showMqttOptions}
        onClose={() => {
          handleClose();
        }}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle id="simple-dialog-title-3">MQTT Options</DialogTitle>
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
                <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                    style={{ paddingTop: "5px", paddingBottom: "10px" }}
                  >
                    Set MQTT WebSocket Options:
                  </FormLabel>
                  <Grid item xs>
                    <TextField
                      id="mqttuser"
                      label="MQTT User"
                      type="text"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={selectMqttUser}
                      onChange={handleMqttUserChange}
                      style={{
                        width: 250,
                        paddingBottom: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="mqttpass"
                      label="MQTT Password"
                      type="password"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={selectMqttPass}
                      onChange={handleMqttPassChange}
                      style={{ width: 250, paddingBottom: "10px" }}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="topic"
                      label="Topic"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={mqttTopic}
                      onChange={handleMqttTopicChange}
                      fullWidth
                      style={{ width: 450, paddingBottom: "10px" }}
                    />
                  </Grid>
                  <Grid item xs>
                    MQTT QoS
                  </Grid>
                  <Grid item xs>
                    <Select
                      id="mqtt-qos"
                      labelId="MQTT Qos"
                      variant="outlined"
                      value={selectMqttQoS}
                      onChange={handleQoSChange}
                      style={{ width: 100, paddingBottom: "10px" }}
                    >
                      {mqttqos.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </FormControl>
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

export default MqttOptionsModal;
