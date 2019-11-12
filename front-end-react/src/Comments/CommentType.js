import React from "react";
export default class CommentType extends React.Component {
  
  render() {
    
    return (
      <div className="postComment_container newshare-fromURL-commentType">
               
        <p className="commentaryTypeHeader">Commentary Type: </p>
        <select id="sort-select" className="typeSelector" onChange={e => this.props.commentaryType(e)}>
          <option value="Discussion">Discussion</option>
          <option value="Highlight">Highlight</option>
          <option value="Fact Check">Fact Check</option>
          <option value="Bias Check">Bias Check</option>
          <option value="Related">Related</option>
          <option value="Opinion">Opinion</option>
          <option value="Other">Other</option>
        </select>


      </div>
    );
  }
}
