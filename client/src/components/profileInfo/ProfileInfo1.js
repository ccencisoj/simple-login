import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfileInfo1.module.scss';
import { ContainerWithTitle1 } from 'components/containerWithTitle';
import ProfileActions1 from 'components/profileActions/ProfileActions1';

const mapStateToProps = (store)=> ({
  profile: store.common.profile
});

class ProfileInfo1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { profile } = this.props;

    if(!profile) 
      return null;

    return (
      <div className={styles.profile_info1}>
        <ContainerWithTitle1 title="Datos Basicos" 
          actions={ProfileActions1}>
          <div className={styles.block}>
            <p className={styles.title}>Nombre de usuario</p>
            <p className={styles.value}>{profile.username}</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>Correo</p>
            <p className={styles.value}>{profile.user.email}</p>
          </div>
        </ContainerWithTitle1>
      </div>
    )
  }
}

export default connect(
  mapStateToProps, null)(ProfileInfo1);