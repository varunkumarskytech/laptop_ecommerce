"use strict";

/**
 * @namespace Contact
 */

var server = require("server");
var URLUtils = require("dw/web/URLUtils");
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Resource = require("dw/web/Resource");
var Transaction = require("dw/system/Transaction");

/**
 * ContactUs-Landing : This endpoint is called to load contact us landing page
 * @name Base/ContactUs-Landing
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.post("Submit", server.middleware.https, function (req, res, next) {
  var productId = req.form.productId;
  var email = req.form.email;

  if (!email) {
    res.json({
      error: true,
      msg: Resource.msg("error.missing.email", "notify", null),
    });
    return next();
  }

  var notifyData = CustomObjectMgr.getCustomObject("NotifyMe", productId);

  if (!notifyData) {

    Transaction.wrap(function () {
        notifyData = CustomObjectMgr.createCustomObject("NotifyMe",productId);
          notifyData.custom.email = JSON.stringify([email]);
      }
    );
   
  }
  
  else {
    var emailListArray = JSON.parse(notifyData.custom.email);
    if (emailListArray != null) {
      var emailToCheck = email;
      if (emailListArray.includes(emailToCheck)) {
        res.json({
          error: true,
          msg: "You are already registered.",
        });
        return next();
      }
    }
   
    Transaction.wrap(function () {
      var emailList =emailListArray;
      emailList.push(email);
      notifyData.custom.email = JSON.stringify(emailList);
    });
  
  }
  res.json({
    success: true,
    msg: "You will be notified when the product is available.",
  });

  next();
});
module.exports = server.exports();
