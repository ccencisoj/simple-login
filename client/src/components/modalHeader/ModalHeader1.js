import React from 'react';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import styles from './ModalHeader1.module.scss';

class ModalHeader1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { title, hideModal } = this.props;

    return (
      <div className={styles.modal_header1}>
        <div className={styles.left}>
          <div className={styles.back_button}>
            <Button 
              blackColor={true}
              icon={Icon.ChevronLeft}
              onClick={()=> hideModal(300)}/>
          </div>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.right}>
          <Button 
            blackColor={true}
            icon={Icon.X}
            onClick={()=> hideModal(300)}/>
        </div>
      </div>
    )
  }
}

export default ModalHeader1;