import React, { Component } from 'react';

class Home extends Component {
  render() {

    const {user} = this.props;

    return(
            <div className="container">
            <h3>Incident Manager</h3>
            <h4>"Incident Manager app description"</h4>
            </div>
    )
  }
}

export default Home;
