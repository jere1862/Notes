import React from "react"
import NoteListElement from './NoteListElement'

class NoteList extends React.Component {
  render () {
    return (
      <div id="note-list">
        <div>
          <NoteListElement className="active" noteTitle="ALlooo"></NoteListElement>
          <NoteListElement className="active" noteTitle="ALlooo"></NoteListElement>
        </div>
      </div>
    );
  }
}

export default NoteList
