import React from "react";
import TagsSection from "../Content/TagsSection";
import Content from "../Content/Content";
import ContentExpand from "../Content/ContentExpand";
import CommentsSection from "../Comments/CommentsSection";
class InteractionBlock extends React.Component {
  render() {
    this.storyID = this.props.storyID;
    return (
      <div className="cb_container-expand" id={"cb" + this.storyID}>
        <div className="cb_layout-expand">
          <TagsSection 
            storyID={this.props.storyID}
            category= {this.props.category}
          />
          <ContentExpand
            storyID={this.props.storyID}
            sourceLink={this.props.sourceLink}
            thumbnail={this.props.thumbnail}
            sourceName={this.props.sourceName}
            dateTime={this.props.dateTime}
            details={this.props.details}
            headline={this.props.headline}
          />
          <br />
          <CommentsSection
            comments={this.props.comments}
            addComment={this.props.addComment}
            setSortType = {this.props.setSortType}
          />
        </div>
      </div>
    );
  }
}

export default InteractionBlock;
