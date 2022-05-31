import React from 'react';
import clsx from 'clsx';
import styles from './RadioButton.module.scss';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { label, checked } = this.props;

    const styles_radio_button = clsx({
      [styles.radio_button]: true,
      [styles.radio_button_checked]: checked
    });

    return (
      <button className={styles_radio_button}>
        <div className={styles.check}>
          <span className={styles.thumb}></span>
        </div>
        {label && <p className={styles.label}>{label}</p>}
      </button>
    )
  }
}

export default RadioButton;