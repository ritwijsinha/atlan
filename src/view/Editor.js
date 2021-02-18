import { observer } from 'mobx-react';
import React from 'react';
import { getStore } from '../stores/get-store';
import { Button } from '@material-ui/core';
import '../styles/editor.css';

@observer
export default class Editor extends React.Component {
  constructor () {
    super();

    this.importMonaco = this.importMonaco.bind(this);
    this.getMonacoOptions = this.getMonacoOptions.bind(this);
  }


  componentDidMount () {

    // Lazily import monaco-editor to unblock rendering
    this.importMonaco();
  }

  componentWillUnmount () {

    // dispose monaco editor
    if (this.editor) {
      // Dispose of the content change listener
      this.contentChangeListenerDisposable && this.contentChangeListenerDisposable.dispose();
    }
  }

  componentDidUpdate () {
    const { query } = getStore('EditorStore');

    this.editor.setValue(query);
  }

  importMonaco () {
    import('monaco-editor/esm/vs/editor/editor.api')
      .then((monaco) => {
        // create editor and mount it
        this.editor = monaco.editor.create(this._node, this.getMonacoOptions());
        this.monaco = monaco;

        this.contentChangeListenerDisposable = this.editor.onDidChangeModelContent(() => {
          const value = this.editor.getValue(),
            editorStore = getStore('EditorStore');

          editorStore.setQuery(value);
        });
      });
  }

  getQuickSuggestionsConfig () {
    return {
      other: true,
      strings: true,
      comments: false
    };
  }

  getMonacoOptions () {
    const { query } = getStore('EditorStore');

    return {
      // options
      value: query,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      wordWrap: 'on',
      language: 'sql',
      links: false,

      // config to set allow the auto complete only in string and other areas except comments
      quickSuggestions: this.getQuickSuggestionsConfig(),

      wordWrapMinified: false,
      folding: true,
      lineDecorationsWidth: 4,
      fontSize: 14,

      // line-height should not be exposed but calculated from font size.
      // The default line height in monaco is 18px which is 1.5 times the default font size of 12px
      // Hence the factor of 1.5 is being maintained between font size and line height
      lineHeight: 1.5 * 14,
      detectIndentation: false, // setting off the indentation detection

      // The following settings for rendering non-printable characters.
      renderWhitespace: true,

      renderControlCharacters: true,
      autoClosingBrackets: 'always',
      autoIndent: 'full',
      colorDecorators: true,
      cursorBlinking: 'blink',
      cursorSmoothCaretAnimation: true,
      formatOnPaste: true,
      tabCompletion: 'on',
      automaticLayout: true
    };
  }

  getEditorNodeStyles () {
    return {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '16px',
      flex: '1',
      border: 'thin solid rgba(0, 0, 0, 0.2)'
    };
  }

  render () {
    const { runQuery, query } = getStore('EditorStore'),
      { isResponseLoading } = getStore('UIStore');

    return (
      <div
        style={{
          textAlign: 'left',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        className='editor'
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1 1 auto', fontWeight: '600', fontSize: '18px' }}>
            Query Editor
          </div>
          <Button
            color='primary'
            variant='contained'
            onClick={runQuery}
            disabled={!query || isResponseLoading}
          >
            Run
          </Button>
        </div>
        <div
          ref={(node) => this._node = node}
          style={this.getEditorNodeStyles()}
          id='editor'
          data-mode-id='javascript'
        />
      </div>
    );
  }
}
