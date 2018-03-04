import React from "react"
import NoteEditor from './NoteEditor.jsx'
import NoteList from './NoteList.jsx'
import store from '../store/index';
import { addNote } from '../actions/index';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { notes: state.notes };
}

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);

    fetch("/api/v1/notes.json")
      .then(res => res.json())
      .then(res => {
        res.forEach(note => store.dispatch(addNote(note)))
      });
    
    this.state = {
      notes: this.props.notes,
      currentNote: this.props.notes[0]
    };
  }

  onButtonClick() {
    this.setState({currentNote: null})
  }

  onListUpdate() {
    console.log(this.state.currentNote)
    fetch("/api/v1/notes.json")
      .then(res => res.json())
      .then(res => this.setState({notes: res}));
  }

  onNewNote(note) {
    this.setState({currentNote: note})
  }

  render () {
    return (
      <div id="notes-container">
        <NoteList notes={this.state.notes} clickHandler={this.onButtonClick.bind(this)}></NoteList>
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

export default connect(mapStateToProps)(NotesContainer)
