$('body').on('change', '#shippingCountrydefault', function () {
  // Get the selected option's ID
  var selectedOptionId = $(this).find('option:selected').attr('id');

  // Log the ID or use it in an AJAX request
  alert(selectedOptionId);

  $.ajax({
      url: 'State-GetStates',
      type: 'get',
      data: { country: selectedOptionId },
      success: function (response) {
          $('.shippingState').empty();

          // Add default placeholder option
          $('.shippingState').append('<option value="">Select State</option>');
          // Populate new state options
          if (response.states && response.states.length > 0) {
              $.each(response.states, function (index, state) {
             
                  $('.shippingState').append('<option  id="' + state.id + '" value="'+state.value+'"   >' + state.label + '</option>');
              });
          } else {
              // Optionally handle cases with no states
              $('.shippingState').append('<option value="">No states available</option>');
          }
      },
      error: function (xhr, status, error) {
        $('.shippingState').append('<option value="">No states available</option>');
          // Optionally handle error scenario
      }
  });

});