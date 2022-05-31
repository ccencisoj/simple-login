import React from 'react';
import clsx from 'clsx';
import styles from './DevBarsideModal1.module.scss';
import DevBarside1 from 'components/barside/DevBarside1';
import OutsideClickHandler from 'react-outside-click-handler';

class DevBarsideModal1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { willHiddenModal, hideModal } = this.props;

    const styles_dev_barside_modal1 = clsx({
      [styles.dev_barside_modal1]: true,
      [styles.will_hidden_modal]: willHiddenModal
    });

    return (
      <div className={styles_dev_barside_modal1}>
        <div className={styles.barside}>
          <OutsideClickHandler 
            onOutsideClick={()=> hideModal(300)}>
            <DevBarside1 hideModal={hideModal}/>
          </OutsideClickHandler>
        </div>
      </div>
    )
  }
}

export default DevBarsideModal1;