import React from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const VitalSourceModal = ({
  showVitalSourceDialog,
  childVitalSourceState,
  selectedVitalURLSource,
  selectedVitalFileSource,
  selectedVitalSourceType,
  dropVitalSourceFileValue,
}) => {
  const [showVitalSource, setVitalSourceShow] = React.useState(false);
  const [vitalsourcetype, setVitalSourceType] = React.useState("URL");
  const [vitalsourceurlvalue, setVitalSourceURLValue] = React.useState(
    "http://localhost:5000/posts"
  );
  const [vitalsourcefilevalue, setVitalSourceFileValue] = React.useState(null);
  const [
    dropvitalsourcefilevalue,
    setDropVitalSourceFileValue,
  ] = React.useState(false);

  const handleClose = () => {
    setVitalSourceShow(false);
    childVitalSourceState(
      false,
      vitalsourceurlvalue,
      vitalsourcefilevalue,
      vitalsourcetype,
      dropvitalsourcefilevalue
    );
  };

  const handleRadioChange = (event) => {
    setVitalSourceType(event.target.value);
    //console.log(event.target.value);
  };

  const handleURLChange = (event) => {
    setVitalSourceURLValue(event.target.value);
  };

  const handleFileChange = (event) => {
    setVitalSourceFileValue(event.target.files[0]);
    //console.log(event.target.value);
    console.log(event.target.files[0]);
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
    setVitalSourceFileValue(fileEntry);
    setDropVitalSourceFileValue(true);
  };

  React.useEffect(() => {
    setVitalSourceShow(showVitalSourceDialog);
    setVitalSourceURLValue(selectedVitalURLSource);
    setVitalSourceFileValue(selectedVitalFileSource);
    setVitalSourceType(selectedVitalSourceType);
    setDropVitalSourceFileValue(dropVitalSourceFileValue);
  }, [
    showVitalSourceDialog,
    selectedVitalURLSource,
    selectedVitalFileSource,
    selectedVitalSourceType,
    dropVitalSourceFileValue,
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
      >
        <DialogTitle id="simple-dialog-title-3">Vitals Source</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="column"
            display="flex"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <h6>Set Vital Signs Data Source (URL or File Input):</h6>
                  <h6>(use drag and drop for reading files in real-time)</h6>
                </FormLabel>
                <RadioGroup
                  aria-label="vitalsource"
                  name="vsource"
                  value={vitalsourcetype}
                  onChange={handleRadioChange}
                >
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
                        style={{ width: 450 }}
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
                        style={{ width: 450 }}
                        fullWidth
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
                        style={{ width: 450 }}
                        fullWidth
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
                        style={{ width: 450 }}
                        fullWidth
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
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

export default VitalSourceModal;
