"use strict";

function displayMessage(data, form) {
  $.spinner().stop();
  var status;
  if (data.success) {
    status = "alert-success";
  } else {
    status = "alert-danger";
  }

  $(".notifyPopup").css("display", "none");

  $(".notify-btn").append(
    '<div class="notify-us-signup-alert text-center ' +
      '" role="alert" style="display: inline-block; padding: 10px;background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; margin-left:170px">' +
      "</div>"
  );

  $(".notify-us-signup-alert").append(
    '<div class="notify-us-signup-alert-box text-center ' +
      status +
      '" role="alert">' +
      data.msg +
      "</div>"
  );

  setTimeout(function () {
    $(".notify-us-signup-alert").remove();
    $("button.notify-me").css("display", "block");
  }, 3000);
}

  $("body").on("click", ".notify-me", function (e) {
    e.preventDefault();
    var notifyPopup = $(".notifyPopup");
    notifyPopup.css("display", "block");
    $("button.notify-me").css("display", "none");
  });




  $("body").on("submit", ".notifyForm", function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    var button = $('.notify-me');
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: form.serialize(),
        success: function (data) {
            displayMessage(data, form);
        },
        error: function (err) {
            displayMessage(err, button);
        }
    });
});
