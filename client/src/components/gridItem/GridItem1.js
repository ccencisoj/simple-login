import React from 'react';
import styles from './GridItem1.module.scss';

class GridItem1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children } = this.props;

    return (
      <div className={styles.grid_item1}>
        {children}
      </div>
    )
  }
}

export default GridItem1;