import React from "react";
import Notif from "../img/notif1.png";
import FeedStore from "../stores/FeedStore";
export default class NotificationBar extends React.Component {

  constructor(props){
    super(props);
    this.getNotifications = this.getNotifications.bind(this);

    this.state = {
      Notifications:[],
    };
  }

  getNotifications()
  {
    fetch(
      FeedStore.getsiteprefix() + "getNotification", {
        method: 'GET',
        withCredentials: false,

        headers: {
        'Authorization': 'Bearer ' + FeedStore.getToken(),
        }
      }
    ).then(res => res.json())
    .then(
      result => {
        for(let index in result)
          this.setState({Notifications: [result[index], ...this.state.Notifications]});
      }
    );
  }

  componentWillMount()
  {
    this.getNotifications();
  }
  render() {
    let imgStyle = { float: "right" };
    return (
      <div id="notif-menu-container" className="notif-container">
        <img id="NOTIF-ICON" src={Notif} style={imgStyle} />
        <div id="notif-MENU" className="notif-contents">
          <h2>Activity</h2>
          {this.state.Notifications.map(Notification => {
            return(
              <div className="notif-item">
          <div className="notif-item-description">
                <h3>{Notification.text}: <span className="notif-item-headline">{Notification.headline}</span></h3>
                </div>
                <div className="notif-item-time">
                <h5>{Notification.time}</h5>
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    );
  }
}
