import React from "react";

export default class CB extends React.Component {
  
    render() {
    
        return (
            <div className="histShareItem">
                {/*<div className="histPreviewImg"><img src={this.props.thumbnail}/></div>*/}
                    <div className="histArticleData">
                        <div className="histHeadline">
                            <a href={`${this.props.sourceLink}`}><p>{this.props.headline}</p></a>
                        </div>
                        <div className="histSourceAndDate">{this.props.source} {this.props.pubdate}
                        </div>

                    </div>
                    <div className="histCommentData">
                        <div className="commentaryPreview">
                            <p>{this.props.firstCommentary}</p>
                        </div>
                        <div className="commentaryDataNonPreview">
                            <div className="shareDate">
                                <p><span  className= "histShareDesc">Shared on </span><span className="statSpanDate" id="histShareDate####">{this.props.postdate}</span></p>
                            </div>

                        </div>
                   
                    </div>
            </div>

                
                );
    }
}