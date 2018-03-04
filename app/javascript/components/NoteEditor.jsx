import React from "react"
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, SelectionState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';

const {hasCommandModifier, isCtrlKeyCommand} = KeyBindingUtil;

function myKeyBindingFn(e) {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'editor-save';
  }

  return getDefaultKeyBinding(e);
}

const styleMap = {
  'H1': {
    fontSize: 'xx-large',
  },
  'H2': {
    fontSize: 'x-large',
  },
  'H3': {
    fontSize: 'large',
  }
}

const toH1Markup = (text) => `<h1>${text}</h1>`

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNote: this.props.currentNote,
      editorState: EditorState.createEmpty()
    };
    
    this.state.titleEditorState = EditorState.createWithContent(this.setTitle(this.state.currentNote && this.state.currentNote.title || "New note"));
    
    
    this.onChange = (editorState) => {
      let nextEditorState = Object.assign(editorState);

      if(editorState.getCurrentContent().getPlainText() == this.buffer) {
        //nextEditorState = EditorState.moveFocusToEnd(editorState);
      }
      this.buffer = editorState.getCurrentContent().getPlainText();

      let currentNoteCopy = Object.assign({}, this.state.currentNote);
      currentNoteCopy.rawtext = convertToRaw(editorState.getCurrentContent());
      this.setState({editorState: nextEditorState, currentNote: currentNoteCopy});
    };
    this.onTitleChange = (titleEditorState) => {
      const currentNote = Object.assign({}, this.state.currentNote);

      currentNote.title = this.getTitleFromState(titleEditorState);
      this.setState({titleEditorState: titleEditorState, currentNote: currentNote});
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  setTitle(title) {
    const blocksFromHTML = convertFromHTML(toH1Markup(title));
    return ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
  }

  getTitleFromState(titleEditorState) {
    return titleEditorState.getCurrentContent().getPlainText();
  }

  componentWillReceiveProps(nextProps) {
    let rawText = nextProps.currentNote.rawtext;
    let newTitleEditorState = EditorState.createWithContent(this.setTitle(nextProps.currentNote && nextProps.currentNote.title || "New note"));
    let newEditorState = EditorState.createWithContent(convertFromRaw(rawText));
    this.editorRef.focus();
    this.setState({
      currentNote: nextProps.currentNote,
      editorState: newEditorState,
      titleEditorState: EditorState.moveSelectionToEnd(newTitleEditorState)
    });
  }

  componentDidMount(){
    this.editorRef.focus();
  }

  handleKeyCommand(command) {
    if(command == 'editor-save') {
      const rawJson = JSON.stringify({
        title: this.state.titleEditorState.getCurrentContent().getPlainText(),
        text: this.state.editorState.getCurrentContent().getPlainText(),
        rawtext: convertToRaw(this.state.editorState.getCurrentContent())
      });

      const options = {
        body: rawJson,
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT'
      }

      if(!this.state.currentNote) {
        this.titleEditorRef.focus();
        const options = {
          body: rawJson,
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        }
        fetch('/api/v1/notes/', options)
          .then(res =>res.json())
          .then(res => {
            this.setState({currentNote: res})
            this.props.onNewNote(res);
            this.props.onListUpdate(res);
          });
      }else{       
        const options = {
          body: rawJson,
          headers: {
            'content-type': 'application/json'
          },
          method: 'PUT'
        }
        fetch('/api/v1/notes/'+this.state.currentNote.id, options)
          .then(res => {
            this.props.onListUpdate(this.state.currentNote);
          });
      }
    }
  }

  _onClick(type) {
    this.editorRef.focus();
    this.onChange(
      RichUtils.toggleInlineStyle(
      this.state.editorState,
      type
    ))
  }

  render() {
    const onClick = (type) => this._onClick.bind(this, type);
    return (
        <div id="note-editor-container">
          <div id="title-editor">
            <Editor
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={myKeyBindingFn}
              textAlignment="center"
              editorState={this.state.titleEditorState}
              onChange={this.onTitleChange}
              ref={ref => this.titleEditorRef = ref}
            />
          </div>
          <button className="link" onClick={onClick('H1')}>H1</button>
          <button className="link" onClick={onClick('H2')}>H2</button>
          <button className="link" onClick={onClick('H3')}>H3</button>
          <button className="link" onClick={onClick('BOLD')}>Bold</button>
          <button className="link" onClick={onClick('ITALIC')}>Italic</button>
          <button className="link" onClick={onClick('UNDERLINE')}>Underline</button>
          <hr/>
          <div id="text-editor">
            <Editor
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={myKeyBindingFn}
              customStyleMap={styleMap}
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref={ref => this.editorRef = ref}
            />
          </div>
        </div>
    );
  }
}

const moveSelectionToEnd = (editorState) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();

  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length,
  });

  return EditorState.acceptSelection(editorState, selection);
};


export default NoteEditor