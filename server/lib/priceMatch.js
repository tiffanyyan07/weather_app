"use strict";

const httpClient = require("./http-client");
const HTMLParser = require("node-html-parser");
const JSSoup = require("jssoup").default;
var async = require("async");

module.exports.getPrice = function getPrice(productname, model, callback) {
  async.waterfall(
    [
      //run multiple tasks which depends on the output of the previous task
      async.apply(getAmazonProductId, productname, model),
      getAmazonPrice,
    ],
    function (err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    }
  );
};
function getAmazonProductId(productname, model, callback) {
  let query = "keywords=" + productname + "+" + model;
  let path = "/s?" + query;
  console.log(path);
  let options = {
    headers: { "user-agent": "Mozilla/5.0", "Accept-Encoding": "br" },
    host: "www.amazon.ca",
    path: path,
  };
  httpClient.httpsGet(options, function (error, data) {
    if (error) {
      callback(error, null);
    }
    let productID = "";
    let root = HTMLParser.parse(data);
    let searchResults = root.querySelectorAll(".s-search-results");
    if (searchResults && searchResults[0] && searchResults[0].childNodes[1]) {
      let attrs = searchResults[0].childNodes[1].rawAttrs;
      let attrsArray = attrs.split(" ");
      productID = attrsArray[0].split('"')[1];
    }
    return callback(null, productID);
  });
}
function getAmazonPrice(projectID, callback) {
  console.log(projectID);
  let path = "/dp/" + projectID;
  let options = {
    headers: { "user-agent": "Mozilla/5.0", "Accept-Encoding": "br" },
    host: "www.amazon.ca",
    path: path,
  };
  httpClient.httpsGet(options, function (error, data) {
    if (error) {
      return callback(error);
    }
    if (data == null || data.length == 0) {
      return callback("no result");
    }
    const root = HTMLParser.parse(data);
    let price = root.querySelectorAll("#priceblock_ourprice");
    if (price == null || price.length == 0) {
      return callback(null, "no result");
    }
    let result = price.toString().split(">");
    result = result[1].split("<");
    console.log("result found");
    callback(null, result[0]);
  });
}

function getHomedepotPrice(projectID, callback) {
  let path = "/product/1001086957";
  let options = {
    headers: { "user-agent": "Mozilla/5.0", "Accept-Encoding": "br" },
    host: "www.homedepot.ca",
    path: path,
  };
  httpClient.httpsGet(options, function (error, data) {
    if (error) {
      return callback(error, null);
    }
    const root = HTMLParser.parse(data);
    let price = root.querySelectorAll("[itemprop=price]");
    if (price == null) {
      return callback(null, "no result");
    }
    let result = price.toString().split(">");
    result = result[1].split("<");
    return callback(null, result[0]);
  });
}
