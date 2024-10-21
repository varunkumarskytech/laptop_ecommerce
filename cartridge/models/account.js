'use strict';

var baseAccount= module.superModule


var Customer = require('dw/customer/Customer');
var CustomerMgr = require('dw/customer/CustomerMgr');


module.exports = function account(currentCustomer, addressModel, orderModel){
    baseAccount.call(this,currentCustomer, addressModel, orderModel);
    if(currentCustomer.raw.registered){
    var customer = CustomerMgr.getCustomerByLogin(currentCustomer.profile.email);
    this.profile= customer.getProfile();
    }
}