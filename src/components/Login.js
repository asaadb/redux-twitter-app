import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { isAuth } from "../utils/api";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    authedUser: "",
    imgSrc: "/favicon.ico",
    redirectToReferrer: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const { authedUser } = this.state;
    const { dispatch } = this.props;
    isAuth.authenticate(() => {
      dispatch(setAuthedUser(authedUser));
      this.setState({ redirectToReferrer: true });
    });
  };
  handleSelect = e => {
    const val = e.target.value;
    const img = this.props.users[val].avatarURL;
    this.setState(() => ({
      authedUser: val,
      imgSrc: img
    }));
  };
  render() {
    const { redirectToReferrer } = this.state;
    const { users, ids } = this.props;
    console.log(redirectToReferrer);
    if (redirectToReferrer === true) {
      let redirectTo = this.props.location.state
        ? this.props.location.state.from.pathname
        : "/home";
      return <Redirect to={redirectTo} />;
    }
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>
          <div className="fadeIn first">
            <img src={this.state.imgSrc} className="avatar" alt="User Icon" />
          </div>
          <form onSubmit={this.handleSubmit}>
            <select onChange={this.handleSelect}>
              <option hidden value="default">
                Select a user...
              </option>
              {ids.map(id => (
                <option value={users[id].id} key={users[id].id}>
                  {users[id].name}
                </option>
              ))}
            </select>
            <input type="submit" className="fadeIn second" value="Log In" disabled={this.state.authedUser === ""} />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
    ids: Object.keys(users)
  };
}

export default connect(mapStateToProps)(Login);
