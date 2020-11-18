"use strict";

const price = require("./price");
const priceMatch = require("../lib/priceMatch");

module.exports.getPrice = function getPrice(req, res) {
  //req.query.productname = "BRUNO-Peanuts-BOE070-ECRU-Compact-takoyaki";
  
  if (req && req.query && req.query.productname && req.query.model) {
    priceMatch.getPrice(req.query.productname, req.query.model, function (
      err,
      result
    ) {
      if (err) {
        return res.json({ success: false, error: err });
      }
      return res.json({ success: true, result: result });
    });
  } else {
    return res.json({
      success: false,
      error: "unable to retrieve product name",
    });
  }
};
