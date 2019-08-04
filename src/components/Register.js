import React, { Component } from 'react';
import '../css/Register.css';
import FormError from './FormError';
import firebase from './Firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      passwordRepeat: '',
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.password !== this.state.passwordRepeat) {
        this.setState({ errorMessage: 'Passwords no not match' });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit(e) {
    var registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      // passes registration info to app.js
      .then(() => {
        this.props.registerUser(registrationInfo.displayName);
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
      <div className="register">
          <div className="form-container">
              <form onSubmit={this.handleSubmit}>
                {this.state.errorMessage !== null ? ( <FormError theMessage={this.state.errorMessage}/> ) : null}
                  <h2 className="text-center">
                    <strong>Register</strong>
                  </h2>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      id="displayName"
                      name="displayName"
                      required
                      placeholder="Display Name"
                      value={this.state.displayName}
                      onChange={this.handleChange}
                      />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      required
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
                    <input
                      className="form-control"
                      type="password"
                      name="passwordRepeat"
                      placeholder="Password (repeat)"
                      value={this.state.passwordRepeat}
                      onChange={this.handleChange}
                      />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">Register</button>
                  </div>
              </form>
          </div>
      </div>
    );
  }
}


export default Register;
