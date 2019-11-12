import React from "react";
import ContentBlock from "./ContentBlock";
import ContentSettings from "./ContentSettings";
import FeedStore from "../stores/FeedStore";
export const MyContext = React.createContext();

export function updateContentArea(story) {
  this.setState({
    stories: [story, ...this.state.stories]
  });
}

export function onScrollBottom() {
  this.setState({ pageNumber: this.state.pageNumber + 1 }, function() {
    this.fetchContent();
  });
}
class ContentArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      pageNumber: 1,
      userID: FeedStore.getUser()
    };

    updateContentArea = updateContentArea.bind(this);
    onScrollBottom = onScrollBottom.bind(this);
    this.fetchContent = this.fetchContent.bind(this);
  }

  fetchContent() {
    fetch(
      "http://127.0.0.1:8000/users/getpages?pageNumber=" + this.state.pageNumber
    )
      .then(res => res.json())
      .then(
        result => {
          for (var r in result) {
            if (r == 0) FeedStore.changeUser(result[r]);
            else this.setState({ stories: [...this.state.stories, result[r]] });
          }
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {}

  componentWillMount() {
    this.fetchContent();
    FeedStore.on("change", () => {
      this.setState({ userID: FeedStore.getUser() }, function() {
        console.log(this.state.userID);
      });
    });
  }
  render() {
    return (
      <MyContext.Provider value={{ userID: this.state.userID }}>
        <div className="content_view" id="heyyy">
          <ContentSettings />
          <div className="mainfeed_container">
            {this.state.stories.map(story => {
              return (
                <ContentBlock
                  key={story.storyid}
                  storyID={story.storyid}
                  sourceLink={story.sourcelink}
                  thumbnail={story.thumbnail}
                  sourceName={story.source}
                  dateTime={story.date}
                  details={story.details.substring(0, 120) + "..."}
                  headline={story.headline}
                />
              );
            })}
          </div>
        </div>
      </MyContext.Provider>
    );
  }
}

export default ContentArea;
