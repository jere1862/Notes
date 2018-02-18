import React from "react"
import NoteDisplay from './NoteDisplay.jsx'
import NoteList from './NoteList.jsx'

class NotesContainer extends React.Component {
  render () {
    return (
      <div id="notes-container">
        <NoteList></NoteList>
        <NoteDisplay></NoteDisplay>
      </div>
    );
  }
}

export default NotesContainer
