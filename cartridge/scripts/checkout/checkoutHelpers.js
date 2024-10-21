var Transaction = require('dw/system/Transaction');
var baseCheckoutHelpers = module.superModule; // Inherit from the original checkoutHelpers
var checkoutHelpers = Object.assign({}, baseCheckoutHelpers);

/**
 * Overrides the copyShippingAddressToShipment method
 */
checkoutHelpers.copyShippingAddressToShipment = function (address, shipmentOrNull) {

    Transaction.wrap(function() {
        
        // Call the original method
        baseCheckoutHelpers.copyShippingAddressToShipment(address, shipmentOrNull);
          
        // Add custom logic here
        if (address.alternatePhone) {
            shipmentOrNull.shippingAddress.custom.alternatePhone = address.alternatePhone; // Custom logic for alternate phone
        }
    });
};


module.exports = checkoutHelpers
