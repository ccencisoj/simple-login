import React from 'react';
import clsx from 'clsx';
import styles from './Field.module.scss';

class Field extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      label, 
      placeholder, 
      value, 
      error, 
      name, 
      onChange, 
      onBlur,
      expand,
      type
    } = this.props;

    const styles_field = clsx({
      [styles.field]: true,
      [styles.field_expand]: expand
    });

    return (
      <div className={styles_field}>
        <p className={styles.label}>{label}</p>
        <input type={type || 'text'} 
          name={name}
          value={value}
          className={styles.input} 
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}/>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}

export default Field;