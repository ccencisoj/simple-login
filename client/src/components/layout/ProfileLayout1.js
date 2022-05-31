import React from 'react';
import styles from './ProfileLayout1.module.scss';
import Navigation1 from 'components/navigation/Navigation1';

class Layout1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children } = this.props;

    return (
      <div className={styles.profile_layout1}>
        <div className={styles.navigation}>
          <Navigation1/>
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    )
  }
}

export default Layout1;