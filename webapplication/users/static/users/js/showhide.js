$(document).ready(function() {
  /* TO change the topnav layout to fixed when scrolling (NOT USED) */

  var tn = $(".topnav");
  tns = "topnav-scrolled";
  tnh = $("topnav").height();

  $(window).scroll(function() {
    if ($(this).scrollTop() > 5) {
      tn.addClass("topnav-scrolled");
    } else {
      tn.removeClass("topnav-scrolled");
    }
  });

  /* Show and hide menus */

  $(".upbtn").on("click", event => {
    $(event.target)
      .siblings("#myUpmenu")
      .toggleClass("show");
  });

  $(document).click(function(e) {
    $("#upContain")
      .not($("#upContain").has($(e.target)))
      .children("#myUpmenu")
      .removeClass("show");
  });

  $("#sharebtn").on("click", event => {
    $(event.target)
      .siblings("#myDownmenu")
      .toggleClass("show");
  });

  $(document).click(function(e) {
    $("#downContain")
      .not($("#downContain").has($(e.target)))
      .children("#myDownmenu")
      .removeClass("show");
  });

  /*Quickshare menu */

  $("#sharebtn").on("click", event => {
    $(event.target)
      .siblings("#share-menu")
      .toggleClass("show");
    $("#share-user-menu").removeClass("show");
  });

  $(document).click(function(e) {
    $("#share_container")
      .not($("#share_container").has($(e.target)))
      .children("#share-menu")
      .removeClass("show");
  });

  $("#shareto").click(function() {
    $("#share-user-menu").toggleClass("show");
    $("#share-menu").removeClass("show");
  });

  $(document).click(function(e) {
    $(".share_container")
      .not($(".share_container").has($(e.target)))
      .children(".sharedown-content")
      .removeClass("show");
  });

  $(".shareBtnContain").click(function() {
    $(".share_container").toggleClass("show");
  });

  $(document).click(function(e) {
    $("#quickshare-menu")
      .not($("#quickshare-menu").has($(e.target)))
      .children(".sharedown-content")
      .removeClass("show");
  });

  $(document).click(function(e) {
    $(".share_container")
      .not($(".share_container").has($(e.target)))
      .children(".sharedown-content")
      .removeClass("show");
  });

  $(".addurl").on("click", event => {
    $(event.target)
      .siblings(".addURL-contents")
      .toggleClass("show");
  });

  $(document).click(function(e) {
    $(".addURL-container")
      .not($(".addURL-container").has($(e.target)))
      .children(".addURL-contents")
      .removeClass("show");
  });

  $("#IMPACT-ICON").on("click", event => {
    $(event.target)
      .siblings(".impact-contents")
      .toggleClass("show");
  });

  $(document).click(function(e) {
    $(".impact-container")
      .not($(".impact-container").has($(e.target)))
      .children(".impact-contents")
      .removeClass("show");
  });

  $("#NOTIF-ICON").on("click", event => {
    $(event.target)
      .siblings("#notif-MENU")
      .toggleClass("show");
  });

  $(document).click(function(e) {
    $(".notif-container")
      .not($(".notif-container").has($(e.target)))
      .children(".notif-contents")
      .removeClass("show");
  });

  /*document.getElementById("myUpmenu").addEventListener('click',function(event){
    event.stopPropagation();
});


document.getElementById("mySharedown").addEventListener('click',function(event){
    event.stopPropagation();
}); */

  $("#shareToUserBtn").click(function() {
    $("#C, #S").toggle();
    $("#shareUser").toggleClass("show");
  });

  $("#C").click(function() {
    $("#S, #shareToUserBtn").toggle();
    $("#shareComm").toggleClass("show");
  });

  $(".filtertoggle").click(function() {
    $(".filterhouse, .filterpanel").toggle();

    $(".filtertoggle").toggleClass("open");
  });

  $("#filtertogglebtn").click(function() {
    $(".filterhouse, .filterpanel").toggle();

    $(".filtertoggle").toggleClass("open");
  });

  /* $('.commentbutton').click(function() {

$('#CB-container1').toggleClass('cb_container-expand');
	$('#CB1').toggleClass('cb_layout-expand');
	$('.commentbutton').toggleClass('.commentbutton-expand')

	$('.image_container').toggleClass('image_container-expand')

	$('#COMMENT-CONTAINER-t1cb1').slideToggle();
		$('#t1').toggleClass('category_container-expand')

}); 

$('#IPI').click(function() {
	
$('#CB-container1').toggleClass('cb_container-expand');
	$('#CB1').toggleClass('cb_layout-expand');
	$('.commentbutton').toggleClass('.commentbutton-expand')

	$('.image_container').toggleClass('image_container-expand')

	$('#COMMENT-CONTAINER-t1cb1').slideToggle();
	$('#t1').toggleClass('category_container-expand')


$(document).click(function(e) {
  $('#IPI')
    .not($('#IPI').has($(e.target)))
    $('#cb1-modal').toggle();
});
});

*/

  /* Open Expanded CB in MODAL (twitter) style
$('#IPI').click(function() {
	$('#cb1-modal').toggle()
});

$('.close').click(function() {
	$('#cb1-modal').toggle()
});
 */

  $("#Respond").click(function() {
    $("#newComment").toggleClass("show");
  });

  /* Show hide share to options (community, user(s) */

  $('input[type="radio"]').click(function() {
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(".AddURLMenu-div")
      .not(targetBox)
      .hide();
    $(targetBox).show();
  });

  /*Reshare section show/hide */
  $("#commentAndShare").click(function() {
    $("#cb1-modal").show();
    $("#shareBtnContain-expand").css("background-color", "#f7f7f7");
    $("#commentBtnContain-expand").css("background-color", "white");
    $(".reshare_container").show();
    $(".comments_container").hide();
    $(".expand").hide();
  });

  /*Comments section show/hide */
  $("#commentBtnContain").click(function() {
    $("#cb1-modal").show();
    $("#commentBtnContain-expand").css("background-color", "#f7f7f7");
    $("#shareBtnContain-expand").css("background-color", "white");
    $(".comments_container").show();
    $(".reshare_container").hide();
    $(".expand").show();
  });

  $("#shareBtnContain-expand").click(function() {
    $("#shareBtnContain-expand").css("background-color", "#f7f7f7");
    $("#commentBtnContain-expand").css("background-color", "white");
    $(".reshare_container").show();
    $(".comments_container").hide();
    $(".expand").hide();
  });

  $("#commentBtnContain-expand").click(function() {
    $("#commentBtnContain-expand").css("background-color", "#f7f7f7");
    $("#shareBtnContain-expand").css("background-color", "white");
    $(".reshare_container").hide();
    $(".comments_container").show();
    $(".expand").show();
  });
});

//var modalElement = document.getElementById(modalID);
window.onclick = function(event) {
  console.log(event.target.id);
  if (event.target.id.substr(0, 5) == "modal") {
    $("#" + event.target.id).remove();
  } else {
    console.log("nope");
  }
};
