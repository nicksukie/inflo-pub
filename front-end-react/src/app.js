import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "./Feed";
import Login from "./Accounts/Login";
import UserProfile from "./Accounts/UserProfile";

import createAccount from "./Accounts/createAccount";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route path="/login" component={Login} />
          <Route path="/account" component={UserProfile} />
          <Route path="/createAccount" component={createAccount} />

        </Switch>
      </Router>
    );
  }
}
render(<App />, document.getElementById("root"));
