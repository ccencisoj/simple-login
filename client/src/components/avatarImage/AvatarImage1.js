import React from 'react';
import agent from 'agent';
import { nanoid } from 'nanoid';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import styles from './AvatarImage1.module.scss';
import { useStorage } from 'hooks/StorageContext';

const mapStateToProps = (store)=> ({
  profile: store.common.profile
});

class AvatarImage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imageId: nanoid()};
  }

  updateAvatar = ()=> {
    const { storage, profile } = this.props;

    storage.loadImage(async (image)=> {
      
      const response = await agent.Avatar.update({
        avatarId: profile.avatar.id,
        image
      });

      this.setState({imageId: nanoid()});
    });
  }

  render = ()=> {
    const { profile } = this.props;
    const { imageId } = this.state;

    return (
      <div className={styles.avatar_image1} 
        onClick={this.updateAvatar}>
        <img className={styles.image} 
          src={`${profile.avatar.url}?${imageId}`}/>
        <button className={styles.edit}>
          <Icon.Edit className={styles.icon}/>
        </button>
      </div>
    )
  }
}

const ConnectedAvatarImage1 = connect(
  mapStateToProps, null)(AvatarImage1);

export default (props)=> {
  const storage = useStorage();

  return <ConnectedAvatarImage1 {...props}
    storage={storage}/>
}