import React from 'react';
import { observer } from 'mobx-react';
import '../styles/App.css';
import { getStore } from '../stores/get-store';
import Editor from './Editor';
import Response from './Response';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Sidebar from './Sidebar';
import { debounce } from 'lodash';

@observer
export default class App extends React.Component {
  constructor () {
    super();

    this.handleResize = this.handleResize.bind(this);
    this.debouncedHandleResize = debounce(this.handleResize, 50);
  }

  handleResize () {
    this.sidebarRef && this.sidebarRef.forceUpdate();
    this.editorRef && this.editorRef.forceUpdate();
    this.responseRef && this.responseRef.forceUpdate();
  }

  render () {
    return (
      <div className='App'>
        <div className='header'>
          SQL Editor
        </div>
        <SplitPane onChange={this.debouncedHandleResize} split='vertical'>
          <SplitPane
            initialSize='75%'
            minSize='60%'
            split='horizontal'
            onChange={this.debouncedHandleResize}
          >
            <Pane
              className='pane editor-pane'
              initialSize='50%'
              minSize='25%'
            >
              <Editor ref={(ref) => this.editorRef = ref} />
            </Pane>
            <Pane
              className='pane response-pane'
              initialSize='50%'
              minSize='25%'
            >
              <Response ref={(ref) => this.responseRef = ref} />
            </Pane>
          </SplitPane>
          <Pane
            className='pane sidebar-pane'
            initialSize='25%'
            maxSize='40%'
            minSize='20%'
          >
            <Sidebar ref={(ref) => this.sidebarRef = ref} />
          </Pane>
        </SplitPane>
      </div>
    );
  }
}
