import React from 'react';
import clsx from 'clsx';
import * as Icon from 'react-feather';
import styles from './Checkbox1.module.scss';

class Checkbox1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { actived } = this.props;

    const styles_checkbox1 = clsx({
      [styles.checkbox1]: true,
      [styles.actived]: actived
    });

    return (
      <div className={styles_checkbox1}>
        <div className={styles.check}>
          <Icon.Check className={styles.icon}/>
        </div>
      </div>
    )
  }
}

export default Checkbox1;