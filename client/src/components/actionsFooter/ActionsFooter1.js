import React from 'react';
import styles from './ActionsFooter1.module.scss';

class ActionsFooter1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children } = this.props;

    return (
      <div className={styles.actions_footer1}>
        {children}
      </div>
    )
  }
}

export default ActionsFooter1;