import clsx from 'clsx';
import React from 'react';
import styles from './ContainerWithTitle1.module.scss';

class ContainerWithTitle1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      children,
      title,
      actions: Actions,
      variant
    } = this.props;

    const styles_container_with_title1 = clsx({
      [styles.container_with_title1]: true,
      [styles.dev_variant]: variant === "dev"
    });

    return (
      <div className={styles_container_with_title1}>
        <div className={styles.header}>
          <div className={styles.left}>
            <p className={styles.title}>{title}</p>
          </div>
          <div className={styles.right}>
            {Actions && <Actions/>}
          </div>
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    )
  }
}

export default ContainerWithTitle1;