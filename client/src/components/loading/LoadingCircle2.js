import React from 'react';
import styles from './LoadingCircle2.module.scss';

class LoadingCircle2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { label, error } = this.props;

    return (
      <div className={styles.loading_circle2}>
        <div className={styles.circle}></div>  
        <p className={styles.label}>{error || label}</p>
      </div>
    )
  }
}

export default LoadingCircle2;