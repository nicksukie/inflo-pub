var pageNumber = 1;

var loadMore = function() {
  pageNumber++;
  $.getJSON(
    "http://localhost:8000/users/getpages",
    {
      pageNumber: pageNumber
    },

    //DISPLAYED CB
    function(data) {
      // $("#result").text(data.result);
      console.log("hiii");
      for (let i = 0; i < data.length; i++) {
        append(data[i], "append");
      }
      bool = false;
      setTimeout(function() {
        bool = true;
      }, 1000);
    }
  );
};

let bool = true;
$(window).scroll(function() {
  if (
    $(window).scrollTop() + $(window).height() == $(document).height() &&
    bool
  ) {
    loadMore();
  }
});
