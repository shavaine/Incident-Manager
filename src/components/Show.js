import React, { Component } from 'react';
import firebase from './Firebase';
import { Link, navigate } from '@reach/router';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incident: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('incidents').doc(this.props.id);
    ref.get().then((doc) => {
    console.log(doc);
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
    navigate('/dashboard');
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h3>Create Report</h3>
            <h4 className="panel-title">{this.state.incident.customer}</h4>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Priority:</dt>
              <dd>{this.state.incident.priority}</dd>
              <dt>Description:</dt>
              <dd>{this.state.incident.description}</dd>
              <dt>Status:</dt>
              <dd>{this.state.incident.status}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
