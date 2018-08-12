import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewToDoItem from './components/NewToDoItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My ToDo List</h1>
        </header>
        <NewToDoItem />
      </div>
    );
  }
}

export default App;
