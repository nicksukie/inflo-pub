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
    //username = email address (not user's full name)
    let username = event.target.email.value;
    let password = event.target.password.value;
    let userinfo = {
      username: username,
      password: password
    };

    //console.log(userinfo);
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
        FeedStore.setUser(username);
        window.location.href = '/'
      },
    });


    event.preventDefault();
  }

  handleCreate(event) {
    event.preventDefault();

    let password = event.target.password.value;
    let email = event.target.email.value;
    let fullname = event.target.fullname.value;
    let userinfo = {

      password: password,
      email: email,
      fullname:fullname,
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

let createAccountForm =  <div className="form"><form className="register-form" onSubmit={event => {
              this.handleCreate(event);
            }}
            >
            <input type="text" placeholder="Username" name="fullname"/>
            <input type="text" placeholder="Email address" name="email"/>
            <input type="password" placeholder="Password" name="password"/>
            <input type="password" placeholder="Confirm Password" />
            <button>Create Account</button>

            <p className="message">

            </p>
          </form>
</div>

let loginForm = <div className="form">
          <form
            className="login-form"
            onSubmit={event => {
              this.handleSubmit(event);
            }}
          >
            <input type="text" placeholder="Username" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Login</button>
            <p className="message">

            </p>
          </form>
        </div>


    return (

<div className="top-section">


      <div className="landing-container">
             <h2 className="introtext">Welcome to Inflo</h2>
              <h4 className="introtext">A new generation of news and insight sharing</h4>


      <div className="flex-row">
          <div className="flex-col center">
            <h4>Log in:</h4>

        { loginForm }



              </div>


        <div className="flex-col center">
        <h4>Create a new account:</h4>

        { createAccountForm }

              </div>


</div>
<div className="landing-footer">
<p>Inflo.news is a next generation news sharing and discussion platform. Read more about us <a class="landinglink" href="http://www.infloproject.com">here</a>.</p>
</div>
</div>

      </div>
    );
  }
}


export default Login;
