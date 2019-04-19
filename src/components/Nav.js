import React from 'react'
import { resetAuthedUser } from "../actions/authedUser";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends React.Component {
  handleLogout = event => {
    console.log(this.props);
    event.preventDefault();
    this.props.history.push("/");
    const { dispatch, authedUser } = this.props;
    dispatch(resetAuthedUser(authedUser));
  };
  handleLogout = event => {
    console.log(this.props);
    event.preventDefault();
    this.props.history.push("/");
    const { dispatch, authedUser } = this.props;
    dispatch(resetAuthedUser(authedUser));
  };
  render(){
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/home' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Tweet
            </NavLink>
          </li>
          <li className="last">
            <input type="button" color="inherit" value="Logout" onClick={this.handleLogout} />
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
  };
}
export default withRouter(connect(mapStateToProps)(Nav));
