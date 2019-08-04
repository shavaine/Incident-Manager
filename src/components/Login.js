import React, { Component } from 'react';
import '../css/Login.css';
import firebase from './Firebase';
import FormError from './FormError';
import { navigate } from '@reach/router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate('/dashboard');
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  }
  render() {
    return (
      <div className="login-clean">
          <form method="post" onSubmit={this.handleSubmit}>
              <h3>Login</h3>
                {this.state.errorMessage !== null ? ( <FormError theMessage={this.state.errorMessage}/> ) : null}
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">Log In</button>
              </div>
          </form>
      </div>
    );
  }
}


export default Login;
