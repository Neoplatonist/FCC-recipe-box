import React, { Component } from 'react'
import Header from './components/header'
import Main from './components/main'
// import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Main />

        {/* <Footer /> */}
      </div>
    )
  }
}