import React from "react";
import InteractionBlock from "../InteractionBlock/InteractionBlock";
import FeedStore from "../stores/FeedStore";
class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      story: {},
      sortType: "Most Recent"
    };

    this.addComment = this.addComment.bind(this);
    this.setSortType = this.setSortType.bind(this);
  }

  addComment(text, type, author, date) {
    if(type == "")
      type = "Discussion"
    $(".comment-input").val('');
    let sendData = {
      storyID: this.props.storyID,
      text: text,
      commentaryType: type,
      commentauthor: author,
      timestamp: date
    };
    console.log("hiii");

    fetch(
      FeedStore.getsiteprefix() + "storecomment", {
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(sendData),
      headers: {
        'Authorization': 'Bearer ' + FeedStore.getToken(),
        }
    }).then(res => res.json())
    .then(
      result => {
        sendData['commentid'] = result;
        console.log(result);
      }
    );
    this.setState({ comments: [...this.state.comments, sendData] });
    console.log(this.state.story);
  }

  fetchComments() {
    console.log("Test" + this.state.sortType)
    fetch(
      FeedStore.getsiteprefix() + "getcomments?" +
        "storyID=" +
        this.props.storyID + "&sortType=" + this.state.sortType, {
      method: "GET",
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + FeedStore.getToken(),
        }
    }).then(res => res.json())
      .then(
        result => {
          for (var r in result) {
            if (r == 0) this.setState({ story: result[r] });
            else
              this.setState({ comments: [...this.state.comments, result[r]] });
          }
          this.state.story.details =
            this.state.story.details + "... (Click to read full article)";
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  setSortType(event){
    let index = event.nativeEvent.target.selectedIndex;
    let text = event.nativeEvent.target[index].text

    if(text == "")
      text = "Most Recent"
    this.setState({ comments:[], sortType: text },
      function(){
        this.fetchComments();
      });
  }
  componentDidMount() {
    // below is to change the URL for the expanded modal
    //history.pushState({}, "", FeedStore.getUsername() + "/" + this.props.storyID);
    this.fetchComments();
          window.onclick = function(event) {
        //console.log(event.target.id);
        if (event.target.id.substr(0, 5) == "modal") {

          FeedStore.removeModal();
          // below is to go back to the root url after closing the modal
          history.pushState({}, "", "/");
        } else {
          //console.log("nope");
        }
      };

  }
  render() {
    return (
      <div className="modal" id = "modal">
        <br />
        <br />
        <br />
        <span
          className="close"
          onClick={() => {
            FeedStore.removeModal();
            // below is to go back to the root url after closing the modal
            //history.pushState({}, "", "/");
          }}
        >
          &times;
        </span>
        <InteractionBlock

          storyID={this.state.story.storyid}
          sourceLink={this.state.story.sourcelink}
          thumbnail={this.state.story.thumbnail}
          sourceName={this.state.story.source}
          dateTime={this.state.story.date}
          details={this.state.story.details}
          headline={this.state.story.headline}
          comments={this.state.comments}
          addComment={this.addComment}
          category= {this.state.story.category}
          setSortType = {this.setSortType}
        />
        <div> {/*beginning of comments container*/} </div>
      </div>
    );
  }
}

export default Modal;
