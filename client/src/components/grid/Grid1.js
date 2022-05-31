import React from 'react';
import clsx from 'clsx';
import styles from './Grid1.module.scss';

class Grid1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { children, variant } = this.props;

    const styles_grid1 = clsx({
      [styles.grid1]: true,
      [styles.dev_variant]: variant === "dev"
    });

    return (
      <div className={styles_grid1}>
        {children}
      </div>
    )
  }
}

export default Grid1;