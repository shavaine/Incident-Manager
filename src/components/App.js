import React, { Component } from "react";
import firebase from "./Firebase";
import { Router, navigate } from "@reach/router";
import "../css/App.css";
import Navigation from "./Navigation";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Edit from "./Edit";
import Create from "./Create";
import Show from "./Show";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  // Receives userName and pushes it the the database
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/dashboard");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Register path="/register" registerUser={this.registerUser} />
          {this.state.user && (
            <Dashboard path="dashboard" user={this.state.user} />
          )}
          {this.state.user && <Edit path="/edit/:id" />}
          {this.state.user && <Create path="/create" />}
          <Show path="show/:id" />
        </Router>
      </div>
    );
  }
}

export default App;
