import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from '@reach/router';

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
    const ref = firebase.firestore().collection('incidents').doc(this.props.match.params.id);
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
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="customer">Customer:</label>
                <input type="text" class="form-control" name="customer" value={this.state.customer} onChange={this.onChange} placeholder="Customer" />
              </div>
              <div class="form-group">
                <label for="priority">Priority:</label>
                <input type="text" class="form-control" name="priority" value={this.state.priority} onChange={this.onChange} placeholder="Priority" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="status">Status:</label>
                <input type="text" class="form-control" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
