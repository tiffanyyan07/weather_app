"use strict";

var url = require("url");
const httpClient = require("../lib/http-client");

module.exports.getWeather = function getWeather(req, res) {
  var myURL = url.parse(req.url, true);
  console.log("request received:");
  console.log(req.url);
  //console.log(myURL.query);
  //console.log(myURL.query.city);
  getData(myURL.query.city, function (error, result) {
    if (error) {
      return res.json({ success: false, error: error });
    }
    res.header("Access-Control-Allow-Origin", "*");
    return res.json({ success: true, result: result });
  });
};

function getData(city, callback) {
  let path =
    "/data/2.5/weather?" +
    "q=" +
    city +
    "&" +
    "appid=a81a958b06e01c3b52dceb840a381e32&units=metric";
  //api.openweathermap.org/data/2.5/weather?q=Toronto&appid=a81a958b06e01c3b52dceb840a381e32
  console.log(path);
  let options = {
    headers: { "user-agent": "Mozilla/5.0", "Accept-Encoding": "gzip" },
    host: "api.openweathermap.org",
    path: path,
  };
  httpClient.httpsGet(options, function (error, data) {
    if (error) {
      return callback(error, null);
    }
    var text = JSON.parse(data);
    //console.log(text);
    return callback(null, text);
  });
}
