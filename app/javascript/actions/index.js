import { ADD_NOTE } from '../constants/action-types';

export const addNote = note => ({ type: ADD_NOTE, payload: note })