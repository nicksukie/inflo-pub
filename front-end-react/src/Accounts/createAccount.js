import React from "react";

class createAccount extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    let username = event.target.username.value;
    let password = event.target.password.value;
    let userinfo = {
      username: username,
      password: password
    };

    console.log(userinfo);
    $.ajax({
      url: "http://localhost:8000/users/authenticate",
      type: "post",
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        console.log("doneee");
      },
      data: JSON.stringify(userinfo)
    });
    event.preventDefault();
  }
  render() {
    return (
      <div className="login-page">
      <div className="intro">
             <h2>Welcome to Inflo</h2>
      <h4>Log in or create a new account below</h4>
      </div>
        <div className="form">

          <form className="register-form">
            <input type="text" placeholder="name" />
            <input type="text" placeholder="email address" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
            <button>Create Account</button>
            
            <p className="message">
            
            </p>
          </form>
          </div>
           <div className="form">
          <form
            className="login-form"
            onSubmit={event => {
              this.handleSubmit(event);
            }}
          >
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            <p className="message">
   
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default createAccount;
