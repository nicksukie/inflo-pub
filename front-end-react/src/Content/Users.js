import React from "react";
import SignInImage from "../img/signinimage.png";
class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      elipses:'',
    };
  }

  componentWillMount()
  {
    if(this.props.users)
    {
      if(this.props.users.length>3)
      {
        this.setState({users:this.props.users, elipses: <div className="sharedby_user">...</div>})
      }
      else
      {
          this.setState({
            users:this.props.users,
          });
      }
    }
    
  }
  render() {
    return (
    <div>
        {this.state.users.slice(0, 3).map(user => {
            return (
              
              <div className="sharedby_user">
                <img id="sharedby_user1" src={SignInImage}></img>
                <h5 className="sharedby_text" id="SHAREDBY2">
                Shared by {user.Name} 
                <span id="timePosted-cb"> at {user.Time}</span>
                </h5>
              </div>
                );
            }
          )}
          {this.state.elipses}
      </div>
    );
  }
}

export default Users;
