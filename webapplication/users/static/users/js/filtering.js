$(document).ready(function() {
  $(".check_box").change(function() {
    console.log($(".check_box:checked").length);
    if ($(".check_box:checked").length == 0) {
      $(".cb_container").show();
    } else {
      $(".cb_container").hide();
      $(".check_box:checked").each(function() {
        checkboxvalue = $(this).attr("value");
        console.log(checkboxvalue);
        $('div[cat="' + checkboxvalue + '"]').show();
        console.log($("#" + $(this).attr("value")));
      });
    }
  });
});
