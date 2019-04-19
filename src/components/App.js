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
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {authedUser && <Nav />}
            {this.props.loading === true ? null : (
              <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/home" exact component={Dashboard} />
                <PrivateRoute path="/new" exact component={NewTweet} />
                <PrivateRoute path="/tweet/:id" exact component={TweetPage} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    loading: !users === null
  };
}
export default connect(mapStateToProps)(App);
