function getModalHtmlElement() {
  var htmlString =
    "<!-- Modal -->" +
    '<div id="loginPopup" class="login-popup modal fade" tabindex="-1" role="dialog">' +
    "</div>";
  $("body").append(htmlString);
}

$(document).ready(function () {
  $.ajax({
    url: "PopUp-getOfferTemplate",
    type: "GET",
    dataType: "json",
    success: function (response) {
      // Show the login popup modal\
      setTimeout(function () {
        getModalHtmlElement();
        $("#loginPopup").html(response.renderedTemplate);
        $("#loginPopup").modal("show");
      }, 3000);
    },
    error: function (error) {},
  });
  // Function to show the login popup
});
