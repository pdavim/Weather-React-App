//IMPORT REACT AND OTHER LIBRARIES
import React, { Component } from "react";
import { Provider } from "mobx-react";
import { observer } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";

//IMPORT MATERIA UI COMPONENTS

import Grid from "@material-ui/core/Grid";
import Store from "./stores/Store";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

//IMPORT EXTERNAL STYLESHEETS
//import "./App.css";
import "./sass/app.scss";

//IMPORT CUSTOM COMPONENTS
import TopSection from "./components/topSection/topSection";
import BottomSection from "./components/bottomSection/bottomSection/index";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";

//IMPORT FUNCTIONS

const stores = { Store };

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "OpenSans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    subtitle1: {
      fontSize: 12
    },
    body1: {
      fontWeight: 300
    },
    button: {
      fontStyle: "regular"
    },
    h3: {
      fontSize: "1.2rem"
    },
    h2: {
      fontSize: "1.4rem"
    },
    h1: {
      fontSize: "1.6rem"
    },
    h4: {
      fontSize: "1.0rem"
    }
  },

  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  title: {
    primary: {
      weigth: 900
    },
    secondary: {
      weigth: 900
    }
  },
  palette: {
    primary: {
      light: "#a6d4fa",
      main: "#90caf9",
      dark: "#aa647b",
      contrastText: "#fff",
      textLight: "white"
    },
    secondary: {
      headerBackground: "#336699",
      footerBackground: "#336699",
      sidebarBackground: "#336699",
      topSectionBackground: "#336699",
      bottomSectionBackground: "#336699",
      background: "#00A6ED",
      alert: "#f6511d",
      lightWarm: "#F3A712",
      light: "#FFB400",
      main: "#336699",
      dark: "#0D2C54",
      contrastText: "#7FB800",
      other: "#0D2C54",
      white: "#ffffff",
      greyLight: "#BFBFBF"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#ffcc00"
    },

    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "#ffcc00"
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#ffcc00"
    },
    sucess: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "#ffcc00"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

const App = observer(
  class App extends Component {
    async updateWeather() {
      let appState = stores.Store;
      stores.Store.isLoading = true;
      // console.log("isLoading", appState.isLoading);
      await appState.getData(appState.cityName);
      stores.Store.isLoading = false;
    }

    componentDidMount() {
      // Accepts a Date object or date string that is recognized by the Date.parse() method
      const { eventEmitter } = this.props;
      let appState = stores.Store;
      console.log("this.props.isGeolocationAvailable ", this.props);
      // console.log("props ", state);
      // console.log("appState ", appState);

      this.updateWeather();
      // console.log("appstate ", appState);
      //console.log("Store", stores);
      // console.log("props ", state);

      eventEmitter.on("updateWeather", async Mydata => {
        appState.activeCity = Mydata;
        console.log("Mydata ", Mydata);
        await this.updateWeather();
      });
    }
    render() {
      let themeA = responsiveFontSizes(theme);
      return (
        <Provider {...stores}>
          <ThemeProvider theme={themeA}>
            <Router>
              <Grid container spacing={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Header
                      updateWeather={this.updateWeather}
                      eventEmitter={this.props.eventEmitter}
                      theme={themeA}
                      props={stores}
                    />
                  </Grid>
                  <Grid />
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid className="topSection" item xs={8}>
                      {stores.Store.isLoading === true ? (
                        <h3>Loading Data...</h3>
                      ) : stores.Store.isLoading === false ? (
                        <TopSection
                          theme={themeA}
                          props={stores.Store}
                          updateWeather={this.updateWeather}
                          eventEmitter={this.props.eventEmitter}
                        />
                      ) : (
                        <h3>No Data</h3>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <Sidebar
                        theme={themeA}
                        updateWeather={this.updateWeather}
                        eventEmitter={this.props.eventEmitter}
                      />
                    </Grid>

                    <Grid className="bottomSection" item xs={12}>
                      {stores.Store.loadingHistorical === true ? (
                        <h3>Loading Data...</h3>
                      ) : stores.Store.loadingHistorical === false ? (
                        <BottomSection
                          theme={themeA}
                          props={stores.Store}
                          updateWeather={this.updateWeather}
                          eventEmitter={this.props.eventEmitter}
                        />
                      ) : (
                        <h3>No Data</h3>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Router>
          </ThemeProvider>
        </Provider>
      );
    }
  }
);

export default App;
