import React from "react";
class ContentSettings extends React.Component {
  render() {
    return (
      <div className="content_view">
        <div className="content_view-nav">
          {/*<button className="button-left" id="filtertogglebtn">
            Filter
          </button>*/}
          <div className="community-select-topnav-div">
            {/*<select id="COMMUNITY-SELECT-TOPNAV" className="community_selector">
              <option value="myNet">Public</option>
              <option value="Comm1" disabled="disabled">
                My Network
              </option>
              </select>*/}
          </div>
          <div className="cb_layout-header">
            <h2 class="dashboard_title" id="category-title-1" >Inflo Dashboard</h2>
            <p>Sort By:</p>
            <select id="sort-select" className="sortselector" onChange={e => this.props.setSortSelection(e)}>
              <option value="recent">Most Recently Shared</option>
              <option value="recent">Most Recently Published</option>
            </select>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ContentSettings;
