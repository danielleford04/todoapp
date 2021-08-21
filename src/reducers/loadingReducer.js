
import {FETCH_TASKS, UPDATE_TASK, SET_LOADING_TO_TRUE} from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_TASKS:
            return false;
        case UPDATE_TASK:
            return false;
        case SET_LOADING_TO_TRUE:
            return true;
        default:
            return state;
    }
}
