var server = require('server');
server.extend(module.superModule);  // Extends the original controller

server.append('SubmitShipping', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var URLUtils = require('dw/web/URLUtils');
    var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
    var currentBasket = BasketMgr.getCurrentBasket();

    if (!currentBasket) {
        return next();
    }
    

    var form = server.forms.getForm('shipping');
    var alternatePhone = form.shippingAddress.addressFields.alternatePhonenumber.value;
     var  result={
        alternatePhone: alternatePhone
    };
    res.setViewData(result)
   
    this.on('route:BeforeComplete', function (req, res) {
        // Add any additional processing or validation if necessary before completing the route
        var shippingData = res.getViewData();
        COHelpers.copyShippingAddressToShipment(
            shippingData,
            currentBasket.defaultShipment
        );
    });

    return next();
});

module.exports = server.exports();
