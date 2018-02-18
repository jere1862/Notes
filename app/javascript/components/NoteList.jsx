import React from "react"
import NoteListElement from './NoteListElement'

class NoteList extends React.Component {
  render () {
    return (
      <div id="note-list">
        <div>
          {
            this.props.notes.map((note, index) => (
              <NoteListElement key={index} noteTitle={note.title}></NoteListElement>
            ))
          }
        </div>
      </div>
    );
  }
}

export default NoteList
