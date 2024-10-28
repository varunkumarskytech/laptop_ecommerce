// int_yourcartridge/cartridge/controllers/SecureController.js
'use strict';

var server = require('server');
var authMiddleware = require('*/cartridge/scripts/middleware/authMiddleware');

server.get('Dashboard', authMiddleware, function(req, res, next) {
    // Controller logic for authenticated users
    res.render('secure/dashboard');
    next();
});

module.exports = server.exports();
