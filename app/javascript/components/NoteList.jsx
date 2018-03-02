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
            this.props.notes.sort((a,b)=>b.id-a.id).map((note, index) => (
              <NoteListElement key={note.id} noteTitle={note.title} onClickHandler={this.props.onElementClickHandler.bind(null, note)}></NoteListElement>
            ))
          }
        </div>
      </div>
    );
  }
}

export default NoteList
