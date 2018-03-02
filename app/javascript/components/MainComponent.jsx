import React from "react"
import NotesContainer from './NotesContainer.jsx'
import store from '../store/index';
import { Provider } from 'react-redux';

class MainComponent extends React.Component {
  render () {
    return (
        <Provider store={store}>
        <NotesContainer notes={store.getState().notes}/>
        </Provider>
    );
  }
}

export default MainComponent;