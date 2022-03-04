import React, { Component } from "react";
//import logo from "./logo.svg";
//import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AppMenu from "./appmenu.jsx";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const theme = createMuiTheme();

    return (
      <div className="App" id="App">
        <ThemeProvider theme={theme}>
          <AppMenu />
        </ThemeProvider>
        ;
      </div>
    );
  }
}

export default App;
