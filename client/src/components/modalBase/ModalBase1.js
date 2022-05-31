import React from 'react';
import clsx from 'clsx';
import styles from './ModalBase1.module.scss';
import OutsideClickHandler from 'react-outside-click-handler';
import ModalHeader1 from 'components/modalHeader/ModalHeader1';

class ModalBase1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      title, 
      children, 
      willHiddenModal, 
      hideModal,
      verticalPadding
    } = this.props;

    const styles_modal_base1 = clsx({
      [styles.modal_base1]: true,
      [styles.modal_base1_hidden]: willHiddenModal,
      [styles.vertical_padding]: verticalPadding
    });

    return (
      <div className={styles_modal_base1}>
        <OutsideClickHandler 
          onOutsideClick={()=> hideModal(300)}>
          <div className={styles.container}>
            <div className={styles.header}>
              <ModalHeader1 
                title={title} 
                hideModal={hideModal}/>
            </div>
            <div className={styles.main}>
              {children}
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    )
  }
}

export default ModalBase1;