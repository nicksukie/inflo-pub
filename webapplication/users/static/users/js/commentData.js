function addComment(data, newComment) {
  console.log(data);
  text = "";
  if (newComment == 1) {
    storyID = data;
    sendData = {
      storyID: storyID,
      text: $("#add-comment-box").val(),
      
      userID: current_user_id
    };
    $.ajax({
      url: "http://localhost:8000/users/storecomment",
      type: "post",
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        console.log("doneee");
      },
      data: JSON.stringify(sendData)
    });
    text = $("#add-comment-box").val();
  } else text = data.text;
  //add username, profile image from DB
  $("#COMMENT-CONTAINER").prepend(
    `<div id="commentID" class="comment">        
      <img src=` +
      image_signin +
      `>
      <span> User A </span>
      <h6 id="commentType">Related</h6>
      <p id="commentText">` +
      text +
      `
      </p>  
      
      <div id="rrc1" class="react-respond-comment"> 
        <p id="Upvote" class="updownvote">Upvote</p>            
        <p id="Downvote" class="updownvote">Downvote</p>            
        <p id="Respond" class="respond">Respond</p>        
      </div>        
      
      <div id="newComment" class="comment-reply-input">        
        <img src=` +
      image_signin +
      `><span>You!</span>       
        <input id="response-input" type="text" placeholder="Write a response" class="comment-response-input">    
      </div>    
    </div>
    
    <!-- Following div: To append to upon new comment creation -->     
    <div class="replies_container">  
    </div>`
  );
}

function openComment(storyID) {
  $.getJSON(
    "http://localhost:8000/users/getcomments",
    {
      storyID: storyID,
      userID: current_user_id
    },

    //DISPLAYED CB
    function(data) {
      
      var i = 0;
      for (index in data) {
        if(i != 0)
          addComment(data[index]);
        else
          i=1;
        console.log(data[index])
      }
    }
  );

  console.log("appended");
  $(document.body).append(
    `<div class="modal" id="modal-cb` +
      storyID +
      `" > 
      <br><br><br>
      <span class="close">&times;</span> 
      <div class="cb_container-expand" id="CB-container1-expand" >
        <div class= "cb_layout-expand"  id="CB1" >                     
          <div class="cb_top">          
            <div class="cb_tag">                
              <p>tag1</p>            
            </div>            
            <div class="cb_tag">                
              <p>tag2</p>            
            </div>            
            <div class="cb_tag">                
              <p>tag3</p>            
            </div>            
            <div class="cb_tag">                
              <p>+5</p>            
            </div>            
            <div class="more"><img src="` +
      image_more +
      `">
            </div>        
          </div>  
          <div class="image_container-expand" id="image-expand">
      <img id="CB-expand-img" src=""></div>                            
      <div id="cb1-info" class="info-expand">                                                            
      <h2 id="SOURCE-expand">CNN  - </h2>
      <h2 id="DATETIME-expand">May 21, 13:54</h2>                                
      <a id="HEADLINE-expand" class="headline-expand " href=""></a>    
      <a class="description" id="DESCRIPTION-expand" href="http://www.bloomberg.com"></a> 
      </div>
      <br>   
      <div id="BUTTONLAYER" class="cb_button-layer-expand">                                    
      <div class=\'sharedby_user expand\'><img id="sharedby_user1" src="` +
      image_signin +
      `"><h5 class="sharedby_text" id="SHAREDBY2">Shared by User A on <span id="timePosted-cb-expand">
      </span>
      </h5>
      </div> 
      <div class="buttonContain" id="commentBtnContain-expand">
      <img id="commentBtn1" src="` +
      image_comment +
      `">
      </div>                                
      </div>                                        
      <!-- beginning of comments container -->    
      <div id="COMMENT-CONTAINER" class="comments_container">    
        <div class="existing_comments_container">    
          <div id="commentID" class="comment">        
            <img src="` +
      image_signin +
      `"><span> User A </span>        
      <h6 id="commentType">Related</h6>        
      <p>This is soooo interesting and insightful. I read about a similar story here: <a href="">www.news.pocky.com/trump-does-it-again</a></p>  
      <div id="rrc1" class="react-respond-comment"> 
      <p id="Upvote" class="updownvote">Upvote</p>            
      <p id="Downvote" class="updownvote">Downvote</p>            
      <p id="Respond" class="respond">Respond</p>        
      </div>        
      <div id="newComment" class="comment-reply-input">        
      <img src="` +
      image_signin +
      `"><span>You!</span>        
      <input id="response-input" type="text" placeholder="Write a response" class="comment-response-input">    
      </div>    
      </div><!-- Following div: To append to upon new comment creation -->     
      <div class="replies_container">     
      <div id="replyID" class="comment-reply">        
      <img src="` +
      image_signin +
      `"><span>User B</span> 
      <p>Thanks for the link! I hadn\'t heard about that before.</p>
      <div id="rrc1" class="react-respond-comment">            
      <p id="Upvote" class="updownvote">Upvote</p>            
      <p id="Downvote" class="updownvote">Downvote</p>            
      <p id="Response_respond" class="respond">Respond</p>        
      </div>    
      <div id="newComment" class="comment-reply-input">        
      <img src="` +
      image_signin +
      `"><span>You!</span>        
      <input id="response-input" type="text" placeholder="Write a response" class="   comment-response-input">    
      </div>    
      </div>    
      </div>
      </div>            
      <div class="flex_container">
        <textarea id="add-comment-box" type="text" placeholder="Comment on User A\'s share" class="comment-input autofit">
        </textarea>
      </div>    
      <div class="postComment_container">            
        <button id="submitComment" class="addurl" onclick="addComment(` +
      storyID +
      `, 1)";>Post</button>                   
          <select id=\'sort-select\' class="selector">            
            <option value="Discussion">Discussion</option>           
            <option value="Quote">Quote</option>            
            <option value="Sentiment">Sentiment</option> <!-- emotional response -->            
            <option value="Question">Question</option>            
            <option value="Perspective">Perspective</option>        
            <!-- point out bias or an alternative view --> <option value="Context/Background">Big Picture</option>  
            <!-- /*Context/Background*/ -->        
            <option value="Fact Check">Fact Check</option>        
            <option value="Related">Related</option>  <!-- link to relevant info-->     
          </select> <p>Comment Type:</p></div>                            
        </div>            
      <!-- end of comments container --></div></div></div>`
  );

  $("#HEADLINE-expand").text(loadedArticles[storyID].headline);
  $("#DESCRIPTION-expand").text(
    loadedArticles[storyID].details.substring(0, 120) + "..."
  );
  $("#CB-expand-img").attr("src", loadedArticles[storyID].thumbnail);
  $("#SOURCE-expand").text(loadedArticles[storyID].sourceName);
  $("#DATETIME-expand").text(loadedArticles[storyID].date);
  $("#timePosted-cb-expand").text(loadedArticles[storyID].timePosted);

  $("#DESCRIPTION-expand").attr("href", loadedArticles[storyID].sourceURL);
  $("#HEADLINE-expand").attr("href", loadedArticles[storyID].sourceURL);
  $("#image-expand").attr("href", loadedArticles[storyID].sourceURL);
}
