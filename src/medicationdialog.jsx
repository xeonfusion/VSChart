import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import MomentUtils from "@date-io/moment";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

class MedicationDlg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.isMedDisplayed ? <MedModal /> : null;
  }
}

function MedModal() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedDate, handleDateChange] = React.useState(new Date());

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Medication
      </Button>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                Selected Medications
                <ListGroup>
                  <ListGroupItem active>Midazolam</ListGroupItem>
                  <ListGroupItem>Fentanyl</ListGroupItem>
                  <ListGroupItem>Rocuronium</ListGroupItem>
                  <ListGroupItem>Dexamethasone</ListGroupItem>
                  <ListGroupItem>Ondansetron</ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">Left</Button>
                  <Button variant="secondary">Middle</Button>
                  <Button variant="secondary">Right</Button>
                </ButtonGroup>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                Add Medication
                <InputGroup className="mb-3">
                  <DropdownButton
                    as={InputGroup.Prepend}
                    title="Add"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item href="#">Propofol</Dropdown.Item>
                    <Dropdown.Item href="#">Lidocaine</Dropdown.Item>
                    <Dropdown.Item href="#">Fentanyl</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Rocuronium</Dropdown.Item>
                  </DropdownButton>
                  <FormControl aria-describedby="basic-addon1" />
                </InputGroup>
              </Col>
              <Col>
                <Row>Timestamp</Row>
                <Row>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      openTo="minutes"
                      format="DD/MM/YYYY hh:mm a"
                      variant="dialog"
                    />
                  </MuiPickersUtilsProvider>
                </Row>
              </Col>
              <Col>
                <Row>Duration</Row>
                <Row>Input</Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicationDlg;
