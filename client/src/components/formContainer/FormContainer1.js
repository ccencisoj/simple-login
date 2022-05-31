import React from 'react';
import clsx from 'clsx';
import styles from './FormContainer1.module.scss';
import Navigation2 from 'components/navigation/Navigation2';

class FormContainer1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children } = this.props;

    const styles_form_container1 = clsx({
      [styles.form_container1]: true
    });

    return (
      <div className={styles_form_container1}>
        <div className={styles.header}>
          <div className={styles.navigation}>
            <Navigation2/>
          </div>
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    )
  }
}

export default FormContainer1;