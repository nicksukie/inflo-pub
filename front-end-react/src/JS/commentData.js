function submitComment(element) {
    console.log($("#add-comment-box"));
  
  var commentStr = $("#add-comment-box").val();
  //prevent html injection
  commentStr = commentStr .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  //clear the textarea when comment is submitted
  $(".comment-input").val("");
  
  }