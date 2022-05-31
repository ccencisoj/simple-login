import React from 'react';
import styles from './NotificationsContainer1.module.scss';

class NotificationsContainer1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children: notifications } = this.props;

    return (
      <div className={styles.notifications_container1}>
        {notifications}
      </div>
    )
  }
}

export default NotificationsContainer1;