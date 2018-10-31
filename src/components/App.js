import React, { Component } from 'react';
import '../styles/App.css';
import PersonCrud from './PersonCrud';
import dataFacade from "../dataFacade";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PersonCrud />
    );
  }
}

export default App;
