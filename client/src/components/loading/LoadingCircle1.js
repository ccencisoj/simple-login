import React from 'react';
import clsx from 'clsx';
import styles from './LoadingCircle1.module.scss';

class LoadingCircle1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { light } = this.props;

    const styles_loading_circle1 = clsx({
      [styles.loading_circle1]: true,
      [styles.loading_circle1_light]: light
    });

    return (
      <div className={styles_loading_circle1}></div>
    )
  }
}

export default LoadingCircle1;