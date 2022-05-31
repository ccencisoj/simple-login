import React from 'react';
import styles from './FormLayout1.module.scss';
import Navigation2 from 'components/navigation/Navigation2';

class FormLayout1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children } = this.props;

    return (
      <div className={styles.form_layout1}>
        <nav className={styles.navigation}>
          <Navigation2/>
        </nav>
        <img className={styles.figure1} src="image/tree1.svg"/>
        <img className={styles.figure2} src="image/tree2.svg"/>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    )
  }
}

export default FormLayout1;