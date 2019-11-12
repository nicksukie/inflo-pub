import React from "react";
class ContentExpand extends React.Component {
  render() {
    return (
      <div className="imagePlusInfo-expand" id={"story"  + this.props.storyID}>
        <a id="linktest" target="_blank" rel="noopener noreferrer" href={`${this.props.sourceLink}`}>
          <div className="image_container-expand">
            <img src={`${this.props.thumbnail}`} />
          </div>
        </a>
        <a id="cb2-info" className="info"  target="_blank" rel="noopener noreferrer" href={`${this.props.sourceLink}`}>
            <h2 className="sourceAndDate">{this.props.sourceName}</h2>
            <h2 className="sourceAndDate">{this.props.dateTime}</h2>
            <p className="headline">
                {this.props.headline}
            </p>
            <p className="description">
                {this.props.details}
            </p>
        </a>
      </div>
    );
  }
}
export default ContentExpand;