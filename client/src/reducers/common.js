import { 
  LOAD_USER,
  LOAD_PROFILE,
  UPDATE_PROFILE,
  SHOW_BARSIDE,
  HIDE_BARSIDE,
  SET_DEV_SECTION
} from 'contants/actionTypes';

import {
  DEV_SECTION_AVATARS
} from 'contants/commons';

const initialState = {
  user: null,
  profile: null,
  showBarside: false,
  devSection: DEV_SECTION_AVATARS
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      }

    case LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    case SHOW_BARSIDE: 
      return {
        ...state,
        showBarside: true
      }
    
    case HIDE_BARSIDE:
      return {
        ...state,
        showBarside: false
      }

    case SET_DEV_SECTION:
      return {
        ...state,
        devSection: action.payload
      }

    default:
      return state;
  }
}