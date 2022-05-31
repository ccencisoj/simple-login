import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import styles from './DevAvatarActions1.module.scss';
import { DELETE_AVATAR } from 'contants/actionTypes';

const mapStateToProps = (store)=> ({
  selectedAvatars: store.collections.selectedAvatars
});

const mapActionsToProps = (dispatch)=> ({
  deleteAvatar: (avatarId)=> dispatch({
    type: DELETE_AVATAR,
    payload: avatarId
  })
});

class DevAvatarActions1 extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteSelectedAvatars = async ()=> {
    const { 
      deleteAvatar,
      selectedAvatars 
    } = this.props;

    const quantityAvatars = selectedAvatars.length;

    for(let i = 0; i < quantityAvatars; i++) {
      const avatarId = selectedAvatars[i];

      await agent.Avatar.delete(avatarId);
      deleteAvatar(avatarId);
    }
  }

  render = ()=> {
    const { selectedAvatars } = this.props;

    return (
      <div className={styles.dev_avatar_actions1}>
        {(selectedAvatars.length > 0) &&
        <Button 
          small={true}
          round={true}
          icon={Icon.Trash}
          onClick={this.deleteSelectedAvatars}/>}
      </div>
    )
  }
}

const ConnectedDevAvatarActions1 = connect(
  mapStateToProps, mapActionsToProps)(DevAvatarActions1);

export default ConnectedDevAvatarActions1;