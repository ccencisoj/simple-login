import React from 'react';
import styles from './ProfileContainer1.module.scss';

class ProfileContainer1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children } = this.props;

    return (
      <div className={styles.profile_container1}>
        {children}
      </div>
    )
  }
}

export default ProfileContainer1;