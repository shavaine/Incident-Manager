import React, { Component } from 'react';
import '../css/Navigation.css';
import { Link } from '@reach/router';


class Navigation extends Component {

render() {
const { user, logOutUser } = this.props;
    return (
      <div>
          <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
              <div className="container">
                <Link to="/" className="navbar-brand">Incident Manager</Link>
                <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="navbar-toggler-icon"></span>
                </button>
                  <div className="collapse navbar-collapse" id="navcol-1">
                      <ul className="nav navbar-nav mr-auto">
                          <li className="nav-item" role="presentation">
                            {user && ( <Link to="/dashboard" className="nav-link">Dashboard</Link> )}
                          </li>
                          <li className="nav-item" className="nav-link">
                            {user && ( <Link to="/create">Create Incident</Link> )}
                          </li>
                      </ul>
                      <span className="navbar-text actions">
                        {!user && ( <Link to="/login" className="login" >Log In</Link> )}
                        {user && ( <Link to="/login" className="logout" onClick={e => logOutUser(e)}>Log out</Link> )}
                        {!user && ( <Link to="/register" className="btn btn-light action-button" role="button" >Register</Link> )}
                      </span>
                    </div>
              </div>
          </nav>
      </div>
    );
  }
}


export default Navigation;
