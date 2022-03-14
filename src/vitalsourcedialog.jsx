import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { fileOpen } from "browser-fs-access";
import MqttOptionsModal from "./mqttoptionsdialog.jsx";

const VitalSourceModal = ({
  showVitalSourceDialog,
  childVitalSourceState,
  selectedVitalMqttURLSource,
  selectedMqttTopic,
  selectedMqttQoS,
  selectedMqttUser,
  selectedMqttPass,
  mqttConnectionStatus,
  selectedVitalURLSource,
  selectedVitalFileSource,
  selectedVitalSourceType,
  dropVitalSourceFileValue,
  selectedMonitorType,
}) => {
  const [showVitalSource, setVitalSourceShow] = React.useState(false);
  const [vitalsourcetype, setVitalSourceType] = React.useState("MQTTURL");
  const [showMqttOptions, setMqttOptionsShow] = React.useState(false);
  const [mqttConnectStatus, setMqttConnectStatus] =
    React.useState("Disconnected");
  const [vitalsourceurlvalue, setVitalSourceURLValue] = React.useState(
    "http://localhost:5000/posts"
  );
  const [vitalsourcemqtturlvalue, setVitalSourceMqttURLValue] = React.useState(
    "ws://localhost:8883/"
  );
  const [vitalMqttTopic, setVitalMqttTopic] = React.useState(
    "/VSCapture/ASDF/numericdata/#"
  );
  const [vitalMqttQoS, setVitalMqttQoS] = React.useState("0");
  const [vitalMqttUser, setVitalMqttUser] = React.useState("");
  const [vitalMqttPass, setVitalMqttPass] = React.useState("");

  const [vitalsourcefilevalue, setVitalSourceFileValue] = React.useState(null);
  const [vitalsourcefilename, setVitalSourceFilename] = React.useState();
  const [dropvitalsourcefilevalue, setDropVitalSourceFileValue] =
    React.useState(false);
  const [monitortype, setMonitorType] = React.useState("DatexS5");

  const handleClose = () => {
    setVitalSourceShow(false);
    childVitalSourceState(
      false,
      vitalsourcemqtturlvalue,
      mqttConnectStatus,
      vitalMqttTopic,
      vitalMqttQoS,
      vitalMqttUser,
      vitalMqttPass,
      vitalsourceurlvalue,
      vitalsourcefilevalue,
      vitalsourcetype,
      dropvitalsourcefilevalue,
      monitortype
    );
  };

  const handleMonitorTypeRadioChange = (event) => {
    setMonitorType(event.target.value);
  };

  const handleRadioChange = (event) => {
    setVitalSourceType(event.target.value);
    //console.log(event.target.value);
  };

  const handleURLChange = (event) => {
    setVitalSourceURLValue(event.target.value);
  };

  const handleMqttURLChange = (event) => {
    setVitalSourceMqttURLValue(event.target.value);
  };

  const handleMqttOptions = () => {
    setMqttOptionsShow(true);
  };

  const handleMqttOptionsChildState = (
    childmqttoptionsstate,
    selectedMqttTopic,
    selectedMqttQoS,
    selectedMqttUser,
    selectedMqttPass
  ) => {
    setMqttOptionsShow(childmqttoptionsstate);
    setVitalMqttTopic(selectedMqttTopic);
    setVitalMqttQoS(selectedMqttQoS);
    setVitalMqttUser(selectedMqttUser);
    setVitalMqttPass(selectedMqttPass);
  };

  const handleCSVButtonClick = () => {
    (async () => {
      const blob = await fileOpen({
        mimeTypes: ["text/csv"],
      });
      console.log(blob.handle);
      setVitalSourceFileValue(blob.handle);

      setVitalSourceFilename(blob.handle.name);

      /*var fileHandle;
      [fileHandle] = await window.showOpenFilePicker();

      // get file contents
      const fileData = await fileHandle.getFile();
      setVitalSourceFileValue(fileData);

      setVitalSourceFilename(fileData.name);

      setDropVitalSourceFileValue(false);*/
    })();
  };

  const handleFileChange = (event) => {
    setVitalSourceFileValue(event.target.files[0]);
    //console.log(event.target.value);
    console.log(event.target.files[0]);

    setVitalSourceFilename("");
    setDropVitalSourceFileValue(false);

    /*event.stopPropagation();
    event.preventDefault();
    
    console.log(event.target.webkitEntries);

    const dt = new DataTransfer();
    var file = event.target.files[0];
    dt.items.add(file);
    console.log(dt.items[0]);
    var fileentry = dt.items[0].webkitGetAsEntry();
    console.log(fileentry);

    setVitalSourceFileValue(fileentry);
    setDropVitalSourceFileValue(true);*/
  };

  const handleFileDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const fileEntry = event.dataTransfer.items[0].webkitGetAsEntry();
    //console.log(fileEntry);

    setVitalSourceFilename(fileEntry.name + " chosen");
    setVitalSourceFileValue(fileEntry);
    setDropVitalSourceFileValue(true);
  };

  React.useEffect(() => {
    setVitalSourceShow(showVitalSourceDialog);
    setVitalSourceURLValue(selectedVitalURLSource);
    setVitalSourceFileValue(selectedVitalFileSource);
    setVitalSourceType(selectedVitalSourceType);
    setDropVitalSourceFileValue(dropVitalSourceFileValue);
    setMonitorType(selectedMonitorType);
    setMqttConnectStatus(mqttConnectionStatus);
    setVitalMqttTopic(selectedMqttTopic);
    setVitalMqttQoS(selectedMqttQoS);
    setVitalMqttUser(selectedMqttUser);
    setVitalMqttPass(selectedMqttPass);
  }, [
    showVitalSourceDialog,
    selectedVitalURLSource,
    selectedVitalFileSource,
    selectedVitalSourceType,
    dropVitalSourceFileValue,
    selectedMonitorType,
    mqttConnectionStatus,
    selectedMqttTopic,
    selectedMqttQoS,
    selectedMqttUser,
    selectedMqttPass,
  ]);

  return (
    <>
      <Dialog
        open={showVitalSource}
        onClose={() => {
          handleClose();
        }}
        onDrop={(e) => handleFileDrop(e)}
        fullWidth
        maxWidth={"sm"}
        scroll={"body"}
      >
        <DialogTitle id="simple-dialog-title-3">Vitals Source</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="row"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs>
              <Grid
                container
                spacing={2}
                direction="column"
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                    sx={{ paddingTop: "12px", paddingBottom: "10px" }}
                  >
                    Set Vital Signs Data Source (URL or File Input):
                  </FormLabel>
                  <FormLabel
                    component="legend"
                    sx={{ paddingTop: "5px", paddingBottom: "10px" }}
                  >
                    (use drag and drop for reading files in real-time)
                  </FormLabel>
                  <RadioGroup
                    aria-label="vitalsource"
                    name="vsource"
                    value={vitalsourcetype}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="MQTTURL"
                      control={<Radio />}
                      label={
                        <TextField
                          id="outlined-mqtt-url"
                          label="MQTT Server WebSocket URL"
                          type="url"
                          defaultValue="ws://localhost:8883"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={vitalsourcemqtturlvalue}
                          onChange={handleMqttURLChange}
                          sx={{ width: 450, paddingBottom: "1px" }}
                          helperText={"Status: " + mqttConnectStatus}
                          fullWidth
                        />
                      }
                    />
                    <ButtonGroup
                      style={{ paddingLeft: "30px", paddingBottom: "10px" }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          maxWidth: "100px",
                        }}
                        onClick={handleMqttOptions}
                      >
                        Options
                      </Button>
                    </ButtonGroup>
                    <FormControlLabel
                      value="URL"
                      control={<Radio />}
                      label={
                        <TextField
                          id="outlined-url"
                          label="JSON Server URL"
                          type="url"
                          defaultValue="http://localhost:5000/posts"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={vitalsourceurlvalue}
                          onChange={handleURLChange}
                          sx={{
                            width: 450,
                            paddingBottom: "10px",
                          }}
                          fullWidth
                        />
                      }
                    />
                    <FormControlLabel
                      value="File"
                      control={<Radio />}
                      label={
                        <TextField
                          id="outlined-file"
                          label="LocalDB JSON Server File"
                          accept="application/json,.json"
                          type="file"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleFileChange}
                          sx={{ width: 450, paddingBottom: "10px" }}
                          fullWidth
                          helperText={vitalsourcefilename}
                        />
                      }
                    />
                    <FormControlLabel
                      value="VSCSVFile"
                      control={<Radio />}
                      label={
                        <TextField
                          id="outlined-file2"
                          label="VSCapture CSV File"
                          accept="text/csv,.csv"
                          type="file"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleFileChange}
                          sx={{ width: 450, paddingBottom: "10px" }}
                          fullWidth
                          helperText={vitalsourcefilename}
                        />
                      }
                    />

                    <FormControlLabel
                      value="VSJSONFile"
                      control={<Radio />}
                      label={
                        <TextField
                          id="outlined-file3"
                          label="VSCapture JSON File"
                          accept="application/json,.json"
                          type="file"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleFileChange}
                          sx={{ width: 450, paddingBottom: "10px" }}
                          fullWidth
                          helperText={vitalsourcefilename}
                        />
                      }
                    />
                  </RadioGroup>
                  <FormLabel component="legend">
                    Set Monitor Data Type:
                  </FormLabel>
                  <RadioGroup
                    aria-label="monitortype"
                    name="monitortype"
                    defaultValue="DatexS5"
                    value={monitortype}
                    onChange={handleMonitorTypeRadioChange}
                  >
                    <FormControlLabel
                      value="DatexS5"
                      control={<Radio />}
                      label={"Datex S/5"}
                    />
                    <FormControlLabel
                      value="Intellivue"
                      control={<Radio />}
                      label={"Philips Intellivue MP or MX"}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <MqttOptionsModal
        showMqttOptionsDialog={showMqttOptions}
        childMqttOptionsState={handleMqttOptionsChildState}
        selectedMqttTopic={vitalMqttTopic}
        selectedMqttQoS={vitalMqttQoS}
        selectedMqttUser={vitalMqttUser}
        selectedMqttPass={vitalMqttPass}
      />
    </>
  );
};

export default VitalSourceModal;
