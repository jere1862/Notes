import React from "react"

class NoteList extends React.Component {
  render () {
    return (
      <div id="note-list">
        <div>
          <div className="note-list-element" title="Alllo"></div>
          <div className="note-list-element" title="OtherNote"></div>
          <div className="note-list-element" title="beau chat"></div>
        </div>
      </div>
    );
  }
}

export default NoteList
