import React from "react"

class NoteListElement extends React.Component {
  render () {
    return (
      <div className="note-list-element active">
        <p>{this.props.noteTitle}</p>
      </div>
    );
  }
}

export default NoteListElement
