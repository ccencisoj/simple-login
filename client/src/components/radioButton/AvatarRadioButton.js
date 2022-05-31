import React, { createRef } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import RadioButton from './RadioButton';
import styles from './AvatarRadioButton.module.scss';
import GridItem1 from 'components/gridItem/GridItem1';
import Checkbox1 from 'components/checkbox/Checkbox1';
import { 
  SET_SELECTED_AVATAR, 
  ADD_SELECTED_AVATAR, 
  DELETE_SELECTED_AVATAR 
} from 'contants/actionTypes';

const mapStateToProps = (store)=> ({
  selectedAvatar: store.collections.selectedAvatar
});

const mapDispatchToProps = (dispatch)=> ({
  setSelectedAvatar: (avatar)=> dispatch({
    type: SET_SELECTED_AVATAR,
    payload: avatar
  }),

  addSelectedAvatar: (avatarId)=> dispatch({
    type: ADD_SELECTED_AVATAR,
    payload: avatarId
  }),
  
  deleteSelectedAvatar: (avatarId)=> dispatch({
    type: DELETE_SELECTED_AVATAR,
    payload: avatarId
  })
});

class AvatarRadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activedCheckbox: false,
    };
    this.ref = {
      avatar_radio: createRef(),
    };
  }

  toggleCheckbox = ()=> {
    const { 
      id: avatarId,
      addSelectedAvatar,
      deleteSelectedAvatar 
    } = this.props;

    this.setState((prevState)=> {
      if(prevState.activedCheckbox) {
        deleteSelectedAvatar(avatarId);

        return {
          ...prevState,
          activedCheckbox: false
        }

      }else {
        addSelectedAvatar(avatarId);

        return {
          ...prevState,
          activedCheckbox: true
        }
      }
    });
  }

  render = ()=> {
    const { 
      id: avatarId, 
      url, 
      zIndex,
      setSelectedAvatar,
      selectedAvatar,
      variant 
    } = this.props;

    const {
      activedCheckbox
    } = this.state;

    const selected = avatarId === selectedAvatar.id;
    const dev_variant = variant === "dev";

    const styles_avatar_radio_button = clsx({
      [styles.avatar_radio_button]: true,
      [styles.dev_variant]: dev_variant,
      [styles.selected]: selected && !(dev_variant),
    });

    return (
      <GridItem1>
        <div className={styles_avatar_radio_button} style={{zIndex}}
          onClick={()=> dev_variant ? this.toggleCheckbox() : 
          setSelectedAvatar(selected ? null : avatarId)}>
          {variant === "dev" ?
          <div className={styles.checkbox}>
            <Checkbox1 
              actived={activedCheckbox}/>  
          </div> : 
          <div className={styles.radio}>
            <RadioButton checked={selected ? true : false}/>
          </div>}
          <img src={url} className={styles.image}/>
        </div>
      </GridItem1>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AvatarRadioButton);