import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import Grid1 from 'components/grid/Grid1';
import { createLocalId } from 'utils/localId';
import { useStorage } from 'hooks/StorageContext';
import { ADD_AVATAR, LOAD_AVATARS, UPDATE_AVATAR } from 'contants/actionTypes';
import styles from './SelectablesAvatars1.module.scss';
import SquareButton from 'components/button/SquareButton';
import AvatarRadioButton from 'components/radioButton/AvatarRadioButton';

const mapStateToProps = (store)=> ({
  avatars: store.collections.avatars
});

const mapActionsToProps = (dispatch)=> ({
  addAvatar: (avatar)=> dispatch({
    type: ADD_AVATAR,
    payload: avatar
  }),

  updateAvatar: (avatarId, values)=> dispatch({
    type: UPDATE_AVATAR,
    payload: [avatarId, values]
  }),

  loadAvatars: (avatars)=> dispatch({
    type: LOAD_AVATARS,
    payload: avatars
  })
});

class SelectablesAvatars1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async ()=> {
    const { loadAvatars } = this.props;
    const response = await agent.Avatar.selectables();
    loadAvatars(response.avatars);
  }

  newAvatar = ()=> {
    const { storage, addAvatar, 
      updateAvatar, variant } = this.props;
    
    storage.loadImage(async (image)=> {
      const avatar = {
        id: createLocalId(), 
        url: URL.createObjectURL(image)
      }

      addAvatar(avatar);
      
      if(variant === "dev") {
        const response = await agent.Avatar.upload({
          avatar: avatar.url
        });

        updateAvatar(avatar.id, {
          ...avatar,
          id: response.avatar.id
        });
      }
    });
  }

  render = ()=> {
    const { avatars, variant } = this.props;

    return (
      <div className={styles.dev_selectables_avatars1}>
        <Grid1 variant={variant}>
          <SquareButton 
            variant={variant}
            icon={Icon.Plus}
            label="Agregar"
            onClick={this.newAvatar}/>
          {avatars.map((avatar, index)=> 
            <AvatarRadioButton key={avatar.id} {...avatar}
            zIndex={avatars.length - index} variant={variant}/>)}
        </Grid1> 
      </div>
    )
  }
}

const ConnectedSelectableAvatars = connect(
  mapStateToProps, mapActionsToProps)(SelectablesAvatars1);

export default (props)=> {
  const storage = useStorage();
  
  return <ConnectedSelectableAvatars {...props}
    storage={storage}/>
}