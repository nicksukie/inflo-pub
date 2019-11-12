import React from "react";
import CommentType from "../Comments/CommentType";
import { updateContentArea } from "../Content/ContentArea";
import { addUsertoStory } from "../Content/ContentArea";
import FeedStore from "../stores/FeedStore";
class AddUrl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      URLvalue: "",
      CommentaryType:"Discussion",
      CommentaryText:"",
      showMessage: false,
    };

    this.submitURLHandleClick = this.submitURLHandleClick.bind(this);
    this.updateURLInputValue = this.updateURLInputValue.bind(this);
    this.getCommentaryType = this.getCommentaryType.bind(this);
    this.getCommentText = this.getCommentText.bind(this);
  }
  submitURLHandleClick() {

    if ($(".URLinput").val() == "") {alert("please enter a URL")}
    else if ($("#add-comment-box-new-story").val() == "") {alert("please enter a Commentary")
    }
    else {
    $('#ADDURL-MENU').removeClass('show');
    $("#processingMsg").show();
      this.setState({showMessage: true});
      console.log('sent');

      fetch(
        FeedStore.getsiteprefix() + "_scrapeAndReturnData?url=" + this.state.URLvalue + "&commentaryType=" + this.state.CommentaryType
        + "&commentaryText=" + this.state.CommentaryText, {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
          'Authorization': 'Bearer ' + FeedStore.getToken(),
          }
        }
      ).then(res => res.json())
      .then(
        data => {
          if (data == "") {{alert("You've already shared this article.")};
          $("#processingMsg").hide();
          }
          else if (data == "Not News" || data.isnews== "False") {{alert("Sorry, this type of content is not supported. Please share a news article.")};
          $("#processingMsg").hide();
          }
          else if (data.exists) {
            console.log("existsss")
            addUsertoStory(data.user, data.storyID);
            $("#processingMsg").hide();
          } else {
            updateContentArea(data);
      $("#processingMsg").hide();
          }
          $(".URLinput").val(''),
          $(".comment-input-fromURL").val('')

        } );
      }
  }
  updateURLInputValue(e) {
    this.setState({ URLvalue: e.target.value });
  }

  getCommentaryType(event)
  {
    let index = event.nativeEvent.target.selectedIndex;
    let text = event.nativeEvent.target[index].text
    if(text == "")
      text = "Discussion"
    this.setState({ CommentaryType: text });
  }

  getCommentText(event)
  {
    let commentaryText = event.target.value;
    this.setState({ CommentaryText: commentaryText });
  }

  render() {
    const showMessage = this.state.showMessage;
  let message;
  if (showMessage) {

    message = <div className="floatingContainer" id="processingMsg"><div className="topfloatingmessage"><p>You're submitted article is being processed. Please wait. This could take up to a minute.</p></div></div>
  }
  else {message = <div/>};

  
    return (
      <div id="addURL-menu-container" className="addURL-container">
        <button id="ADDURL" className="addurl button">
          New Share
        </button>
        {message}
        <div id="ADDURL-MENU" className="addURL-contents">
          <h4>Share from URL:</h4>
          <div className="shareTo-AddURLMenu-div flex_container ">
            <input
              className="URLinput"
              type="text"
              placeholder="www.news.com/news"
              onChange={e => this.updateURLInputValue(e)}
            />
            <div className="newshare-fromURL">
              <textarea
                id="add-comment-box-new-story"
                type="text"
                placeholder="Add a commentary"
                className="comment-input-fromURL newShare autofit"
                onChange = {e => this.getCommentText(e)}
              />
            </div>
            <CommentType commentaryType = {this.getCommentaryType}/>
            <div>
            {/*<div className="radioSection sharetoUsersection">
              <h4>Share to:</h4>
              <label className="container">
                Public
                <input
                  id="MYNETWORK"
                  type="radio"
                  name="shareto-radio"
                />
                <span className="checkmark" />
              </label>

              <label className="container">
                My Network
                <input
                  id="USER"
                  type="radio"
                  name="shareto-radio"
                  value="user"
                  disabled="disabled"
                />
                <span className="checkmark" />
                </label>              
              </label>
    */}
              <button
                id="submitURL"
                className="button submiturl"
                onClick={this.submitURLHandleClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddUrl;
