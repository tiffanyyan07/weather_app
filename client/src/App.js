import React, { Component } from "react";
import axios from "axios";
import CLEAR from "./Images/clear.png";
import THUNDERSTORM from "./Images/thunderstorm.png";
import SNOW from "./Images/snow.png";
import RAIN from "./Images/rain.png";
import DRIZZLE from "./Images/drizzle.png";
import CLOUDS from "./Images/clouds.png";
import BAD from "./Images/bad.png";
import WELCOME from "./Images/welcome.png";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { city: "" };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleOnClick() {
    let path = "http://localhost:3010/weather?city=" + this.state.city;
    /*
    let path =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      this.state.city +
      "&appid=a81a958b06e01c3b52dceb840a381e32&units=metric";
*/
    let body = document.getElementById("body");

    let block = document.getElementById("block");
    if (block === null) {
      let block = document.createElement("div");
      block.setAttribute("id", "block");
      block.setAttribute("className", "media-body");
      block.style.display = "block";

      let head = document.createElement("h4");
      head.setAttribute("id", "header");
      head.setAttribute("className", "mt-0");
      block.appendChild(head);

      let weather = document.createElement("p");
      weather.setAttribute("id", "weather");
      weather.style = "text-align:center";
      block.appendChild(weather);
      body.appendChild(block);
    }

    axios
      .get(path)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let image = document.getElementById("img");
        let message = document.getElementById("message");
        if (response.data.success === true) {
          const text = response.data.result;
          console.log("Response received for search " + text.name);

          var weather = document.getElementById("weather");
          weather.innerHTML =
            "Current Temperture is " +
            text.main.temp +
            "°" +
            "<br></br>" +
            "H:" +
            text.main.temp_max +
            "° " +
            " L:" +
            text.main.temp_min +
            "°";

          var head = document.getElementById("header");
          let img;
          switch (text.weather[0].main) {
            case "Thunderstorm":
              img = THUNDERSTORM;
              head.innerText = text.name + " has thunderstorm";
              break;
            case "Snow":
              img = SNOW;
              head.innerText = text.name + " is snowing";
              break;
            case "Rain":
              img = RAIN;
              head.innerText = text.name + " is rainning";
              break;
            case "Drizzle":
              img = DRIZZLE;
              head.innerText = text.name + " is drizzling";
              break;
            case "Clouds":
              img = CLOUDS;
              head.innerText = text.name + " is cloudy";
              break;
            default:
              img = CLEAR;
              head.innerText = text.name + " has clear sky";
          }
          image.setAttribute("src", img);
          message.hidden = true;
          if (block != null && block.style.display === "none") {
            block.style.display = "block";
          }
        } else {
          //let message = document.getElementById("message");
          image.setAttribute("src", BAD);
          message.innerHTML = response.data.error.message;
          message.hidden = false;
          if (block != null && block.style.display === "block") {
            block.style.display = "none";
          }
        }
      })
      .catch((error) => {
        let block = document.getElementById("block");
        let image = document.getElementById("img");
        let message = document.getElementById("message");
        if (block != null && block.style.display === "block") {
          block.style.display = "none";
        }

        console.log(error);
        image.setAttribute("src", BAD);

        message.textContent = error;
        message.hidden = false;
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <h1 className="display-4">Weather</h1>
        </div>
        <div className="container">
          <div>
            <label>City Name</label>
            <input
              className="input-group mb-3"
              type="text"
              placeholder="please enter a valid city name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleOnClick}
            >
              SEND
            </button>
          </div>
        </div>
        <div className="center">
          <div id="body" className="media">
            <div className="media-left media-middle">
              <img
                id="img"
                className="align-self-center mr-3"
                alt="weather logo"
                src={WELCOME}
                width="100px"
              ></img>
            </div>

            <p id="message">WELCOME TO MY APP</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
