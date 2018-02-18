import React from "react"
import NoteEditor from './NoteEditor.jsx'
import NoteList from './NoteList.jsx'

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: this.props.notes[0]
    };
  }
  render () {
    return (
      <div id="notes-container">
        <NoteList notes={this.props.notes}></NoteList>
        <NoteEditor noteTitle="Test" currentNote={this.state.currentNote}></NoteEditor>
      </div>
    );
  }
}

export default NotesContainer
