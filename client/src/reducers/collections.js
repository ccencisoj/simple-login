import { 
  SET_SELECTED_AVATAR,
  ADD_AVATAR,
  UPDATE_AVATAR,
  LOAD_AVATARS,
  REPLACE_AVATAR,
  DELETE_AVATAR,
  ADD_SELECTED_AVATAR,
  DELETE_SELECTED_AVATAR
} from 'contants/actionTypes';

const initialState = {
  avatars: [],
  selectedAvatar: {},
  selectedAvatars: []
}

export default (state=initialState, action)=> {
  switch (action.type) {
    case SET_SELECTED_AVATAR:
      return {
        ...state,
        selectedAvatar: (state.avatars.filter((avatar)=> {
          return avatar.id === action.payload;
        })[0] || {})
      }

    case ADD_AVATAR:
      return {
        ...state,
        avatars: [action.payload, ...state.avatars],
      }

    case DELETE_AVATAR:
      return {
        ...state, 
        avatars: state.avatars.filter((avatar)=> {
          if(avatar.id !== action.payload) return true;
        }),
        selectedAvatars: state.selectedAvatars.filter((avatarId)=> {
          if(avatarId !== action.payload) return true;
        })
      }

    case UPDATE_AVATAR:
      return {
        ...state,
        avatars: state.avatars.map((avatar)=> {
          if(avatar.id === action.payload[0])
            return {...avatar, ...action.payload[1]};
          return avatar;
        })
      }

    case LOAD_AVATARS:
      return {
        ...state,
        avatars: action.payload || []
      }

    case REPLACE_AVATAR: 
      return {
        ...state,
        avatars: state.avatars.map((avatar)=> {
          if(avatar.id === action.payload[0].id)
            return action.payload[1];
          return avatar;
        }),
        selectedAvatar: 
        state.selectedAvatar.id === action.payload[0].id ?
        action.payload[1] : state.selectedAvatar
      }

    case ADD_SELECTED_AVATAR: 
      return {
        ...state,
        selectedAvatars: state.selectedAvatars.concat(action.payload)
      }

    case DELETE_SELECTED_AVATAR:
      return {
        ...state, 
        selectedAvatars: state.selectedAvatars.filter((avatarId)=> {
          if(avatarId !== action.payload) return true;
        })
      }
  
    default:
      return state;
  }
}