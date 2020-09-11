import React, { Component } from 'react';

class Home extends Component {
  render() {
    return(
            <div className="jumbotron justify-content-center">
            <h4>Incident Manager is a React CRUD application with user
                authentication. The application is capable of taking customer information about an incident and storing it into Cloud Firestore database.</h4><br/>
            <h4>This is a "Single Page Application"</h4>
            </div>
    )
  }
}

export default Home;
