import React from "react"
import NoteEditor from './NoteEditor.jsx'
import NoteList from './NoteList.jsx'

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes,
      currentNote: this.props.notes[0]
    };
  }

  onButtonClick() {
    this.setState({currentNote: null})
  }

  onListUpdate() {
    fetch("/api/v1/notes.json")
      .then(res => res.json())
      .then(res => this.setState({notes: res}));
  }

  onNewNote(note) {
    this.setState({currentNote: note})
  }

  onElementClick(note){
    this.setState({currentNote: note});
  }

  render () {
    return (
      <div id="notes-container">
        <NoteList notes={this.state.notes} clickHandler={this.onButtonClick.bind(this)} onElementClickHandler={this.onElementClick.bind(this)}></NoteList>
        <NoteEditor
          noteTitle="Test"
          currentNote={this.state.currentNote}
          onListUpdate={this.onListUpdate.bind(this)}
          onNewNote={this.onNewNote.bind(this)}
        ></NoteEditor>
      </div>
    );
  }
}

export default NotesContainer
