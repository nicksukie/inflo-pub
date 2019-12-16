import React from "react";
import NavBar from "../NavBar/NavBar";
import MiniContentBlock from "./CB"
import FeedStore from "../stores/FeedStore";

export default class UserProfile extends React.Component {

constructor(props) {
    super(props);

    this.state = {
        userstories: [],
        username: "",
        shares: 0,
        date_joined: "",
    };
    //this.username = FeedStore.getUsername()
    }
componentDidMount()
{
    fetch(
        "http://127.0.0.1:8000/users/getuserstories?user=" + FeedStore.getUsername()
    ).then(result => result.json())
    .then(
        stories =>
        {
            let temp = []
            for (let idx in stories)
            {
                temp.push(stories[idx])
            }
            console.log(temp)
            this.setState({userstories: [...this.state.userstories, ...temp]})
        }
    );

    fetch(
        "http://127.0.0.1:8000/users/getuserinfo?user=" + FeedStore.getUsername()
    ).then(result => result.json())
    .then(
        userinfo =>
        {
            this.setState({
                username: userinfo["full_name"],
                shares: userinfo["shares"],
                date_joined: userinfo["date_joined"].substring(0,10),
                email: userinfo["date_joined"],
            })
        }
    );

}

  render() {

    return (

    <div>
        <NavBar />
        
        <div className="profile">

        <div className="userInfo">


          <div className="UserHeader">
              <div className="userTextData">
                      <h2 className="username">{this.state.username}</h2>




            <div className="userStats">
                <div className="userStat"><h4>Member Since: <span className="statDate" id="userImpactValue">{this.state.date_joined}</span></h4></div>
                <div className="userSubStats">
                    <div className="userStat"><h4>Shares: {this.state.shares}</h4></div>
                    <div className="userStat"></div>
                </div>
                </div>
              </div>



          <div className="profileImageContainer">
                <img src="#########" />
            </div>


          </div>
            </div>

        <div className="UserProfileContent">
            <div className = "sharehistory">
                <h3>Share History</h3>
            </div>
            <div className="historyList">
                <div className="histShareItemContainer">
                {this.state.userstories.map(userstory => {
                    return (
                        <MiniContentBlock
                            key = {userstory.storyid}
                            sourceLink={userstory.sourcelink}
                            thumbnail={userstory.thumbnail}
                            source={userstory.source}
                            pubdate={userstory.date.substring(0, 10)}
                            postdate={userstory.timeposted.substring(0, 10)}

                            details={userstory.details.substring(0, 120) + "..."}
                            headline={userstory.headline}
                            firstCommentary = {userstory.firstcommentary.substring(0, 200)}
                        />
                    );
                    })}
                </div>
            </div>

        </div>
        </div>
        </div>
    );
  }
  }
