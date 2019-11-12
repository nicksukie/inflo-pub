import React from "react";
class Content extends React.Component {
  render() {
    return (
      <div className="imagePlusInfo" id={"story" + this.props.storyID}>
        <div className="image_container">
          <img src={`${this.props.thumbnail}`} />
        </div>
        <div id="cb2-info" className="info">
          <h2 className="sourceAndDate">{`${this.props.sourceName}`}</h2>
          <h2 className="sourceAndDate">{`${this.props.dateTime}`}</h2>
          <p className="headline" >
            {this.props.headline}
            </p>
          <p className="description">
            {this.props.details}
          </p>
        </div>
      </div>
    );
  }
}
export default Content;
