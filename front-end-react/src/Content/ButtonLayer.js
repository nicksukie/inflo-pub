import React from "react";
import Users from "./Users";
import Modal from "../Comments/Modal";
import CommentImage from "../img/comment.png";
import FeedStore from "../stores/FeedStore";
import LinkImage from "../img/link.png";
class ButtonLayer extends React.Component {
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
    return (
      <div className="cb_button-layer" storyID={this.storyID}>
        <div className="sharedbyicon">
          <Users users = {this.props.users}/>
        </div>
        <div className="buttonContain bottom_right_image">
          <img
            id="commentBtn1"
            src={CommentImage}
            onClick={event => {
              this.openComment(event, this);
            }}
          />
        </div>
        <a className="buttonContain"  target="_blank" rel="noopener noreferrer" href={`${this.props.sourceLink}`} >
          <img id="linkBtn1" src={LinkImage}/>
        </a>
        {this.state.modal}
      </div>
    );
  }
}
export default ButtonLayer;
