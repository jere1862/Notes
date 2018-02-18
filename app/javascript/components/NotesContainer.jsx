import React from "react"
import NoteEditor from './NoteEditor.jsx'
import NoteList from './NoteList.jsx'

class NotesContainer extends React.Component {
  render () {
    return (
      <div id="notes-container">
        <NoteList></NoteList>
        <NoteEditor noteTitle="Test"></NoteEditor>
      </div>
    );
  }
}

export default NotesContainer
