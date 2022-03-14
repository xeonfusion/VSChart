import React, { Component } from "react";
//import logo from "./logo.svg";
//import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AppMenu from "./appmenu.jsx";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const theme = createTheme();

    return (
      <div className="App" id="App">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme} >
            <AppMenu />
          </ThemeProvider>
        </StyledEngineProvider>
        ;
      </div>
    );
  }
}

export default App;
