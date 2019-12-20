import React from "react";
import { Switch, Route } from "react-router-dom";

import TopNav from "./components/TopNav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Jokes from "./components/Jokes";

function App() {
  return (
    <div className="container">
      <TopNav />

      <Switch>
        <Route exact path="/" component={Jokes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
