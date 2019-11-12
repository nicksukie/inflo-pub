$(document).ready(function() {
  // Make all links open in new tab
  $("a").attr("target", "_blank");

  // Get the checkbox
  /*var checkBox_Politics = document.getElementById("checkbox-pol");
  pol = $("#checkbox-pol").val();
  var checkBox_Business = document.getElementById("checkbox-bus");
  bus = $("#checkbox-bus").val();
  var checkBox_Entertainment = document.getElementById("checkbox-ent");
  ent = $("#checkbox-ent").val();
  var checkBox_Tech = document.getElementById("checkbox-tech");
  tech = pol = $("#checkbox-tech").val();
  var checkBox_Sports = document.getElementById("checkbox-sport");
  sport =  $("#checkbox-sport").val();
  //console.log(pol)

  // If the checkbox is checked, display the output text
  var catArray = [pol, bus, ent, tech, sport];
  for (var i=0; i < catArray.length; i++) {
  	console.log('checkBox_'+ catArray[i]);
  	cat = 'checkBox_'+ catArray[i];
  	//console.log(cat.checked == false);
  	if (cat.checked == true){
  	
    	if ($('.cb_container').find("h6").innerHTML == catArray[i]) {

    	$('.cb_container').hide();}
    }
   else {$('.cb_container').show();}
    };


    });*/

  //setting details length of initial stories
  divs = $(".storyDetails");
  for (let i = 0; i < divs.length; i++) {
    divs[i].innerText = divs[i].innerText.substring(0, 120) + "...";
  }

  function shareUserCB() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("shareUserUL");
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  function shareUserAddURL() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById("AddURL-userInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("AddURL-shareUserUL");
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  //Create dynamic content input box size (from stackoverflow: https://stackoverflow.com/questions/23818131/dynamically-expand-height-of-input-type-text-based-on-number-of-characters-typ#23819536)
  //This span is used to measure the size of the textarea
  //it should have the same font and text with the textarea and should be hidden
  var measurer = $("<span>", {
    style:
      "display:inline-block;word-break:break-word;visibility:hidden;white-space:pre-wrap;"
  }).appendTo("body");
  function initMeasurerFor(textarea) {
    if (!textarea[0].originalOverflowY) {
      textarea[0].originalOverflowY = textarea.css("overflow-y");
    }
    var maxWidth = textarea.css("max-width");
    measurer
      .text(textarea.text())
      .css("max-width", maxWidth == "none" ? textarea.width() + "px" : maxWidth)
      .css("font", textarea.css("font"))
      .css("overflow-y", textarea.css("overflow-y"))
      .css("max-height", textarea.css("max-height"))
      .css("min-height", textarea.css("min-height"))
      .css("min-width", textarea.css("min-width"))
      .css("padding", textarea.css("padding"))
      .css("border", textarea.css("border"))
      .css("box-sizing", textarea.css("box-sizing"));
  }
  function updateTextAreaSize(textarea) {
    textarea.height(measurer.height());
    var w = measurer.width();
    if (textarea[0].originalOverflowY == "auto") {
      var mw = textarea.css("max-width");
      if (mw != "none") {
        if (w == parseInt(mw)) {
          textarea.css("overflow-y", "auto");
        } else {
          textarea.css("overflow-y", "hidden");
        }
      }
    }
  }
  $("textarea.autofit").on({
    input: function() {
      var text = $(this).val();
      if ($(this).attr("preventEnter") == undefined) {
        text = text.replace(/[\n]/g, "<br>&#8203;");
      }
      measurer.html(text);
      updateTextAreaSize($(this));
    },
    focus: function() {
      initMeasurerFor($(this));
    },
    keypress: function(e) {
      if (e.which == 13 && $(this).attr("preventEnter") != undefined) {
        e.preventDefault();
      }
    }
  });
});
