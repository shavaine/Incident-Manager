import React, { Component } from 'react';
import firebase from './Firebase';
import { Link, navigate } from '@reach/router';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      customer: '',
      priority: '',
      description: '',
      status:''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('incidents').doc(this.props.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const incident = doc.data();
        this.setState({
          key: doc.id,
          customer: incident.customer,
          priority: incident.priority,
          description: incident.description,
          status: incident.status
        });
      } else {
        console.log("No existing incident found");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({incident:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { customer, priority, description, status } = this.state;

    const updateRef = firebase.firestore().collection('incidents').doc(this.state.key);
    updateRef.set({
      customer,
      priority,
      description,
      status
    }).then((docRef) => {
      this.setState({
        key: '',
        customer: '',
        priority: '',
        description: '',
        status:''
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    navigate('/dashboard');
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="customer">Customer:</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer"
                  value={this.state.customer}
                  onChange={this.onChange}
                  placeholder="Customer" />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  type="text"
                  className="form-control"
                  name="priority"
                  value={this.state.priority}
                  onChange={this.onChange}>
                  <option value="" disabled>Select your priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  type="text"
                  className="form-control"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}>
                  <option value="" disabled>Select your status</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
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

export default Edit;
