import React from "react"
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';


class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  componentDidMount(){
    this.editorRef.focus();
  }
  render() {
    return (
        <div id="note-editor">
          <h1>Text editor</h1>
          <div className="editor">
            <Editor
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