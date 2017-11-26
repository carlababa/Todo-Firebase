import { combineReducers } from 'redux';
import todos from './todos';
import auth from './auth';

const rootReducer = combineReducers({
  todos,
  auth,
});

export default rootReducer;
