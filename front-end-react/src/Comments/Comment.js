import React from "react";
import Author from "./CommentAuthor"
import SignInImage from "../img/signinimage.png";
import FeedStore from "../stores/FeedStore";
class Comment extends React.Component {

  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.user = this.props.user

    var vote;
    var ballotUp;
    var ballotDown;

    if (!isNaN(this.props.votes))
      vote = this.props.votes;
      ballotUp = this.props.ballotUp
      ballotDown = this.props.ballotDown

    this.state = {
      votes:vote,
      ballotUp:1,
      ballotDown: 1,


    };

    //below would put the looged in user as the author of every comment
    //this.username = FeedStore.getUsername()
  }




  handleVote(e, type) {

    fetch(
      FeedStore.getsiteprefix() + "storevote?commentid=" + this.props.commentID + "&type=" + type, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
        'Authorization': 'Bearer ' + FeedStore.getToken(),
        }
      }
    );



    var origVal = parseInt(this.state.votes)
    if(type == "up" && this.state.ballotUp > 0)
    {

      this.setState({

        votes:origVal+1,
        ballotDown:2,

      });
      this.state.ballotUp-=1

      console.log('up=' + this.state.ballotUp)
    }
    else if (type == "down" && this.state.ballotDown > 0)
    {
      console.log('orig='+ origVal)
      this.setState({
        votes:origVal-1,
        ballotUp:2,
      });
      this.state.ballotDown-=1

      console.log('down=' + this.state.ballotDown)
    }

  }

  render() {

    let commentType = "";
    if (this.props.commentType == "reply") commentType = "comment-reply";
    else commentType = "comment";
    return (
        <div id="commentID" className={commentType}>
          <div className="typeRow">
            <p className="commentType" id="commentType">
              {this.props.commentType}
            </p>
          </div>

          <div className="scoreAndBody">
            {/*<div className="scoreContain">
              <div className="commentVote" id="voteUp" onClick = {(e) => this.handleVote(e, "up")}><svg fill="#bbc0c4" aria-hidden="true" className="svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36">
                <g
     transform="translate(0,-264.775)"
     id="layer1">
    <path

       d="M 17.658047,275.01962 -0.01842455,292.69609 H 5.7452428 v 4.19175 H 17.665547 c -0.01565,-7.4157 -0.0012,-40.17301 -0.01441,0.13106 v -0.13106 h 11.920298 v -4.19175 h 5.763664"
       id="path821" />
  </g>
</svg></div>
              <p className="insightScore" id="insightID-cb">{this.state.votes}</p>
              <div className="commentVote" id="voteDown" onClick = {(e) => this.handleVote(e, "down")}><svg fill="#bbc0c4" aria-hidden="true" className="svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><g
     transform="translate(0,-269.775)"
     id="layer1">
    <path

       d="M 17.658047,297.0189 -0.01842455,279.34243 H 5.7452428 v -4.19175 H 17.665547 c -0.01565,7.4157 -0.0012,40.17301 -0.01441,-0.13106 v 0.13106 h 11.920298 v 4.19175 h 5.763664"
       id="path821" />
  </g></svg></div>
            </div>*/}

            <div className="commentBody"> <div className="comment-text-container"> <p
  className="comment-text">{this.props.commentText}</p> </div>
<div className="commentDataContainer">
              <div className="commentData"> {/*<div className="commentRespond
              commentDataItem disabled"
              id="COMMENTRESPOND###"><h4>Respond</h4></div>*/} {/*<div
              class="commentEndorse commentDataItem"
              id="COMMENTENDORSE###"><button>Endorse</button></div>*/}

                  <div className="commentAuthorContainer commentDataItem">
                  <div
                  className="commentImg"><img src={SignInImage} /></div>

                 <div className="commentAuthorData"> <div
                 className="commentAuthorName"><h2>by
                 <span> {this.props.commentauthor}</span></h2> </div>

                     <div className="commentAuthorDate"> <h4> on <span>
                     {this.props.timestamp} </span></h4></div> </div> </div>
                     </div>

            </div>



          </div>
        </div>
        </div>

    );
  }
}

export default Comment;
