import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../styles/App.css';
import { getStore } from '../stores/get-store';
import Editor from './Editor';

@observer
export default class App extends Component {


  render () {
    const UIStore = getStore('UIStore'),
      { isEditorCollapsed } = UIStore || {};

    return (
      <div className='App'>
        <header className='App-header'>
          <div
            onClick={() => {
              UIStore.collapseEditor(!isEditorCollapsed);
            }}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {
              isEditorCollapsed ? 'Collapsed' : 'Uncollapsed'
            }
          </div>
          <Editor />
        </header>
      </div>
    );
  }
}
