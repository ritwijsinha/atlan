import React, { Component } from 'react';
import '../styles/App.css';
import _ from 'lodash';
// import { getStore } from '../stores/get-store';

export default class App extends Component {
  constructor () {
    super();

    window._ = _;

    this.importMonaco = this.importMonaco.bind(this);
  }

  componentDidMount () {
    console.log('is lodash here', _.isEmpty(null));

    // const UIStore = getStore('UIStore');

    // console.log('isEditorCollapsed:', UIStore.isEditorCollapsed);

    // UIStore.collapseEditor();
    // console.log('isEditorCollapsed1:', UIStore.isEditorCollapsed);


    // UIStore.collapseEditor(true);
    // console.log('isEditorCollapsed2:', UIStore.isEditorCollapsed);

  }

  importMonaco () {
    import('monaco-editor');
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
};