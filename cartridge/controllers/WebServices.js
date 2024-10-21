"use strict";

var server = require("server");
var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

server.get("ZipCode", function (req, res, next) {
  var svc = LocalServiceRegistry.createService("zipCodeServiceApi", {
    createRequest: function (svc, param) {
      svc.setRequestMethod("GET");
      return "";
    },
    parseResponse: function (svc, responseObject) {
      return JSON.parse(responseObject.text);
    },
  });
  var result = svc.call();
  var status = result.object;
  if (result.status == "OK") {
    res.render("webServices/zipCodeService", { status: status });
  } else {
    res.render("webServices/zipCodeService", { status: "error" });
  }
  next();
});

server.get("Universities", function (req, res, next) {
  var svc = LocalServiceRegistry.createService("universityServiceApi", {
    createRequest: function (svc, param) {
      svc.setRequestMethod("GET");
      return "";
    },
    parseResponse: function (svc, responseObject) {
      return JSON.parse(responseObject.text);
    },
  });
  var result = svc.call();

  var status = result.object;
  res.render("webServices/universityDetail", { universities: status });

  if (result.status == "OK") {
    res.render("webServices/universityDetail", { universities: status });
  }
  next();
});

server.get("ExchangeRateApi", function (req, res, next) {
  var svc = LocalServiceRegistry.createService("exchangeRateServiceApi", {
    createRequest: function (svc, param) {
      svc.setRequestMethod("GET");
      return "";
    },
    parseResponse: function (svc, responseObject) {
      return JSON.parse(responseObject.text);
    },
  });
  var result = svc.call();

  var status = result.object;
  res.render("webServices/exchangeRateApi", { exchangeRates: status });
  next();
});

server.get("PopulationService", function (req, res, next) {
  var svc = LocalServiceRegistry.createService("populationServiceApi", {
    createRequest: function (svc, param) {
      svc.setRequestMethod("GET");
      return "";
    },
    parseResponse: function (svc, responseObject) {
      return JSON.parse(responseObject.text);
    },
  });
  var result = svc.call();

  var status = result.object;
  res.render("webServices/populationService", { status: status });
  next();
});

server.get("UserInformationService", function (req, res, next) {
  var svc = LocalServiceRegistry.createService("userInformationServiceApi", {
    createRequest: function (svc, param) {
      svc.setRequestMethod("GET");
      return "";
    },
    parseResponse: function (svc, responseObject) {
      return JSON.parse(responseObject.text);
    },
  });
  var result = svc.call();

  var status = result.object;
  res.render("webServices/userInformationService", { status: status });
  next();
});

function postDataToDummyAPI(postData) {
  var svc = LocalServiceRegistry.createService("userPostServiceApi", {
    createRequest: function (svc, param) {
      svc.setRequestMethod("POST");
      svc.addHeader("Content-Type", "application/json");
      return JSON.stringify(postData);
    },
    parseResponse: function (svc, responseObject) {
      return JSON.parse(responseObject.text);
    },
  });

  var result = svc.call();

  if (result.status === "OK") {
    return result.object;
  } else {
    return false;
  }
}

module.exports = server.exports();
