import React from "react"
import NoteListElement from './NoteListElement'


function showButton(props) {
  if(props.notes.length) {
      return (<button onClick={props.clickHandler}>+</button>);
  }
}

class NoteList extends React.Component {
  render () {
    return (
      <div id="note-list">
        <div id="button-list">
          {showButton(this.props)}
        </div>
        <div id="note-list-elements">
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
