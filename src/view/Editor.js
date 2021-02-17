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
    this.importMonaco();
  }

  componentWillUnmount () {

    // dispose monaco editor
    if (this.editor) {
      // Dispose of the content change listener
      this.contentChangeListenerDisposable && this.contentChangeListenerDisposable.dispose();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.value !== this.props.value) {
      this.editor.setValue(this.props.value);
    }
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


        this.model = monaco.editor.createModel(value, 'javascript');
        let formatAction = import('monaco-editor/esm/vs/editor/contrib/format/format')
          .then((format) => {
            return this.editor._instantiationService.invokeFunction(format.formatDocumentWithSelectedProvider, this.model, true);
          });


          // monaco.editor.setModelLanguage(this.editor.getModel(), 'javascript');

          // monaco.editor.colorizeElement(document.getElementById('editor'));
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
    return {
      // options
      value: this.props.value,
      minimap: { enabled: false },

      // readOnly: this.props.readOnly,
      scrollBeyondLastLine: false,

      lineNumbers: 'on',
      wordWrap: 'on',

      // fontFamily: getSettingValue('editorFontFamily'),
      language: 'javascript',
      links: false,

      // config to set allow the auto complete only in string and other areas except comments
      quickSuggestions: this.getQuickSuggestionsConfig(),

      // scrollbar: {
      //   vertical: this.props.autoResize || this.props.hideScrollbar === 'both' || this.props.hideScrollbar === 'vertical' ? 'hidden' : 'auto', // this property hides the scrollbar when auto-resize is enabled
      //   horizontal: this.props.hideScrollbar === 'both' || this.props.hideScrollbar === 'horizontal' ? 'hidden' : 'auto',
      //   alwaysConsumeMouseWheel: false // when the property is set to false, monaco doesn't consume the mouse scroll events
      // },

      // minified text are not force wrapped
      // @todo: disable this word wrap beyond a size
      wordWrapMinified: false,

      // 1. Do not add a wrapping indent in raw view or for markdown editors
      // 2. Indent the wrapped lines for all other languages
      // wrappingIndent: this.state.activeView === VIEW_MODES.RAW || getMonacoLanguageName(this.props.language) === 'markdown' ? 'none' : 'indent',
      // renderIndentGuides: getMonacoLanguageName(this.props.language) === 'markdown' ? false : true, // hiding the indent lines that are visible when a line is indented
      // glyphMargin: this.props.glyphMargin || false,
      folding: true,

      // extraEditorClassName: this.props.customEditorClassName ? this.props.customEditorClassName : '', // add custom class to editor
      // renderLineHighlight: 'line', // to control the highlighting of current line

      // overviewRulerLanes: this.props.autoResize ? 0 : 3, // this is to hide the right hand size overview view when auto resize is on
      // overviewRulerBorder: !this.props.autoResize, // hide the vertical scroll border

      // add's 4 pixels of space to the left margin which when no line numbers and code folding is present
      // gives it a little space from the left border, especially useful if there is a drawn border around the editor
      lineDecorationsWidth: 4,

      fontSize: 14,

      // line-height should not be exposed but calculated from font size.
      // The default line height in monaco is 18px which is 1.5 times the default font size of 12px
      // Hence the factor of 1.5 is being maintained between font size and line height
      lineHeight: 1.5 * 14,
      detectIndentation: false, // setting off the indentation detection

      // insertSpaces: this.getIndentationSettingValue('editorIndentType'), // controls the behaviour to use tab or space, when tab key is pressed
      // tabSize: this.getIndentationSettingValue('editorIndentCount'),
      // autoClosingBrackets: (getSettingValue('editorAutoCloseBrackets') ? 'languageDefined' : 'never'),
      // autoClosingQuotes: (getSettingValue('editorAutoCloseQuotes') ? 'languageDefined' : 'never'),

      // The following settings for rendering non-printable characters,
      // are being set as true by default because of their crucial nature
      // to runtime context as part of CFDTN-857. They affect only the Monaco
      // text editor and not the URL/KV editor with conflicting default values.
      // However, the user will be unaware of this. Check the PR of CFDTN-857
      // for more details or to re-implement the feature.
      renderWhitespace: true,

      renderControlCharacters: true,

      // overflowWidgetsDomNode: document.querySelector('#monaco-overflowing-widgets-container'),
      // fixedOverflowWidgets: true

      autoClosingBrackets: 'always',
      autoIndent: 'full',
      colorDecorators: true,
      cursorBlinking: 'blink',

      cursorSmoothCaretAnimation: true,

      // dragAndDrop: true

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
