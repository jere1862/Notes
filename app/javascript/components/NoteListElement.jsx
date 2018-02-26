import React from "react"

class NoteListElement extends React.Component {

  render () {
    return (
      <div className="note-list-element active fade" onClick={this.props.onClickHandler}>
        <p>{this.props.noteTitle}</p>
      </div>
    );
  }
}

export default NoteListElement
