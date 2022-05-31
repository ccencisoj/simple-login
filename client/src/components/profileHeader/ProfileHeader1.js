import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfileHeader1.module.scss';
import AvatarImage1 from 'components/avatarImage/AvatarImage1';

const mapStateToProps = (store)=> ({
  profile: store.common.profile
});

class ProfileHeader1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { profile } = this.props;

    if(!profile)
      return null;

    return (
      <div className={styles.profile_header1}>
        <div className={styles.column}>
          <p className={styles.title}>Bienvenido</p>
          <div className={styles.user}>
            <AvatarImage1/>
            <p className={styles.name}>{profile.username}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps, null)(ProfileHeader1);