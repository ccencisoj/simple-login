import React from 'react';
import * as Icon from 'react-feather';
import styles from './FormHeader1.module.scss';

class FormHeader1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { title, sentence, error } = this.props;

    return (
      <div className={styles.form_header1}>
        <p className={styles.title}>
          {title}
        </p>
        <p className={styles.sentence}>
          {sentence}
        </p>
        {error && <div className={styles.error}>  
          <Icon.Info className={styles.icon}/>
          <p className={styles.value}>{error}</p>
        </div>}
      </div>
    )
  }
}

export default FormHeader1;