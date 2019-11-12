import React from "react";
import Comment from "./Comment";
import CommentType from "./CommentType";
import FeedStore from "../stores/FeedStore";
class CommentsSection extends React.Component {
  constructor() {
    super();
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    this.state = {
      commentText: "",
      commentaryType: "",
      commentauthor: FeedStore.getUsername(),
      timestamp: today
    };

    this.getCommentaryType = this.getCommentaryType.bind(this);

  }

  getCommentaryType(event)
  {
    let index = event.nativeEvent.target.selectedIndex;
    let text = event.nativeEvent.target[index].text
    this.setState({ commentaryType: text });
  }
 
  render() {
    return (
      <div id="COMMENT-CONTAINER" className="comments_container">
      <div class="commentSectionHeader"><h4>Commentaries <span id="commentsNumber"></span></h4> 

        </div>
        {this.props.comments.map(comment => {
          return (
            <div className="existing_comments_container" key = {comment.commentid}>
              <Comment
                key = {comment.commentid}
                commentID={comment.commentid}
                timestamp={comment.timestamp}
                commentText={comment.text}
                storyID={comment.story}
                user={comment.user}
                votes={comment.votes}
                commentType={comment.commentaryType}
                commentauthor={comment.commentauthor}

              />
            </div>
          );
        })}

        <div className="flex_container">
          <textarea
            id="add-comment-box"
            type="text"
            placeholder="Write your own commentary"
            className="comment-input autofit"
            onChange={e => {
              this.setState({ 

                commentText: e.target.value 

              });
            }}
          />
        </div>
        <div className="postComment_container">
          <CommentType commentaryType = {this.getCommentaryType}/>
          <button
            id="submitComment"
            className="addurl"
            onClick={() => this.props.addComment(this.state.commentText, this.state.commentaryType, this.state.commentauthor, this.state.timestamp)}
          >
            Add Commentary
          </button>
          
        </div>
      </div>
    );
  }
}

export default CommentsSection;
