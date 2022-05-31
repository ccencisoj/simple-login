import React from 'react';
import clsx from 'clsx';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import styles from './NotificationCard1.module.scss';

class NotificationCard1 extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = setTimeout(()=> 
      this.props.hideNotification(500), 5000);
  }

  componentWillUnmount = ()=> {
    clearTimeout(this.timeout);
  }

  render = ()=> {
    const { 
      type, 
      message,
      hideNotification,
      willHiddenNotification 
    } = this.props;

    const styles_notification_card1 = clsx({
      [styles.notification_card1]: true,
      [styles.notification_card1_error]: type === "error",
      [styles.notification_card1_warning]: type === "warning",
      [styles.notification_card1_success]: type === "success",
      [styles.notification_card1_hidden]: willHiddenNotification
    });

    return (
      <div className={styles_notification_card1}>
        <div className={styles.figure1}></div>
        <div className={styles.column}>
          <p className={styles.type}>{type}</p>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.close}>
          <Button 
            icon={Icon.X} 
            blackColor={true}
            lightBackground={true}
            onClick={()=> hideNotification(300)}/>
        </div>
      </div>
    )
  }
}

export default NotificationCard1;