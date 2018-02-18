import React from "react"
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

const styleMap = {
  'H1': {
    textDecoration: 'heading1'
  },
  'H2': {
    textDecoration: 'heading2'
  },
  'H3': {
    textDecoration: 'heading3'
  }
}

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount(){
    this.editorRef.focus();
  }

  _onClick(type) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      type
    ))
  }

  render() {
    const onClick = (type) => this._onClick.bind(this, type);

    return (
        <div id="note-editor-container">
          <h1>{this.props.noteTitle}</h1>
          <button className="link" onclick={onClick('H1')}>H1</button>
          <button className="link" onclick={onClick('H2')}>H2</button>
          <button className="link" onclick={onClick('H3')}>H3</button>
          <button className="link" onClick={onClick('BOLD')}>Bold</button>
          <button className="link" onClick={onClick('ITALIC')}>Italic</button>
          <button className="link" onClick={onClick('UNDERLINE')}>Underline</button>
          <hr/>
          <div id="text-editor">
            <Editor
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

export default NoteEditor