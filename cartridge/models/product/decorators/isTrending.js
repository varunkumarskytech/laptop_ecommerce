'use strict';

module.exports = function (object, apiProduct) {
  Object.defineProperty(object, 'isTrending', {
    enumerable: true,   
    value: apiProduct.custom.isTrending
  });
};