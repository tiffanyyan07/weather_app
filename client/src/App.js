import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PriceMatch from "./Pages/pricematch";
import Routes from "./routes";
import axios from "axios";
import CLEAR from "./Images/clear.png";
import THUNDERSTORM from "./Images/thunderstorm.png";
import SNOW from "./Images/snow.png";
import RAIN from "./Images/rain.png";
import DRIZZLE from "./Images/drizzle.png";
import CLOUDS from "./Images/clouds.png";
import BAD from "./Images/bad.png";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { city: "" };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    //first phase : mount
    /* axios.get("http://localhost:3010/weather?city=Toronto").then((response) => {
      console.log(response.data);
    });*/
  }
  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleOnClick(event) {
    console.log("New Search");
    console.log(this.state.city);
    let path = "http://localhost:3010/weather?city=" + this.state.city;
    let image = document.getElementById("img");
    let p = document.getElementById("description");
    axios
      .get(
        //"https://api.openweathermap.org/data/2.5/weather?q=London&appid=a81a958b06e01c3b52dceb840a381e32&units=metric"
        path
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          const text = response.data.result;
          //console.log(text);
          console.log("success" + text.name);
          let output =
            text.name +
            " is " +
            text.weather[0].main +
            " has temperture " +
            text.main.temp +
            " in Celsius";
          let img;
          switch (text.weather[0].main) {
            case "Clear":
              img = CLEAR;
              break;
            case "Thunderstorm":
              img = THUNDERSTORM;
              break;
            case "Snow":
              img = SNOW;
              break;
            case "Rain":
              img = RAIN;
              break;
            case "Drizzle":
              img = DRIZZLE;
              break;
            case "Clouds":
              img = CLOUDS;
              break;
            default:
              img = CLEAR;
          }
          if (text.weather[0].main) image.setAttribute("src", img);

          p.textContent = output;
        } else {
          image.setAttribute("src", BAD);
          p.textContent = "Please Try Again2";
        }
      })
      .catch((error) => {
        console.log(error);
        image.setAttribute("src", BAD);
        p.textContent = "Please Try Again";
      });
  }

  render() {
    return (
      <div>
        <div className="title">
          <h1>Weather</h1>
        </div>

        <div>
          <div>
            <label>City Name</label>
            <input
              className="input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleOnClick}>SEND</button>
          </div>

          <div className="container">
            <img
              className="image"
              alt="weather logo"
              id="img"
              width="100px"
            ></img>
            <p className="description" id="description" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
