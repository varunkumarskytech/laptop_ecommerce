var Transaction = require('dw/system/Transaction');
var baseProductSearch = module.superModule; // Inherit from the original product search

var preferences = require('*/cartridge/config/preferences');
var collections = require('*/cartridge/scripts/util/collections');
var searchRefinementsFactory = require('*/cartridge/scripts/factories/searchRefinements');
/**
 * Retrieves search refinements
 *
 * @param {dw.catalog.ProductSearchModel} productSearch - Product search object
 * @param {dw.catalog.ProductSearchRefinements} refinements - Search refinements
 * @param {ArrayList.<dw.catalog.ProductSearchRefinementDefinition>} refinementDefinitions - List of
 *     product serach refinement definitions
 * @return {Refinement[]} - List of parsed refinements
 */
function getRefinements(productSearch, refinements, refinementDefinitions) {
    return collections.map(refinementDefinitions, function (definition) {
        var refinementValues = refinements.getAllRefinementValues(definition);
        var values = searchRefinementsFactory.get(productSearch, definition, refinementValues);

        return {
            displayName: definition.displayName,
            isCategoryRefinement: definition.categoryRefinement,
            isAttributeRefinement: definition.attributeRefinement,
            isPriceRefinement: definition.priceRefinement,
            isPromotionRefinement: definition.promotionRefinement,
            values: values
        };
    });
}

/**
 * Returns the refinement values that have been selected
 *
 * @param {Array.<CategoryRefinementValue|AttributeRefinementValue|PriceRefinementValue>}
 *     refinements - List of all relevant refinements for this search
 * @return {Object[]} - List of selected filters
 */
function getSelectedFilters(refinements) {
    var selectedFilters = [];
    var selectedValues = [];

    refinements.forEach(function (refinement) {
        selectedValues = refinement.values.filter(function (value) { return value.selected; });
        if (selectedValues.length) {
            selectedFilters.push.apply(selectedFilters, selectedValues);
        }
    });

    return selectedFilters;
}


var DEFAULT_PAGE_SIZE = preferences.defaultPageSize ? preferences.defaultPageSize : 12;
function getPagingModel(productHits, count, pageSize, startIndex) {
    var PagingModel = require('dw/web/PagingModel');
     var paging = new PagingModel(productHits, count);

    paging.setStart(startIndex || 0);
    paging.setPageSize(pageSize || DEFAULT_PAGE_SIZE);

    return paging;
}

function getPreviousUrl(productSearch,httpParams){
    var showMoreEndpoint = 'Search-UpdateGrid';
    var currentStart = httpParams.start || 0;
    var pageSize = httpParams.sz || DEFAULT_PAGE_SIZE;
    var hitsCount = productSearch.count;
    var nextStart;

    var paging = getPagingModel(
        productSearch.productSearchHits,
        hitsCount,
        DEFAULT_PAGE_SIZE,
        currentStart
    );

    if (pageSize >= hitsCount) {
        return '';
    } if (pageSize > DEFAULT_PAGE_SIZE) {
        nextStart = pageSize;
    } else {
        var endIdx = paging.getEnd();
        nextStart = endIdx - 23 < hitsCount ? endIdx -23: null;
    }

    paging.setStart(nextStart);

    var baseUrl = productSearch.url(showMoreEndpoint);
    var finalUrl = paging.appendPaging(baseUrl);
    return finalUrl;
}
/**
 * Overrides the copyShippingAddressToShipment method
 */
module.exports = function ProductSearch(productSearch, httpParams, sortingRule, sortingOptions, rootCategory) {
   baseProductSearch.call(this,productSearch, httpParams, sortingRule, sortingOptions, rootCategory);
   var previousUrl=  getPreviousUrl(productSearch,httpParams);

   this.previousUrl = previousUrl;
   

// Override the 'refinements' property
Object.defineProperty(ProductSearch.prototype, 'refinements', {
    get: function() {
        if (!this.cachedRefinements) {
            // Use a custom implementation or extend the base implementation
            this.cachedRefinements = getRefinements(
                this.productSearch,
                this.productSearch.refinements,
                this.productSearch.refinements.refinementDefinitions
            );
        }

        return this.cachedRefinements;
    }
});

// Override the 'selectedFilters' property
Object.defineProperty(ProductSearch.prototype, 'selectedFilters', {
    get: function() {
        return getSelectedFilters(this.refinements);
    }
});
};

