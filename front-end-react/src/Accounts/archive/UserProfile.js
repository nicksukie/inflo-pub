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
                date_joined: userinfo["date_joined"],
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
        <div className="UserHeader">
            <div className="userTextData">
                <h2 className="username">{this.state.username}</h2>
                    
            </div>
            <div className="profileImageContainer">
                <img src="#########" />
            </div>
        </div>
        <div className="userStats">
            <div className="userStat"><h4>Member Since: <span className="statDate" id="userImpactValue">{this.state.date_joined}</span></h4></div>
            <div className="userSubStats">
                <div className="userStat"><h4>Shares <span className="statValue" id="userImpactValue">{this.state.shares}</span></h4></div>
                <div className="userStat"><h4>Total Upvotes <span className="statValue" id="userCSratioValue"></span></h4></div>
            </div>
        </div>
      
        <div className="UserProfileContent">
            <div className = "sharehistory">
                <h3>Share History</h3>
            <div className="userTopics">
                <div className="cb_tag userTopic">                
                    <p>Politics <span className="topicCount" id="pol-count-user###">42</span></p>            
                </div>    
    
                <div className="cb_tag userTopic">                
                    <p>Business <span className="topicCount" id="bus-count-user###">35</span></p>            
                </div>       
    
                <div className="cb_tag userTopic">                
                    <p>Sports <span className="topicCount" id="spo-count-user###">20</span></p>            
                </div>       
    
                <div className="cb_tag userTopic">                
                    <p>Entertainment <span className="topicCount" id="ent-count-user###">4</span></p>            
                </div>      
    
                <div className="cb_tag userTopic">                
                    <p>Lifestyle <span className="topicCount" id="lif-count-user###">1</span></p>            
                </div>   
    
                </div>
            </div>
            <div className="historyList">
                <div className="histShareItemContainer">
                {this.state.userstories.map(userstory => {
                    return (
                        <MiniContentBlock
                            key = {userstory.storyid}
                            sourceLink={userstory.sourcelink}
                            thumbnail={userstory.thumbnail}
                            sourceName={userstory.sourceName}
                            date={userstory.date}
                            details={userstory.details.substring(0, 120) + "..."}
                            headline={userstory.headline}
                            firstCommentary = {userstory.firstcommentary.substring(0, 50) + "..."}
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

