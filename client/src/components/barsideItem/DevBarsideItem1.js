import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import styles from './DevBarsideItem1.module.scss';
import { SET_DEV_SECTION } from 'contants/actionTypes';

const mapStateToProps = (store)=> ({
  devSection: store.common.devSection
});

const mapActionsToProps = (dispatch)=> ({
  setDevSection: (devSection)=> dispatch({
    type: SET_DEV_SECTION,
    payload: devSection
  })
});

class DevBarsideItem1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      icon: Icon, 
      id: itemId,
      label, 
      index,
      section,
      devSection,
      setDevSection
    } = this.props;

    const selected = devSection === section;

    const styles_dev_barside_item1 = clsx({
      [styles.dev_barside_item1]: true,
      [styles.selected]: selected
    });

    return (
      <div className={styles_dev_barside_item1} 
        style={{"--index": index}}
        onClick={()=> setDevSection(section)}>
        <span className={styles.figure1}></span>
        <Icon className={styles.icon}/>
        <p className={styles.label}>{label}</p>
      </div>
    )
  }
}

const ConnectedDevBarsideItem1 = connect(
  mapStateToProps, mapActionsToProps)(DevBarsideItem1);

export default ConnectedDevBarsideItem1;