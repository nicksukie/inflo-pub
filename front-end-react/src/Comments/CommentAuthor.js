import React from "react";
import SignInImage from "../img/signinimage.png";
import FeedStore from "../stores/FeedStore";
class CommentAuthor extends React.Component {

  constructor(props){
    super(props);

    };
  
 

  render() {
    let commentType = "";
    if (this.props.commentType == "reply") commentType = "comment-reply";
    else commentType = "comment";
    return (
               

                

                <div className="commentAuthorContainer commentDataItem">
                <div className="commentImg"><a href="#"><img src={SignInImage} /></a></div>

               <div className="commentAuthorData">
                    <div className="commentAuthorName"><a href="#"><h2>by <span>{this.props.commentType}</span></h2>
                    </a></div>
       
                   <div className="commentAuthorDate"> <h4> on <span> {this.props.timeposted} </span></h4></div>
                </div>
              </div>


    );
  }
}

export default CommentAuthor;
