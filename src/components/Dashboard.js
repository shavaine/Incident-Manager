import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from '@reach/router';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('incidents');
    this.unsubscribe = null;
    this.state = {
      incidents: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const incidents = [];
    querySnapshot.forEach((doc) => {
      const { customer, priority, description, status } = doc.data();
      incidents.push({
        key: doc.id,
        doc, // DocumentSnapshot
        customer,
        priority,
        description,
        status,
      });
    });
    this.setState({
      incidents
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Reports
            </h3>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th></th>
                  <th >Customer Name</th>
                  <th>Incident Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.incidents.map(incident =>
                  <tr>
                    <td>
                      <h4><Link to={`/show/${incident.key}`} className="btn btn-primary">View</Link></h4>
                    </td>
                    <td>{incident.customer}</td>
                    <td>{incident.priority}</td>
                    <td>{incident.status}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;
