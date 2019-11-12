// User selection input and dropdown

/* The big moment... passing URL from input to python. Hopefully this will result 
in saving the Scraped data to the server, which can then be used in the UI.
 Note: Later on, we will have to add sections in the DB for category and topics (array) for each story AND user(s) who shared it*/

//  function getURL() {
//     var URL = document.getElementById("URLinput").value;
//     console.log(URL);
// }



$(function() {
  $("#submitURL").bind("click", function() {
    $.getJSON(
      "http://localhost:8000/users/_scrapeAndReturnData",
      {
        url: $("#URLinput").val(),
        userID: current_user_id
      },

      //DISPLAYED CB
      function(data) {
        if (data == "") alert("No");
        else if (data.exists) {
          console.log(data);
          $("#sbiStoryID" + data.storyID).append(getUserText(data.user));
        } else append(data, "prepend");
      }
    );
  });
});
