import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import { Link, navigate } from '@reach/router';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('incidents');
    this.state = {
      customer: '',
      priority: '',
      description: '',
      status:'',
      lastIndex: 1000
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { customer, priority, description, status } = this.state;

    this.ref.add({
      customer,
      priority,
      description,
      status
    }).then((docRef) => {
      this.setState({
        customer: '',
        priority: '',
        description: '',
        status:''
      });
      this.props.history.push("/")
      navigate('/dashboard');
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { customer, priority, description, status } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Create Incident
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="customer">customer:</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer"
                  value={customer}
                  onChange={this.onChange}
                  placeholder="customer"
                  />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <textArea
                  className="form-control"
                  name="description"
                  onChange={this.onChange}
                  placeholder="Description"
                  cols="80"
                  rows="3">{description}</textArea>
              </div>

              <div className="form-group">
                <label for="priority">Priority:</label>
                <select
                  className="form-control"
                  name="priority"
                  value={priority}
                  onChange={this.onChange}>
                  <option value="" disabled selected>Select your priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="form-group">
                <label for="status">Status:</label>
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={this.onChange}>
                  <option value="" disabled selected>Select your status</option>
                  <option>In-Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
