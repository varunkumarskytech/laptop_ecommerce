// int_yourcartridge/cartridge/scripts/middleware/authMiddleware.js
'use strict';

var Logger = require('dw/system/Logger');
var CustomerMgr = require('dw/customer/CustomerMgr');
var URLUtils = require('dw/web/URLUtils');

function authMiddleware(req, res, next) {
    if (req.currentCustomer.raw.authenticated) {
        Logger.info('User is authenticated');
        next();
    } else {
        Logger.warn('User is not authenticated');
        res.redirect(URLUtils.url('Login-Show'));
    }
    next();
}

module.exports = authMiddleware;
