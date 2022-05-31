import React from 'react';
import clsx from 'clsx';
import styles from './DevContainer1.module.scss';

class DevContainer1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      children, 
      title,
      expand
    } = this.props;

    const styles_dev_container1 = clsx({
      [styles.dev_container1]: true,
      [styles.expand]: expand
    });

    return (
      <div className={styles_dev_container1}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    )
  }
}

export default DevContainer1;