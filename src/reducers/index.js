import { combineReducers } from 'redux';
import TaskReducer from './taskReducer';
import LoadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    tasks: TaskReducer,
    loading: LoadingReducer
});

export default rootReducer;
