import { ADD_NOTE } from '../constants/action-types';

const initialState = {
    notes: []
};

const rootReducer = function(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE:
            return { ...state, notes: [...state.notes, action.payload]}
        default:
            return state;
    }
};

export default rootReducer;