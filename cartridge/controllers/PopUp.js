"use strict";

/**
 * @namespace Home
 */

var server = require("server");
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var Session = require('dw/system/Session');

server.get(
  "getOfferTemplate",
  function (req, res, next) { 
  
    var customer =req.currentCustomer.profile
if(!customer){
  var template = new Template("popup/offerPopup");
  var context = new HashMap();
  var renderedTemplate = template.render(context).text;
  res.json({
    renderedTemplate: renderedTemplate,
  });
}
    next();
  }
);

module.exports = server.exports();
