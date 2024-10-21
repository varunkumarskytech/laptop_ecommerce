"use strict";



/**
 * Update sort option URLs from Ajax response
 *
 * @param {string} response - Ajax response HTML code
 * @return {undefined}
 */
function updateSortOptions(response) {
  var $tempDom = $("<div>").append($(response));
  var sortOptions = $tempDom.find(".grid-footer").data("sort-options").options;
  sortOptions.forEach(function (option) {
    $("option." + option.id).val(option.url);
  });
}

  // Show more products
  $('.container').on('click', '.show-more button', function (e) {
      e.stopPropagation();
      var showMoreUrl = $(this).data('url');
      e.preventDefault();

      $.spinner().start();
      $(this).trigger('search:showMore', e);
      $.ajax({
          url: showMoreUrl,
          data: { selectedUrl: showMoreUrl },
          method: 'GET',
          success: function (response) {
              $(".product-tiles").remove();
              $('.grid-footer').replaceWith(response);
              updateSortOptions(response);
              $.spinner().stop();
          },
          error: function () {
              $.spinner().stop();
          }
      });
  });
