import React from "react"
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, SelectionState, convertFromRaw, convertToRaw} from 'draft-js';
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

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNote: this.props.currentNote,
      editorState: EditorState.createEmpty()
    };
    
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount(){
    this.editorRef.focus();
  }

  handleKeyCommand(command) {
    if(command == 'editor-save') {
      const rawJson = JSON.stringify({
        title: this.state.currentNote.title,
        text: convertToRaw(this.state.editorState.getCurrentContent())
      });
      const options = {
        body: rawJson,
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT'
      }

      fetch('/notes/'+this.state.currentNote.id, options)
        .then(res => console.log(res));
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
          <h1>{this.props.currentNote.title}</h1>
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