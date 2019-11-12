import React from "react";
import Cookies from "js-cookie";
import FeedStore from "../stores/FeedStore";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let username = event.target.username.value;
    let password = event.target.password.value;
    let userinfo = {
      username: username,
      password: password
    };

    console.log(userinfo);
    Cookies.set("username",username.toString())
    var csrftoken = Cookies.get("csrftoken");

    console.log(csrftoken)
    var headers = new Headers();

    $.ajax({
      url: FeedStore.getsiteprefix() + "api-token-auth/",
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(userinfo),
      success: function(data) {
        FeedStore.setToken(data['token']);
        FeedStore.setUsername(username);
        window.location.href = '/'
      },
    });
    
    
    event.preventDefault();
  }

  handleCreate(event) {
    event.preventDefault();
    let username = event.target.username.value;
    let password = event.target.password.value;
    let email = event.target.email.value;
    let userinfo = {
      username: username,
      password: password,
      email: email,
    };


    console.log(userinfo);
    $.ajax({
      url: FeedStore.getsiteprefix() + "createuser",
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(userinfo),
      success: function(data) {
        FeedStore.setToken(data);
        window.location.reload()
      },
    });

  }

  
  render() {
    return (
      <div className="login-page">
      <div className="intro">
             <h2>Welcome to Inflo</h2>
      <h4>A new generation of news sharing and discussion</h4>
      </div>
        <div className="form">

          <form className="register-form" onSubmit={event => {
              this.handleCreate(event);
            }}>
            
            <input type="text" placeholder="name" name = "username"/>
            <input type="password" placeholder="password" name = "password"/>
            <input type="text" placeholder="email address" name = "email"/>
            <button>create</button>
            <p className="message">
              Already registered? <a href="#">Sign In</a>
            </p>
          </form>
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
              Not registered? <a href="/createAccount">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;