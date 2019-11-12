import React from "react";
import ContentBlock from "./ContentBlock";
import ContentSettings from "./ContentSettings";
import FeedStore from "../stores/FeedStore";
export const MyContext = React.createContext();

export function addUsertoStory(user, storyID)
{
  let storiesvar = this.state.stories;
  let i = 0;

  console.log("yeahhh1")
  for (let index in storiesvar)
  {
    let story = storiesvar[index]
    if(story.storyid == storyID)
    {
      story.users = [user, ...story.users]
      storiesvar.splice(i,1)
      storiesvar = [story, ...storiesvar]
      console.log(story)
      this.setState({stories : storiesvar});
      console.log("yeahhh3")
    }
    i+=1
  }
}
export function updateContentArea(story) {
  this.setState({
    stories: [story, ...this.state.stories]
  });
}

export function onScrollBottom() {
  this.setState({ pageNumber: this.state.pageNumber + 1 }, function() {
    this.paginateContent();
  });
}
class ContentArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      pageNumber: 1,
      username: FeedStore.getUsername(),
      categories:[],
      sortType: "Most Recently Shared"
    };

    updateContentArea = updateContentArea.bind(this);
    onScrollBottom = onScrollBottom.bind(this);
    addUsertoStory = addUsertoStory.bind(this);
    this.paginateContent = this.paginateContent.bind(this);
    this.fetchContentbyCategory = this.fetchContentbyCategory.bind(this);
    //this.requestFetchContentbyCategory = this.requestFetchContentbyCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.setSortSelection = this.setSortSelection.bind(this);
  }

  getCategories()
  {
    let categories = "", i = 0;
    if(this.state.categories.length = 0)
      return "noCategories"
    for(i=0;i<this.state.categories.length-1;i++)
    {
      categories += this.state.categories[i] + ","; 
    }
    categories += this.state.categories[i];
    return categories;
  }

  paginateContent() {
    let cat = "", i = 0;
    console.log(this.state.categories)
    if(this.state.categories.length == 0)
      cat = "noCategories"
    else{
      for(i=0;i<this.state.categories.length-1;i++)
      {
        cat += this.state.categories[i] + ","; 
      }
      cat += this.state.categories[i];
    }

    fetch(
      FeedStore.getsiteprefix() + "getpages?pageNumber=" + this.state.pageNumber + "&category=" + cat + "&sortType=" + this.state.sortType, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
        'Authorization': 'Bearer ' + FeedStore.getToken(),
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          if (result == "Expired" || result == "Other Error")
          {
            window.location.href = '/login'; 
          }
          else{
            for (var r in result) {
              this.setState({ stories: [...this.state.stories, result[r]] });
            }
          }
        } 
      );
  }

  fetchContentbyCategory(category, checked)
  {
    let newCategories = [];
    if(checked)
    {
      newCategories = [category,...this.state.categories];
    }
    else if(category = "all") {
      this.state.categories = "noCategories"
    }
    else{
      newCategories = this.state.categories.filter(function(value){return value != category;});
    }

    this.setState({pageNumber: 1, stories: [],categories: newCategories}, function(){
      this.paginateContent();
    });
  }
  
  setSortSelection(event)
  {
    let index = event.nativeEvent.target.selectedIndex;
    let text = event.nativeEvent.target[index].text
    this.setState({pageNumber: 1, stories: [],sortType: text}, function(){
      this.paginateContent();
    });

  }
  componentDidMount() {
    console.log(FeedStore.getToken());
    console.log(FeedStore.getUsername());
  }

  componentWillMount() {
    this.paginateContent();

    FeedStore.on("changecategory", (category, checked) => {
      this.fetchContentbyCategory(category, checked);
    });
  }
  render() {
    return (
      <div className="content_view" id="heyyy">
        <ContentSettings setSortSelection = {this.setSortSelection}/>
        <div className="mainfeed_container">
          {this.state.stories.map(story => {
            return (
              <ContentBlock
                key={story.storyid}
                storyID={story.storyid}
                sourceLink={story.sourcelink}
                thumbnail={story.thumbnail}
                sourceName={story.source}
                dateTime={story.date.substring(0,10)}
                details={story.details.substring(0, 120) + "..."}
                headline={story.headline}
                category={story.category}
                users = {story.users}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ContentArea;
