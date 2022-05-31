import React from 'react';
import * as Icon from 'react-feather';
import styles from './FormNotification.module.scss';

class FormNotification extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { label } = this.props;

    return (
      <div className={styles.form_notification1}>
        <Icon.Info className={styles.icon}/>
        <p className={styles.label}>{label}</p>
      </div>
    )
  }
}

export default FormNotification;