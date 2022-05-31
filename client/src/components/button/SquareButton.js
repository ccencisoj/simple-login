import React from 'react';
import clsx from 'clsx';
import styles from './SquareButton.module.scss';
import GridItem1 from 'components/gridItem/GridItem1';

class SquareButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      icon: Icon, 
      label, 
      onClick,
      variant 
    } = this.props;

    const styles_square_button = clsx({
      [styles.square_button]: true,
      [styles.dev_variant]: variant === "dev"
    }); 

    return (
      <GridItem1>
        <button type="button" 
          className={styles_square_button} onClick={onClick}>
          <Icon className={styles.icon}/>
          <p className={styles.label}>{label}</p>
        </button>
      </GridItem1>
    )
  }
}

export default SquareButton;