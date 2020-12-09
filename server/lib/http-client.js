"use strict";

var https = require("https");
var request = require("request");

exports.get = function (options, callback) {
  request(
    {
      headers: options.headers,
      url: options.url,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        callback(null, data);
      } else {
        logger.error(error);
        callback(error, null);
      }
    }
  );
};

exports.httpsGet = function (options, callback) {
  https
    .get(options, function (res) {
      var result = "";
      res.on("data", function (data) {
        result += data.toString("utf-8");
      });
      res.on("error", function (error) {
        console.log("error found");
        console.log(error);
        callback(error, null);
      });
      res.on("end", function () {
        try {
          callback(null, result.toString("utf-8"));
        } catch (err) {
          console.log(err);
          callback(err, null);
        }
      });
    })
    .on("error", function (err) {
      callback(err, null);
    });
};

exports.post = function (options, callback) {
  request.post(
    {
      headers: { "content-type": "application/raw" },
      url: options.url,
      body: JSON.stringify(options.data),
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        callback(null, data);
      } else {
        logger.error(error);
        callback(error, null);
      }
    }
  );
};

exports.httpsRequest = function (options, callback) {
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200 && body) {
      var data = JSON.parse(body);
      callback(null, data);
    } else {
      logger.error(error);
      callback(error, null);
    }
  });
};
