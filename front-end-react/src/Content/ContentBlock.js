import React from "react";
import TagsSection from "./TagsSection";
import ButtonLayer from "./ButtonLayer";
import Content from "./Content";
import Modal from "../Comments/Modal";
import CommentsSection from "../Comments/CommentsSection";
import FeedStore from "../stores/FeedStore";
class ContentBlock extends React.Component {

  constructor() {
        super();
        this.state = {
          showmodal: false,
          modal: ""
        };
        this.openComment = this.openComment.bind(this);
      }
      openComment(event, element) {
      this.setState(
          {
            showmodal: true,
            modal: <Modal storyID={this.props.storyID} key={this.props.storyID} />
          },
          function() {
          console.log(this.state.commentsSection);
          }
        );
      }
      componentWillMount() {
        FeedStore.on("removemodal", () => {
        this.setState({ showmodal: false, modal: "" });
    
        });
    
    
    }
  render() {
    this.storyID = this.props.storyID;
    return (
      <div className="cb_container" id={"cb" + this.storyID}>
        <div className="cb_layout">
        <TagsSection 
          storyID={this.props.storyID}
          category= {this.props.category}
        />
        <div onClick={event => {this.openComment(event, this);}}>
            <Content
              storyID={this.props.storyID}
              sourceLink={this.props.sourceLink}
              thumbnail={this.props.thumbnail}
              sourceName={this.props.sourceName}
              dateTime={this.props.dateTime}
              details={this.props.details}
              headline={this.props.headline}
              category={this.props.category}
              users = {this.props.users}
            />
          </div>
          <br />
          <ButtonLayer storyID={this.storyID} sourceLink={this.props.sourceLink} 
              users = {this.props.users}> </ButtonLayer>
        </div>
        {this.state.modal}
      </div>
    );
  }
}

export default ContentBlock;
