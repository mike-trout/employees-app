import React, { Component } from 'react';
import EmployeeList from './EmployeeList.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <EmployeeList start="1" number="10" />
      </div>
    );
  }
}

export default App;
