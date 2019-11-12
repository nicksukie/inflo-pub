import React from "react";
import Comment from "./Comment";


class CommentsSection extends React.Component {
  constructor() {
    super();

    this.state = {
      commentText: ""
    };
  }

  render() {
    return (
      <div id="COMMENT-CONTAINER" className="comments_container">
      <div class="commentSectionHeader"><h4>Commentaries (<span id="commentsNumber">4</span>)</h4> 
        <select class="selector">
        <option value="recent">Most Recent</option>
              <option value="recent">Most Upvotes</option>
              <option value="mostactivity">Most Endorsements</option>
              <option value="recentactivity">Most Responses</option>
</select>
        </div>
        {this.props.comments.map(comment => {
          return (
            <div className="existing_comments_container">
              <Comment
                commentID={comment.commentid}
                timestamp={comment.timestamp}
                commentText={comment.text}
                storyID={comment.story}
                userID={comment.user}
                commentType="comment"
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
              this.setState({ commentText: e.target.value });
            }}
          />
        </div>
        <div className="postComment_container">
          <button
            id="submitComment"
            className="addurl"
            onClick={() => this.props.addComment(this.state.commentText)}
          >
            Add Commentary
          </button>
          <select id="sort-select" class="selector">
            <option value="Discussion">Discussion</option>
            <option value="Context">Context</option>
            <option value="Alt. Perspective">Perspective</option>
            <option value="Fact Check">Fact Check</option>
          </select>
          <p>Commentary Type:</p>
        </div>
      </div>
    );
  }
}

export default CommentsSection;
