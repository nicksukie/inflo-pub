import React from "react";
import FeedStore from "../stores/FeedStore";
import Feed from "../Feed";

class Filter extends React.Component {

    func() {
    $(document).ready(function() {
      $(".check_box").change(function() {
        console.log($(".check_box:checked").length);
        if ($(".check_box:checked").length == 0) {
          $(".cb_container").show();
        } else {
          $(".cb_container").hide();
          $(".check_box:checked").each(function() {
            checkboxvalue = $(this).attr("value");
            console.log(checkboxvalue);
            $('div[cat="' + checkboxvalue + '"]').show();
            console.log($("#" + $(this).attr("value")));
          });
        }
      });
    });
  }

  constructor(props){
    super(props);
    this.categoryChanged = this.categoryChanged.bind(this);
    this.viewAll = this.viewAll.bind(this);
    
  }
  categoryChanged(event) {
    FeedStore.setFilterCategory(event.target.value, event.target.checked);
    console.log(event.target.value, event.target.checked)
  }



  viewAll() {

    FeedStore.setFilterCategory("all");
    console.log("allcats")

  }

  render() {
    let filterstyle = { display: "block" };
    return (
      <div>
        <div className="filterhouse" style={filterstyle}>
          <div className="filterpanel">
            <h1>Filter Options</h1>

            <div className="category-selection">
              
              <h2>Categories</h2>
              <h3 id="cat-all" onClick = {() => {this.viewAll()}} >View All</h3>

              <form onChange = {(e) => {this.categoryChanged(e)}}>
                <label className="cat-list-container">
                  Politics
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Politics"
                    id="checkBox_politics"
                  />
                  <span className="cat-checkmark" />
                </label>
                <label className="cat-list-container">
                  Business
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Business"
                    id="checkBox_Business"
                  />
                  <span className="cat-checkmark" />
                </label>
                <label className="cat-list-container">
                  Tech
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Tech"
                    id="checkBox_Tech"
                  />
                  <span className="cat-checkmark" />
                </label>
                <label className="cat-list-container">
                  Science
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Science"
                    id="checkBox_Science"
                  />
                  <span className="cat-checkmark" />
                </label>
                <label className="cat-list-container">
                  World
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="World"
                    id="checkBox_World"
                  />
                  <span className="cat-checkmark" />
                </label>

                <label className="cat-list-container">
                       Law
                        <input
                          className="check_box"
                          type="checkbox"
                          name="cat"
                          value="Law"
                          id="checkBox_Law"
                        />
                        <span className="cat-checkmark" />
                      </label>

                <label className="cat-list-container">
                  Entertainment
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Entertainment"
                    id="checkBox_Entertainment"
                  />
                  <span className="cat-checkmark" />
                </label>

                <label className="cat-list-container">
                  Sports
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Sports"
                    id="checkBox_Sports"
                  />
                  <span className="cat-checkmark" />
                </label>

                <label className="cat-list-container">
                  Lifestyle
                        <input
                          className="check_box"
                          type="checkbox"
                          name="cat"
                          value="Lifestyle"
                          id="checkBox_Lifestyle"
                        />
                        <span className="cat-checkmark" />
                      </label>
       
                <label className="cat-list-container" />

                <label className="cat-list-container">
                  Misc
                  <input
                    className="check_box"
                    type="checkbox"
                    name="cat"
                    value="Misc"
                    id="checkBox_Misc"
                  />
                  <span className="cat-checkmark" />
                </label>

              </form>
            </div>

            {/*<div className="topic-selection">
              <h2>Trending Topics</h2>
              <ul>
                <li>World Cup</li>
                <li>Fathers Day</li>
                <li>DragonBoatFestival</li>
                <li>Earthquake</li>
                <li>China</li>
              </ul>

              <input
                className="input"
                id="search-box"
                type="text"
                placeholder="Search topic by keyword"
            />
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
