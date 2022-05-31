import React from 'react';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import { useModals } from 'hooks/ModalsContext';
import styles from './ProfileActions1.module.scss';
import EditProfileModal1 from 'components/modal/EditProfileModal1';

class ProfileActions1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { modals } = this.props;

    return (
      <div className={styles.profile_actions1}>
        <Button 
          small={true}
          round={true}
          icon={Icon.Edit}
          onClick={()=> modals.add(EditProfileModal1, {})}/>
      </div>
    )
  }
}

export default (props)=> {
  const modals = useModals();

  return <ProfileActions1 {...props} 
    modals={modals}/>
}