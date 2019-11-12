import React from "react";
import ContentArea from "./Content/ContentArea";
import NavBar from "./NavBar/NavBar";
import Filter from "./Filter/Filter";
import { onScrollBottom } from "./Content/ContentArea";

class Feed extends React.Component {
  render() {
    let handleScroll = e => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        onScrollBottom();
        console.log("bottommm");
      }
    };
    return (
      <div>
        <NavBar />
        <div className="main" onScroll={e => handleScroll(e)}>
          <Filter />
          <ContentArea />
        </div>
      </div>
    );
  }
}

export default Feed;
