import React from "react";
export default class CommentType extends React.Component {
  render() {
    return (
      <div className="postComment_container newshare-fromURL-commentType">
        <select id="sort-select" className="typeselector">
          <option value="Discussion">Discussion</option>
          <option value="Quote">Quote</option>
          <option value="Sentiment">Sentiment</option>

          <div>{/*emotional response*/}</div>
          <option value="Question">Question</option>
          <option value="Perspective">Perspective</option>

          <div>{/*point out bias or an alternative view*/}</div>

          <option value="Context/Background">Big Picture</option>
          <div>{/*Context/Background*/}</div>

          <option value="Fact Check">Fact Check</option>
          <option value="Related">Related</option>

          <div>{/*link to relevant info*/}</div>
        </select>
        <p>Comment Type:</p>
      </div>
    );
  }
}
