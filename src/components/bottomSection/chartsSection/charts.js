import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { observer, inject } from "mobx-react";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import Store from "../../../stores/Store";
import AreaCharts from "./AreaCharts";
import RainCharts from "./RainCharts";
import PrecipitationChart from "./PrecipitationChart";

import "./style.scss";

const Charts = inject("Store")(
  observer(props => {
    // console.log("Charts props ", props.Store.historialWeatherData);
    const { data } = props.Store.historialWeatherData;
    //console.log("Charts props ", this.props.props.Store.historialWeatherData);
    console.log("Charts props ", data);
    let colorText = props.props.theme.palette.secondary.white;

    let historicaldataArray = props.Store.historialWeatherData;
    let historicaldataArrayLength = props.Store.historialWeatherData.data;
    console.log("historical data array ", historicaldataArray);
    let array = [];

    const arrayData = async () => {
      for (let i = 0; i < historicaldataArrayLength.length; i++) {
        console.log(
          "max temp array ",
          historicaldataArray.data[i].temperature_max
        );
        array.push([
          historicaldataArray.data[i].temperature_max,
          historicaldataArray.data[i].month
        ]);
      }
    };

    console.log("array", array);
    const maxTempData = async () => {
      await arrayData();
      if (array.length === 0) {
        console.log("array no adata");
        return;
      } else {
        console.log("array has adata");
        for (let i = 0; i < historicaldataArray.length; i++) {
          array.push(historicaldataArray.data[i].temperature_max);
        }
        let max = array.reduce(function(prev, current) {
          return prev > current ? prev : current;
        });

        Store.maxTempDataChart = max;

        console.log("maxTemp Store ", Store.maxTempDataChart);
        // console.log("array 2 ", max);
      }
    };
    // console.log("Array Max Temp ", array);
    maxTempData();
    return (
      <Router>
        <Toolbar>
          <Grid container>
            <Grid container>
              <Grid item>
                <Button
                  variant="contained"
                  color={colorText}
                  className="buttomRouter"
                >
                  <Link to="/" root>
                    Home
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color={colorText}
                  className="buttomRouter"
                >
                  <Link to="/about">About</Link>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color={colorText}>
                  <Link to="/tempData">Tempeture</Link>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color={colorText}
                  className="buttomRouter"
                >
                  <Link to="/rainDaysData" className="buttomRouter">
                    Rain
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color={colorText}>
                  <Link to="/precipitationData">Precipitation</Link>
                </Button>
              </Grid>

              <Grid item>
                <Button variant="contained" color={colorText}>
                  <Link to="/contact">Contact</Link>
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/tempData" component={TempData} props={data} />
                  <Route path="/rainDaysData" component={RainDaysData} />
                  <Route
                    path="/precipitationData"
                    component={PrecipitationData}
                  />
                  <Route path="/contact" component={Contact} />
                </Switch>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Router>
    );
  })
);

export default Charts;

// Home Page
const Home = () => (
  <Grid item xs={12}>
    <HomeText />
  </Grid>
);
// About Page
const About = () => (
  <Fragment>
    <h1>About</h1>
    <ContactText />
  </Fragment>
);
// Temp Data Page
const TempData = inject("Store")(
  observer(props => {
    console.log("temp data ", Store);
    const { data } = Store.historialWeatherData;

    // let maxTempView = "Max Temp " + Store.maxTempDataChart[0];
    //let maxTempYearView = "Year " + Store.maxTempDataChart[1];
    //let maxTempDataView = maxTempView + ", " + maxTempYearView;

    return (
      <Card>
        <CardHeader title="Temp Data" />

        <CardContent>
          <AreaCharts />
        </CardContent>
      </Card>
    );
  })
);

// Temp Data Page
const RainDaysData = inject("Store")(
  observer(props => {
    const { data } = Store.historialWeatherData;

    console.log("Store RainDays ", Store);

    return (
      <Card>
        <RainCharts props={props} />
      </Card>
    );
  })
);

// Temp Data Page
const PrecipitationData = inject("Store")(
  observer(props => {
    const { data } = Store.historialWeatherData;

    return (
      <Card>
        <PrecipitationChart />
      </Card>
    );
  })
);
// Contact Page
const Contact = () => (
  <Fragment>
    <h1>Contact</h1>
    <ContactText />
  </Fragment>
);

const ContactText = () => <p>App development by Pedro Davim</p>;

const HomeText = () => (
  <>
    <h3>Farm Weather</h3>
    <p>Welcome to Weather App</p>
  </>
);
