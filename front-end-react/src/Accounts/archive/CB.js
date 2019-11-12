import React from "react";

export default class CB extends React.Component {
  
    render() {
    
        return (
            <div className="histShareItem">
                {/*<div className="histPreviewImg"><img src={this.props.thumbnail}/></div>*/}
                                    <div className="histArticleData">
                        <div className="histHeadline">
                            <p>{this.props.details}</p>
                        </div>
                        <div className="histSourceAndDate">nytimes.com 2019-02-27 16:58</div>
                    </div>
                    <div className="histCommentData">
                        <div className="commentaryPreview">
                            <p>{this.props.firstCommentary}</p>
                        </div>
                        <div className="commentaryDataNonPreview">
                            <div className="shareDate">
                                <p><span  className= "histShareDesc">Shared on </span><span className="statSpanDate" id="histShareDate####">{this.props.date}</span></p>
                            </div>
                            <div className="histTypeAndScore">
                                <div className="histCommentDataItem">
                                    <p><span  className= "histShareDesc"> </span><span className="statSpanType" id="type###">Discussion </span></p>
                                </div>
                                <div className="histCommentDataItem">
                                    <p><span  className= "histShareDesc"></span><span  className="statSpanScore" id="score###">39</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                );
    }
}