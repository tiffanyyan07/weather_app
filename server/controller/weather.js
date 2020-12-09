"use strict";

var url = require("url");
const httpClient = require("../lib/http-client");
const redisClient = require("../lib/redis-client");

module.exports.getWeather = function getWeather(req, res) {
  var myURL = url.parse(req.url, true);
  console.log("request received from: " + req.url);
  var city = myURL.query.city;
  city = city.charAt(0).toUpperCase() + city.slice(1);

  getData(city, function (error, result) {
    res.header("Access-Control-Allow-Origin", "*");
    if (error) {
      return res.json({ success: false, error: error });
    }
    //res.header("Access-Control-Allow-Origin", "*");
    return res.json({ success: true, result: result });
  });
};

function getData(city, callback) {
  getCache(city, function (res) {
    if (res != null) {
      console.log(city + " is found in cache", res);
      return callback(null, JSON.parse(res));
    } else {
      //look result from API
      console.log(city + " is not found in cache");

      //The path should be: api.openweathermap.org/data/2.5/weather?q=Toronto&appid=a81a958b06e01c3b52dceb840a381e32
      let path =
        "/data/2.5/weather?" +
        "q=" +
        city +
        "&" +
        "appid=a81a958b06e01c3b52dceb840a381e32&units=metric";

      let options = {
        headers: { "user-agent": "Mozilla/5.0", "Accept-Encoding": "gzip" },
        host: "api.openweathermap.org",
        path: path,
      };
      httpClient.httpsGet(options, function (error, data) {
        if (error) {
          return callback(error, null);
        } else if (JSON.parse(data).cod != 200) {
          return callback(JSON.parse(data), null);
        }
        //web server return as string, parse the data into JSON
        saveCache(city, data);
        var text = JSON.parse(data);
        return callback(null, text);
      });
    }
  });
}

async function getCache(key, callback) {
  console.log("getting cache for key: " + key);
  await redisClient.getAsync(key).then((res) => {
    if (res == null) {
      console.log(key + " is not exited in cache");
      return callback(null);
    }
    return callback(res);
  });
}

async function saveCache(key, value) {
  console.log("saving cache key: " + key + " value: " + value);
  await redisClient.setAsync(key, value, "EX", 3600);
}
