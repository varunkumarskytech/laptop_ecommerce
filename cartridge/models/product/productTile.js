'use strict';
var isTrending= require('*/cartridge/models/product/decorators/isTrending')

// Load the base module
var baseFullProduct = module.superModule;

/**
 * Decorate product with full product information with additional custom logic
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 *
 * @returns {Object} - Decorated product model
 */
module.exports = function fullProduct(product, apiProduct, options) {
    // Call the base fullProduct function
   baseFullProduct(product, apiProduct, options);
  

    // Add your custom decoration logic here
    // Example: Adding a custom decorator
    
    isTrending(product, apiProduct);
   
    return product;
};
