import React from "react";

class TagsSection extends React.Component {
  render() {
    return <div className="cb_top"><div className="cb_tag" id = "{this.props.storyID}">{this.props.category}</div></div>;  }
}
export default TagsSection;
