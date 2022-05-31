import { combineReducers } from 'redux';
import commonReducer from './reducers/common';
import collectionsReducer from './reducers/collections';

export default combineReducers({
  common: commonReducer,
  collections: collectionsReducer
});