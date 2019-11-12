import React from "react";
import SignInImage from "../img/signinimage.png";
export default class NotificationBar extends React.Component {
  render() {
    return (
      <div className="dropdown">
        <a href="/account"><img className="dropbtn" src={SignInImage} /></a>
        {/*<div className="dropdown-content">
          My Profile
        </div>*/}
      </div>
    );
  }
}
