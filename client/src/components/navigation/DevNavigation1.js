import React from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import { useModals } from 'hooks/ModalsContext';
import styles from './DevNavigation1.module.scss';
import { DevBarsideModal1 } from 'components/modal';
import { SHOW_BARSIDE } from 'contants/actionTypes';

const mapActionsToProps = (dispatch)=> ({
  showBarside: ()=> dispatch({
    type: SHOW_BARSIDE
  })
});

class DevNavigation1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { modals } = this.props;

    return (
      <div className={styles.dev_navigation1}>
        <div className={styles.left}>
          <Button 
            blackColor={true}
            icon={Icon.Menu}
            onClick={()=> 
            modals.add(DevBarsideModal1, {})}/>
          <p className={styles.title}>Dev.</p>
        </div>
        <div className={styles.right}></div>
      </div>
    )
  }
}

const ConnectedDevNavigation1 = connect(
  null, mapActionsToProps)(DevNavigation1);

export default (props)=> {
  const modals = useModals();

  return <ConnectedDevNavigation1 {...props}
    modals={modals}/>
}
