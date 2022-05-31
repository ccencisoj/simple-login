import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import LoadingCircle1 from 'components/loading/LoadingCircle1';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const {
      icon: Icon,
      label,
      primary,
      secundary,
      outline,
      round,
      type,
      flex,
      blackColor,
      small,
      expand,
      disabled,
      loading,
      lightBackground,
      onClick
    } = this.props;

    const styles_button = clsx({
      [styles.button]: true,
      [styles.button_outline]: outline,
      [styles.button_round]: round, 
      [styles.button_icon]: Icon,
      [styles.button_primary]: primary,
      [styles.button_secundary]: secundary,
      [styles.button_expand]: expand,
      [styles.button_flex]: flex, 
      [styles.button_black_color]: blackColor,
      [styles.button_small]: small,
      [styles.button_only_icon]: Icon && !label,
      [styles.button_loading]: loading,
      [styles.button_disabled]: disabled || loading,
      [styles.light_background]: lightBackground
    });
    
    return (
      <button type={type || "button"} 
      className={styles_button} onClick={onClick}>
        {loading && <LoadingCircle1 light={true}/>}
        {Icon && <Icon className={styles.icon}/>}
        {label && <p className={styles.label}>{label}</p>}
      </button>
    )
  }
}

export default Button;