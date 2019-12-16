import React from "react";
import AddUrl from "./AddUrl";
import NotificationBar from "./NotificationBar";
import Profile from "./Profile";
import FloIcon from "../img/flo-icon.png";
class NavBar extends React.Component {
  render() {
    return (
      <div>
        <ul className="topnav">
          <a href="/">
            <img src={FloIcon} />
          </a>
          <li>
            <a className="dropdown" href="/">
              Dashboard
            </a>
          </li>
          {/*<li>
            <a href="#">Discover</a>
          </li>*/}
        </ul>
        <Profile />
        <NotificationBar />
        <AddUrl />
        <br />
        <br />
      </div>
    );
  }
}

export default NavBar;
