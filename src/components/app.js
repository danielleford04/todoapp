import React, { Component } from 'react';
import TaskList from './taskList.js';
import Header from './header.js';

export default class App extends Component {
  render() {
    return (
      <div>
       <Header/>
        <TaskList/>
      </div>
    );
  }
}
