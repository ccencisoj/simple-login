import React, { createRef } from 'react';
import styles from './CuttingViewer.module.scss';

class CuttingViewer extends React.Component {
  constructor(props) {
    super(props);
    this.ref = {
      mask: createRef(),
      image: createRef()
    }
  }

  render = ()=> {
    return (
      <div className={styles.cutting_viewer}>
        <div className={styles.main}>
          
        </div>
        <div className={styles.footer}>

        </div>
      </div>
    )
  }
}

export default CuttingViewer;