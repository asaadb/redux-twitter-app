import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewTweet from "./NewTweet";
import Nav from "./Nav";
import TweetPage from './TweetPage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/new" exact component={NewTweet} />
                <Route path="/tweet/:id" exact component={TweetPage} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}
export default connect(mapStateToProps)(App);
