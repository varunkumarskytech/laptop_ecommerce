"use strict";

var server = require("server");
server.get("GetStates", function (req, res, next) {
  var a = req;
  var states = server.forms.getForm("states");
  var countryCode = req.httpParameterMap.country.stringValue;
  var stateGroup = states[countryCode];
  if (stateGroup) {
    res.json({
      success: true,
      states: stateGroup.stateCode.options
    });
  } else {
    res.json({
      error: true,
      msg: "No states found for the given country code",
    });
  }
  next();
});
module.exports = server.exports();
