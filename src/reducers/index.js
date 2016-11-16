import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
  itemReducer,
  loginReducer,
});

export default reducers;
