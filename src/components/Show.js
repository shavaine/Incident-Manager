import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from '@reach/router';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incident: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('incidents').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          incident: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('incidents').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Incident Report</Link></h4>
            <h3 class="panel-title">
              {this.state.incident.customer}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Priority:</dt>
              <dd>{this.state.incident.priority}</dd>
              <dt>Description:</dt>
              <dd>{this.state.incident.description}</dd>
              <dt>Status:</dt>
              <dd>{this.state.incident.status}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
