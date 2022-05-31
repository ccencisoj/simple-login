import { createStore, applyMiddleware } from "redux";
import reducer from './reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const store = createStore(reducer, 
  applyMiddleware(thunk, promise));

export default store;